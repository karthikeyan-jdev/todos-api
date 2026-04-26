import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Check for the Authorization header
    const { authorization } = req.headers;
    // If the header is missing or doesn't start with "Bearer ", return an error
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized" });
    }
    // Extract the token from the header
    const token = authorization.split(" ")[1];
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
