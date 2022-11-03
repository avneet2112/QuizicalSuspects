import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const data = {
    ...req.body.data,
    role: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDelete: false,
  };
  if (req.body.data) {
    const emailExist = await req.db
      .collection("students")
      .findOne({ email: data.email });
    if (emailExist) {
      res
        .status(201)
        .json({ message: `${req.body.data.email} is already in the system.` });
    } else {
      const result = await req.db.collection("students").insertOne({
        ...data,
      });
      if (result.acknowledged) {
        res.status(200).json({ message: `${req.body.data.email} is created.` });
      }
    }
  } else {
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
