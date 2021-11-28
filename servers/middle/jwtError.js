export const tokenError = (req, res, next) => {
  if (req.cookies.Authorization === undefined) {
    return res.status(419).json({ error: "Token does not exist" });
  }
  console.log(req.cookies.Authorization);
  next();
};