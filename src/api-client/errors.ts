export const APIError = (module: string, message: string) =>
  new Error(`[${module}]: ${message}`);
