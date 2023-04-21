export const createError = (message, status, stack) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  err.stack = stack;
  return err;
};
