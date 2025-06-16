import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  test("retorna string vazia quando recebe um valor falsy", () => {
    // @ts-expect-error testando a fn sem params
    expect(sanitizeStr()).toBe("");
  });

  test("retorna string vazia quando recebe um valor diferente de string", () => {
    // @ts-expect-error testando a fn sem params
    expect(sanitizeStr(123)).toBe("");
  });

  test("retorna string sem espaços nas laterais", () => {
    expect(sanitizeStr("    a     ")).toBe("a");
  });

  test("retorna string normalizada com NFC", () => {
    const original = "e\u0301";
    const expected = "é";
    expect(expected).toBe(sanitizeStr(original));
  });
});
