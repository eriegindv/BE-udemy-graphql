import jwt from "jsonwebtoken";
import { JWT_SECRET } from "~/keys";

export default (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    return null;
  }
};
