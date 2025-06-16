import {
  makeValidatedTodo,
  ValidTodo,
  InvalidTodo,
} from "./make-validated-todo";
import * as makeNewTodoMod from "./make-new-todo";
import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as validatedTodoDescriptionMod from "../schemas/validate-todo-description";

describe("makeValidateTodo (unit)", () => {
  test("deve chamar a funcao sanitizeStr com o valor correto", () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test("deve chamar a funcao validateTodoDescription com o retorno de sanitizeStr", () => {
    const { description, sanitizeStrSpy, validatedTodoDescriptionSpy } =
      makeMocks();

    const sanitizeStrReturn = "retorno da sanitizeStr";
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

    const result = makeValidatedTodo(description);
    console.log(result);

    expect(validatedTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn
    );
  });

  test("deve chamar a funcao makeTodo se validatedDescription retornou sucesso", () => {
    const { description } = makeMocks();
    const result = makeValidatedTodo(description) as ValidTodo;
    console.log(result);

    expect(result.success).toBe(true);
    expect(result.data).toStrictEqual({
      description,
      id: "any-id",
      createdAt: "any-date",
    });
  });

  test("deve retornar validatedDescription.errors se a validação falhou", () => {
    const { description, errors, validatedTodoDescriptionSpy } = makeMocks();

    validatedTodoDescriptionSpy.mockReturnValue({
      errors,
      success: false,
    });

    const result = makeValidatedTodo(description) as InvalidTodo;
    console.log(result);

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual(errors);
  });
});

const makeMocks = (description = "abcd") => {
  const errors = ["any", "errors"];

  const todo = {
    id: "any-id",
    description,
    createdAt: "any-date",
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validatedTodoDescriptionSpy = vi
    .spyOn(validatedTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({
      success: true,
      errors: [],
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);

  return {
    todo,
    errors,
    description,
    sanitizeStrSpy,
    validatedTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
