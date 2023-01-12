import authResolvers from "./auth";
import postResolvers from "./post";

export default {
  ...postResolvers,
  ...authResolvers,
};
