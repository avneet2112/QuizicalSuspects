import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  if (req.query?.email) {
    const emailExist = await req.db
      .collection("students")
      .findOne({ email: email, password: password });
    if (emailExist) {
      delete emailExist.password;
      res
        .status(200)
        .json({ message: `Found your account`, userData: emailExist });
    } else {
      res.status(201).json({
        message: `Email and password does not match. Or It may not exist in system. Please retry or create new one`,
      });
    }
  }
});

export default handler;
