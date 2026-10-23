import { useState } from "react";
import { View } from "react-native";
import { CtaButton } from "@/components/drill/buttons";
import { SelectField, TextField } from "@/components/drill/form";
import { DText } from "@/components/drill/ui";
import { SettingsPage, StatusMessage, s } from "@/components/settings/ui";
import { POSSE_OPTIONS, GENERATION_OPTIONS } from "@/data/profileOptions";
import { useAuth, type Profile } from "@/lib/auth/provider";

export default function ProfileScreen() {
  const { profile, profileReady, error } = useAuth();
  return (
    <SettingsPage
      title="プロフィール編集"
      description="名前と、所属POSSE・期生を設定します。"
    >
      {profileReady && profile ? (
        <ProfileForm key={profile.user_id} profile={profile} />
      ) : (
        <DText>プロフィールを読み込んでいます…</DText>
      )}
      <StatusMessage error={error} />
    </SettingsPage>
  );
}
function ProfileForm({ profile }: { profile: Profile }) {
  const { saveProfile } = useAuth();
  const [name, setName] = useState(profile.display_name);
  const [posse, setPosse] = useState(profile.posse);
  const [cohort, setCohort] = useState(profile.cohort);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const dirty =
    name.trim() !== profile.display_name ||
    posse !== profile.posse ||
    cohort !== profile.cohort;
  const save = async () => {
    if (!dirty || busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (!name.trim()) throw new Error("名前を入力してください。");
      await saveProfile({ display_name: name.trim(), posse, cohort });
      setNotice("プロフィールを保存しました。");
    } catch {
      setError(
        name.trim()
          ? "保存できませんでした。もう一度お試しください。"
          : "名前を入力してください。",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <View style={s.form}>
      <TextField
        label="名前"
        value={name}
        editable={!busy}
        maxLength={100}
        autoComplete="name"
        onChangeText={(value) => {
          setName(value);
          setNotice("");
        }}
      />
      <View style={[s.form, { pointerEvents: busy ? "none" : "auto" }]}>
        <SelectField
          label="所属POSSE"
          value={posse}
          options={POSSE_OPTIONS}
          onChange={(value) => {
            setPosse(value);
            setNotice("");
          }}
        />
        <SelectField
          label="期生"
          value={cohort}
          options={GENERATION_OPTIONS}
          onChange={(value) => {
            setCohort(value);
            setNotice("");
          }}
        />
      </View>
      <StatusMessage error={error} notice={notice} />
      {dirty && (
        <CtaButton
          label={busy ? "保存しています…" : "保存する"}
          disabled={busy || !name.trim()}
          onPress={() => void save()}
        />
      )}
    </View>
  );
}
