import { SearchParams } from "./repository-contracts";

describe("Search Params Unit Tests", () => {
  test("page prop", () => {
    const params = new SearchParams();

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
    const params = new SearchParams();

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
});
