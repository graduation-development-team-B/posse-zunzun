import { Redirect } from 'expo-router';

/** テンプレートの Explore 画面は廃止。教材タブへ転送する（このファイルは削除してよい） */
export default function ExploreRedirect() {
  return <Redirect href="/materials" />;
}
