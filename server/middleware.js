const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  } else {
    const dec = jwt.decode(token, { complete: true });
    console.log("Decoded Token:", dec);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err); // Log the error
        console.log("token not verified");
        return res.status(403).json({ message: "Invalid token" });
      } else {
        console.log("token verified", decoded); // Log the decoded payload
        req.user = decoded;
        next();
      }
    });
  }
};
