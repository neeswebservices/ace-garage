import APPError from "../utils/Error";
import tryCatch from "../utils/tryCatch";

export const createService = tryCatch(async (req, res, next) => {
  const { category, name, desc, price, branch } = req.body;

  if (!category || !name || !desc || !price || !branch) {
    throw new APPError("Please submit all the fields.", 400);
  }
});
