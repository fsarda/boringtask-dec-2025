import { renderHook, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { PropsWithChildren, Suspense } from "react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { QueryProvider } from "../app/layout/providers";
import { useRequest } from "./patterns";

const URL = "http://test.com";
const URL_ERROR = "http://test.com/error";
const items = [
  {
    id: 1,
    name: "a",
  },
  {
    id: 2,
    name: "bs",
  },
  // ...
];

export const restHandlers = [
  http.get(URL, () => {
    return HttpResponse.json(items);
  }),
  http.get(URL_ERROR, () => {
    return HttpResponse.error();
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen());

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());

const Wrapper = ({ children }: PropsWithChildren) => (
  <QueryProvider>
    <Suspense fallback="Loading">{children}</Suspense>
  </QueryProvider>
);

describe("patterns", () => {
  describe("request", () => {
    it("should return successfully data", async () => {
      const { result } = renderHook(
        () => useRequest({ url: URL, key: "test" }),
        {
          wrapper: Wrapper,
        }
      );

      expect(screen.getByText("Loading")).toBeDefined();

      await waitFor(() => {
        expect(result.current.data).toStrictEqual(items);
        expect(result.current.error).toBeNull();
      });
    });
  });
});
