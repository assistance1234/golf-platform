import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("HEADER:", authHeader); // 👈 debug

  if (!authHeader) {
    return res.status(401).json("No token");
  }

  // Bearer token handle
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // 👈 important
    return res.status(401).json("Invalid token");
  }
};

export default authMiddleware;