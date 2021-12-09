export const localsMiddleware = (req, res, next) => {
  res.locals.sadang = "Voyager";

  next();
};
