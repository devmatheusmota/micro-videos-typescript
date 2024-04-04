import { UniqueEntityId } from "../../../shared/domain/value-objects/unique-entity-id";
import { Category, CategoryProps } from "./category";
describe("Category Unit Tests", () => {
  describe("Category Constructor", () => {
    it("should create a category with a name and default values if only name is provided", () => {
      const category = new Category({ name: "Category 1" });
      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: null,
        is_active: true,
        created_at: expect.any(Date),
      });
    });

    it("should create a category with a name and description if provided", () => {
      const category = new Category({
        name: "Category 1",
        description: "Category 1 description",
      });
      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: "Category 1 description",
        is_active: true,
        created_at: expect.any(Date),
      });
    });

    it("should create a category with a name and is_active if provided", () => {
      const category = new Category({
        name: "Category 1",
        is_active: false,
      });
      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: null,
        is_active: false,
        created_at: expect.any(Date),
      });
    });

    it("should create a category with a name and created_at if provided", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Category 1",
        created_at,
      });
      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: null,
        is_active: true,
        created_at,
      });
    });

    it("should create a category with a name and all props if provided", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Category 1",
        description: "Category 1 description",
        is_active: false,
        created_at,
      });
      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: "Category 1 description",
        is_active: false,
        created_at,
      });
    });

    test("if getters return the correct values", () => {
      const category = new Category({
        name: "Category 1",
        description: "Category 1 description",
        is_active: false,
      });
      expect(category.name).toBe("Category 1");
      expect(category.description).toBe("Category 1 description");
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("if setters set the correct values", () => {
      const category = new Category({ name: "Category 1" });
      category["description"] = "Category 1 description";
      category["is_active"] = false;
      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: "Category 1 description",
        is_active: false,
        created_at: expect.any(Date),
      });

      category["description"] = undefined;
      category["is_active"] = undefined;

      expect(category.props).toStrictEqual({
        name: "Category 1",
        description: null,
        is_active: true,
        created_at: expect.any(Date),
      });
    });

    test("if id is generated if not provided", () => {
      type CategoryData = { props: CategoryProps; id?: UniqueEntityId };
      const data: CategoryData[] = [
        { props: { name: "Category 1" } },
        { props: { name: "Category 2" }, id: null },
        { props: { name: "Category 3" }, id: undefined },
      ];

      for (const item of data) {
        const category = new Category(item.props, item.id);
        expect(category.id).toBeDefined();
        expect(category.id).toBeInstanceOf(UniqueEntityId);
      }
    });

    test("if id is set if provided", () => {
      const id = new UniqueEntityId("123e4567-e89b-12d3-a456-426614174000");
      const category = new Category({ name: "Category 1" }, id);
      expect(category.id).toBe(id);
    });
  });
});
