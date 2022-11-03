import nextConnect from "next-connect";
import database from "./database";
import cors from "cors";
import session from "./session";

const middleware = nextConnect();
middleware
  .use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }))
  .use(database)
  .use(session);

export default middleware;
