import { SearchParams, SearchResult } from "./repository-contracts";

describe("Search Params Unit Tests", () => {
  test("page prop", () => {
    const arranges: { page: any; expected: number }[] = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 5 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    for (const arrange of arranges) {
      expect(new SearchParams({ page: arrange.page }).page).toBe(
        arrange.expected
      );
    }
  });

  test("per_page prop", () => {
    const arranges: { per_page: any; expected: number }[] = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: "", expected: 15 },
      { per_page: "fake", expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 5.5, expected: 5 },
      { per_page: true, expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 1, expected: 1 },
      { per_page: 2, expected: 2 },
    ];

    for (const arrange of arranges) {
      expect(new SearchParams({ per_page: arrange.per_page }).per_page).toBe(
        arrange.expected
      );
    }
  });

  test("sort prop", () => {
    const arranges: { sort: any; expected: string }[] = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: "fake", expected: "fake" },
      { sort: 0, expected: "0" },
      { sort: -1, expected: "-1" },
      { sort: 5.5, expected: "5.5" },
      { sort: true, expected: "true" },
      { sort: false, expected: "false" },
      { sort: {}, expected: "[object Object]" },
      { sort: 1, expected: "1" },
      { sort: 2, expected: "2" },
    ];

    for (const arrange of arranges) {
      expect(new SearchParams({ sort: arrange.sort }).sort).toBe(
        arrange.expected
      );
    }
  });

  test("sort_dir prop", () => {
    let params = new SearchParams();
    expect(params.sort_dir).toBe(null);

    params = new SearchParams({ sort: null });
    expect(params.sort_dir).toBe(null);

    params = new SearchParams({ sort: undefined });
    expect(params.sort_dir).toBe(null);

    params = new SearchParams({ sort: "" });
    expect(params.sort_dir).toBe(null);

    const arranges: { sort_dir: any; expected: string }[] = [
      { sort_dir: null, expected: "asc" },
      { sort_dir: undefined, expected: "asc" },
      { sort_dir: "", expected: "asc" },
      { sort_dir: 0, expected: "asc" },
      { sort_dir: "fake", expected: "asc" },
      { sort_dir: "asc", expected: "asc" },
      { sort_dir: "ASC", expected: "asc" },
      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "DESC", expected: "desc" },
    ];

    for (const arrange of arranges) {
      expect(
        new SearchParams({ sort: "field", sort_dir: arrange.sort_dir }).sort_dir
      ).toBe(arrange.expected);
    }
  });

  test("filter prop", () => {
    const params = new SearchParams();
    expect(params.filter).toBe(null);

    const arranges: { filter: any; expected: any }[] = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },
      { filter: "fake", expected: "fake" },
      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: 5.5, expected: "5.5" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
      { filter: {}, expected: "[object Object]" },
      { filter: 1, expected: "1" },
      { filter: 2, expected: "2" },
    ];

    for (const arrange of arranges) {
      expect(new SearchParams({ filter: arrange.filter }).filter).toBe(
        arrange.expected
      );
    }
  });
});

describe("Search Result Unit Tests", () => {
  test("constructor props", () => {
    let result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      filter: null,
      sort: null,
      sort_dir: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      filter: null,
      sort: null,
      sort_dir: null,
    });

    result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      filter: "test",
      sort: "name",
      sort_dir: "asc",
    });

    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      filter: "test",
      sort: "name",
      sort_dir: "asc",
    });
  });

  it("should set last_page = 1 when per_page is greater than total", () => {
    const result = new SearchResult({
      items: [],
      total: 4,
      current_page: 2,
      per_page: 15,
      filter: null,
      sort: null,
      sort_dir: null,
    });

    expect(result.last_page).toBe(1);
  });

  test("last_page prop when total is not a multiple of per_page", () => {
    const result = new SearchResult({
      items: [],
      total: 101,
      current_page: 7,
      per_page: 20,
      filter: null,
      sort: null,
      sort_dir: null,
    });

    expect(result.last_page).toBe(6);
  });
});
