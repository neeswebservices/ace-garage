import tryCatch from "../utils/tryCatch.js";

export const createBranch = tryCatch(async (req, res, next) => {
  const { name, address, city, state, country } = req.body;
});
