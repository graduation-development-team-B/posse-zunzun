import { useEffect, useState, useSyncExternalStore } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Drill } from '@/constants/drill';
import { DText } from './ui';

type InstallPrompt = Event & {
  prompt: () => Promise<unknown>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function subscribeToBrowser() {
  return () => {};
}

function macChromeVersion() {
  const version = /Chrome\/(\d+)/.exec(navigator.userAgent);
  return /Macintosh/.test(navigator.userAgent) && version && !/Edg\/|OPR\//.test(navigator.userAgent)
    ? Number(version[1]) : null;
}

function subscribeToDisplayMode(changed: () => void) {
  const display = window.matchMedia('(display-mode: standalone)');
  display.addEventListener('change', changed);
  return () => display.removeEventListener('change', changed);
}

const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches;
const serverChromeVersion = () => null;
const serverStandalone = () => false;

/** Native notification attribution is provided by Chrome, once installed. */
export function PwaNotificationSetup() {
  const chromeVersion = useSyncExternalStore(subscribeToBrowser, macChromeVersion, serverChromeVersion);
  const standalone = useSyncExternalStore(subscribeToDisplayMode, isStandalone, serverStandalone);
  const [installedHere, setInstalledHere] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const beforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPrompt);
    };
    const installed = () => {
      setInstallPrompt(null);
      setInstalledHere(true);
    };
    window.addEventListener('beforeinstallprompt', beforeInstall);
    window.addEventListener('appinstalled', installed);
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  if (chromeVersion === null) return null;

  const install = async () => {
    if (!installPrompt) return;
    setNotice('');
    setInstallPrompt(null);
    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') setInstalledHere(true);
    } catch {
      setNotice('Chromeのメニューから「POSSEずんずん」をインストールしてください。');
    }
  };

  const testNotification = async () => {
    setBusy(true);
    setNotice('');
    try {
      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        throw new Error('この環境では通知を利用できません。');
      }
      // Keep the permission request directly within the user's click gesture.
      if (await Notification.requestPermission() !== 'granted') {
        throw new Error('通知が許可されていません。macOSの「システム設定 → 通知 → POSSEずんずん」を確認してください。');
      }
      await navigator.serviceWorker.register('/sw.js');
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification('POSSEずんずん', {
        body: '今日の3問、やってみませんか？',
        icon: '/icon-192.png?v=d5850588',
        tag: 'notification-settings-test',
        data: { url: '/account' },
      });
      // Notification.permission does not prove that macOS displayed a banner.
      setNotice('テスト通知の表示を要求しました。届かない場合は、macOSの通知設定と集中モードを確認してください。');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'テスト通知を表示できませんでした。');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <DText size={13} weight="bold">Macでアプリごとに通知を管理する</DText>
      {chromeVersion < 152 ? (
        <DText size={12} lh={1.6} color={Drill.textSub}>
          Chromeを152以降に更新し、POSSEずんずんをアプリとしてインストールしてください。
        </DText>
      ) : standalone ? (
        <>
          <DText size={12} lh={1.6} color={Drill.textSub}>
            通知を許可すると、macOSの「システム設定 → 通知 → POSSEずんずん」で、通知の許可・バナーの表示方法・サウンドを変更できます。ブラウザーで許可済みでも、このアプリ用の許可が必要です。
          </DText>
          <Pressable role="button" onPress={() => void testNotification()} disabled={busy} style={styles.button}>
            <DText size={13} weight="bold" color={Drill.accentText}>{busy ? '確認しています…' : 'テスト通知を表示'}</DText>
          </Pressable>
        </>
      ) : (
        <>
          <DText size={12} lh={1.6} color={Drill.textSub}>
            {installedHere
              ? 'インストールしたPOSSEずんずんをDockやアプリケーションから開き、通知を許可してください。'
              : 'POSSEずんずんをアプリとしてインストールして開くと、macOSの「システム設定 → 通知」で個別に管理できます。'}
          </DText>
          {installPrompt ? (
            <Pressable role="button" onPress={() => void install()} style={styles.button}>
              <DText size={13} weight="bold" color={Drill.accentText}>POSSEずんずんをインストール</DText>
            </Pressable>
          ) : !installedHere ? (
            <DText size={12} lh={1.6} color={Drill.textSub}>
              Chromeのアドレスバーのインストールアイコン、またはメニューからインストールしてください。通常のタブでは通知はChromeとして表示されます。
            </DText>
          ) : null}
        </>
      )}
      {Boolean(notice) && <DText role="status" size={12} lh={1.6} color={Drill.textSub}>{notice}</DText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  button: { alignSelf: 'flex-start', paddingVertical: 12, minHeight: 44 },
});
