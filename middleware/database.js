// import { connectToDatabase } from "../lib/db";
import clientPromise from "../lib/db";

export default async function database(req, res, next) {
  try {
    const client = await clientPromise;
    if (client) {
      req.dbClient = client;
      req.db = client.db();
    } else {
      res.status(500).send("Could not connect to database.");
    }
    return next();
  } catch (err) {
    console.log("***database middleware error | ", err);
    return next();
  }
}
