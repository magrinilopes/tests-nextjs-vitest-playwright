import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo (unit)", () => {
  test("deve retornar um novo TODO válido", () => {
    // Padrão AAA => Arrange, Act, Assert
    // Arrange => criar as coisas que preciso para o teste
    const expectTodo = {
      id: expect.any(String),
      description: "Meu todo criado",
      createdAt: expect.any(String),
    };

    // Act => executar a ação
    const newTodo = makeNewTodo("Meu todo criado");

    // Assert => valida se está correto (espero que)
    expect(newTodo.description).toBe(expectTodo.description);
    expect(newTodo).toStrictEqual(expectTodo);
  });
});
