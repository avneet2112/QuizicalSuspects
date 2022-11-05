import { ObjectId } from "mongodb";
import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const date = new Date();
    const currentDate = date.valueOf();
    const randomStr = Math.floor(Math.random() * 10000 + 99999);
    const questionId = randomStr + "-" + currentDate;
    const dataToSend = {
      questionId: questionId,
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

handler.patch(async (req, res) => {
  try {
    const dataToSend = req.body.data.data;
    let writeAnswers = 0;
    let totalQuestions = dataToSend.length;
    let percentage = 0;
    if (dataToSend) {
      dataToSend.map((res) => {
        if (res.userAnswer == res.correctAnswer) {
          writeAnswers = writeAnswers + 1;
        }
      });
      percentage = (writeAnswers / totalQuestions) * 100;
      res.status(200).json({
        percentage: percentage,
        writeAnswers: writeAnswers,
        totalQuestions: totalQuestions,
      });
      // if (questionAdded) {
      //   res.status(200).json({ message: `New Question Added Successfully` });
      // } else {
      //   res.status(201).json({ message: `Fail to enter` });
      // }
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
