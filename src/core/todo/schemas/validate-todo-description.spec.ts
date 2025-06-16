import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  test("deve retornar erros quando a descrição for menor que 4 caracteres", () => {
    const desc = "abc";
    const result = validateTodoDescription(desc);
    expect(result.errors).toStrictEqual([
      "Descrição deve ser maior que 3 caracteres.",
    ]);
    expect(result.success).toBe(false);
  });

  test("deve retornar sucesso quando a descrição for maior que 3 caracteres", () => {
    const desc = "abcd";
    const result = validateTodoDescription(desc);
    expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
