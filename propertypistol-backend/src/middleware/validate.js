const ApiError = require("../utils/ApiError");

/** validate({ body, query, params }) with zod schemas; parsed values replace the originals. */
module.exports = (schemas) => (req, _res, next) => {
  for (const part of ["body", "query", "params"]) {
    if (!schemas[part]) continue;
    const result = schemas[part].safeParse(req[part]);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({ field: i.path.join("."), message: i.message }));
      return next(ApiError.badRequest("Validation failed", details));
    }
    if (part === "query") Object.defineProperty(req, "query", { value: result.data, writable: true, configurable: true });
    else req[part] = result.data;
  }
  next();
};
