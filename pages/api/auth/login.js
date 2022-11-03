import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  console.log("assaaa", req.query);
  const email = req.query.email;
  const password = req.query.password;
  if (req.query?.email) {
    const emailExist = await req.db
      .collection("students")
      .findOne({ email: email, password: password });
    if (emailExist) {
      res.status(200).json({ message: `Find you account` });
    } else {
      res.status(201).json({
        message: `Email and password does not match. Or It may not exist in system.`,
      });
    }
  }
});

export default handler;
