import { HttpResponse, JsonBodyType } from "msw";

export const NOT_FOUND_RESPONSE = HttpResponse.json(
  {
    errorMessage: "Entity not found",
  },
  { status: 404 }
);

export const BAD_REQUEST_RESPONSE = HttpResponse.json(
  {
    errorMessage: "Bad request, review parameters sent",
  },
  { status: 400 }
);

export const SUCCESS_RESPONSE = (response: JsonBodyType) =>
  HttpResponse.json(response);
