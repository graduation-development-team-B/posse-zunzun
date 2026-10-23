// Manual-only fixture. Copy into src/app/evolution-preview.tsx for local visual QA,
// and remove that route before exporting. It does not read or write learning XP.
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Mascot } from '@/components/drill/mascot';
import { XpReward } from '@/components/drill/xp-reward';
import { Body, Card, DText, Screen } from '@/components/drill/ui';
import { EVOLUTION_STAGES, levelDisplay } from '@/lib/progress/evolution';

export default function EvolutionPreview() {
  const [target, setTarget] = useState(50);
  const [run, setRun] = useState(0);
  return <Screen><Body>
    <DText role="heading" aria-level={1} size={20} weight="bold">進化の動作確認</DText>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {EVOLUTION_STAGES.map((s) => <Pressable key={s.level} accessibilityRole="button"
        accessibilityLabel={`Lv.${s.level} ${s.name}を確認`}
        onPress={() => { setTarget(s.level); setRun((v) => v + 1); }}
        style={{ padding: 8, borderRadius: 8, backgroundColor: '#FFF1D3' }}>
        <DText>{s.level} {s.name}</DText>
      </Pressable>)}
    </View>
    <RewardPreview key={`${target}:${run}`} target={target} />
    <Pressable accessibilityRole="button" accessibilityLabel="進化を再生" onPress={() => setRun((v) => v + 1)}
      style={{ padding: 16, backgroundColor: '#FFD166', borderRadius: 14 }}>
      <DText weight="bold">進化を再生</DText>
    </Pressable>
  </Body></Screen>;
}

function RewardPreview({ target }: { target: number }) {
  const before = (target - 1) * 100 - 10;
  const after = (target - 1) * 100 + 20;
  const [level, setLevel] = useState(levelDisplay(before).level);
  const current = levelDisplay((level - 1) * 100);
  return <Card>
    <View style={{ alignItems: 'center', gap: 8 }}>
      <Mascot name={current.mascot} width={200} alt={`プレビュー Lv.${level} ${current.name}`} />
      <DText role="heading" aria-level={2} size={18} weight="bold">Lv.{level} {current.name}</DText>
    </View>
    <XpReward before={before} after={after} onLevelChange={setLevel} />
  </Card>;
}
