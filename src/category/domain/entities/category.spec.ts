import { Category } from "./category";

describe("Category Unit Tests", () => {
  test("Category Constructor", () => {
    const category = new Category({
      name: "Category 1",
      is_active: true,
      description: "Category 1 description",
      created_at: new Date(),
    });
    expect(category).toBeDefined();
  });
});
