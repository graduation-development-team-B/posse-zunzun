import test from "node:test";
import assert from "node:assert/strict";
import {
  reminderErrorMessage,
  reminderStep,
} from "../../src/lib/notifications/errors.ts";

test("Supabaseのエラーオブジェクトの理由とコードを失わない", () => {
  const cause = {
    message: "new row violates row-level security policy",
    code: "42501",
  };
  assert.match(
    reminderErrorMessage(cause, "保存できませんでした"),
    /row-level security.*42501/,
  );
});

test("ブラウザーの例外とメッセージのない拒否を表示できる", () => {
  assert.equal(
    reminderErrorMessage(
      new DOMException("Registration failed", "AbortError"),
      "失敗",
    ),
    "Registration failed",
  );
  assert.equal(reminderErrorMessage(null, "失敗"), "失敗");
});

test("通知の保存拒否が通常のErrorになり失敗した処理も分かる", async (context) => {
  context.mock.method(console, "warn", () => {});
  await assert.rejects(
    reminderStep("通知設定を保存できませんでした。", async () => {
      throw { message: "permission denied", code: "42501" };
    }),
    (error) =>
      error instanceof Error &&
      /通知設定.*permission denied.*42501/.test(error.message),
  );
  assert.equal(await reminderStep("保存失敗", async () => "saved"), "saved");
});
