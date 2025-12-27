import { hashObject } from "./hash";

type HashScenarios = {
  first: object;
  second: object;
};

const scenarios: HashScenarios[] = [
  {
    first: {
      id: "a",
      name: "b",
    },
    second: {
      name: "b",
      id: "a",
    },
  },
  {
    first: {
      id: 1,
      name: "b",
    },
    second: {
      name: "b",
      id: 1,
    },
  },
  {
    first: {
      id: 1,
      name: "b",
      lastName: "c",
    },
    second: {
      lastName: "c",
      name: "b",
      id: 1.0,
    },
  },
  {
    first: {
      id: 1,
      info: {
        name: "b",
        lastName: "c",
      },
    },
    second: {
      info: {
        lastName: "c",
        name: "b",
      },
      id: 1.0,
    },
  },
];

describe("hashObject", () => {
  it.each(scenarios)("%s  have equal hashes", async ({ first, second }) => {
    const hash1 = await hashObject(first);
    const hash2 = await hashObject(second);

    expect(hash1).toStrictEqual(hash2);
  });
});
