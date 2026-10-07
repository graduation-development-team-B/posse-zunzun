export const storage = {
  async getItem(key: string): Promise<string | null> {
    return typeof window === "undefined"
      ? null
      : window.localStorage.getItem(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (typeof window === "undefined")
      throw new Error("保存環境がありません。");
    window.localStorage.setItem(key, value);
  },
};
export const STORAGE_KEY = "posse-zunzun:learning:v1";
