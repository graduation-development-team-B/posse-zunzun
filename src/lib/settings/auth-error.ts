export function accountUpdateError(cause: unknown): string {
  const code =
    cause && typeof cause === "object" && "code" in cause ? cause.code : "";
  switch (code) {
    case "reauthentication_needed":
    case "session_not_found":
      return "安全のため、ログインし直してから変更してください。";
    case "invalid_credentials":
    case "invalid_password":
      return "現在のパスワードを確認してください。";
    case "same_password":
      return "現在とは異なるパスワードを入力してください。";
    case "weak_password":
      return "パスワードが簡単すぎます。英字・数字・記号を組み合わせてください。";
    case "email_exists":
    case "email_address_invalid":
      return "このメールアドレスに変更できません。入力を確認してください。";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "しばらく時間をおいてから、もう一度お試しください。";
    default:
      return "変更できませんでした。通信を確認して、もう一度お試しください。";
  }
}
