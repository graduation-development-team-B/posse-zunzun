import { DText } from "./ui";
export default function CodePreview(_props: {
  code: string;
  runId: number;
  onReady: () => void;
  height?: number;
}) {
  return <DText>HTMLの実プレビューはWeb版で利用できます。</DText>;
}
