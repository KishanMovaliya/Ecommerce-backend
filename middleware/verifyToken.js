const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(400).json({ msg: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Invalid Token." });
  }
};
