import { buildPreviewDocument } from "@/lib/quiz/previewDocument";
export default function CodePreview({
  code,
  runId,
  onReady,
  height = 240,
}: {
  code: string;
  runId: number;
  onReady: () => void;
  height?: number;
}) {
  return (
    <iframe
      key={runId}
      title="コードの実行結果"
      sandbox=""
      referrerPolicy="no-referrer"
      srcDoc={buildPreviewDocument(code)}
      onLoad={onReady}
      style={{
        width: "100%",
        height,
        border: 0,
        borderRadius: 12,
        background: "#fff",
      }}
    />
  );
}
