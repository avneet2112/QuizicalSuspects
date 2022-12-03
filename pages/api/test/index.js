import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const dataToSend = {
      ...req.body.data,
    };

    if (req.body) {
      const testExist = await req.db
        .collection('domainQuestions')
        .findOne({ ...dataToSend });
      if (testExist) {
        res.status(201).json({ message: `Similar Test Exist` });
      } else {
        const newTest = await req.db.collection('domainQuestions').insertOne({
          ...dataToSend,
        });
        if (newTest) {
          res
            .status(200)
            .json({ message: `New Question created`, data: newTest });
        } else {
          res.status(403).json({ message: `Fail to enter` });
        }
      }
    }
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

handler.patch(async (req, res) => {
  try {
    const dataToSend = {
      ...req.body.data,
    };
    const questionId = req.body.editValues?._id;

    if (req.body) {
      const testExist = await req.db
        .collection('domainQuestions')
        .findOne({ _id: ObjectId(questionId) });
      if (testExist) {
        const newTest = await req.db.collection('domainQuestions').updateOne(
          { _id: ObjectId(questionId) },
          {
            $set: { ...dataToSend },
          }
        );

        if (newTest) {
          res.status(200).json({
            message: `Question Details Updated Successfully`,
            data: newTest,
          });
        } else {
          res.status(403).json({ message: `Fail to enter` });
        }
      } else {
        res.status(201).json({ message: `Failed to update` });
      }
    }
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

handler.get(async (req, res) => {
  try {
    const totalTest = await req.db
      .collection('domainQuestions')
      .find()
      .toArray();
    if (totalTest) {
      res
        .status(200)
        .json({ message: `Data Found Successfully`, data: totalTest });
    }
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

export default handler;
