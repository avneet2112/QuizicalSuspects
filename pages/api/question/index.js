import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const dataToSend = {
      ...req.body.data,
    };
    if (req.body) {
      const questionAdded = await req.db
        .collection("domainQuestions")
        .findOneAndUpdate(
          { _id: ObjectId(req.body.questionId) },
          {
            $push: {
              allQuestions: dataToSend,
            },
          }
        );
      if (questionAdded?.value) {
        res.status(200).json({ message: `New Question Added Successfully` });
      } else {
        res.status(201).json({ message: `Fail to enter` });
      }
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

handler.get(async (req, res) => {
  try {
    if (req.query?.testId) {
      const test = await req.db
        .collection("domainQuestions")
        .findOne({ _id: ObjectId(req.query.testId) });
      if (test) {
        res
          .status(200)
          .json({ message: `Data Found Successfully`, data: test });
      }
    } else {
      res.status(201).send();
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
