import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const data = {
    ...req.body.data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDelete: false,
  };
  if (req.body.data) {
    const id = await req.db.collection('students').findOne({ id: data.id });
    if (id) {
      res
        .status(201)
        .json({ message: `${req.body.data.id} is already in the system.` });
    } else {
      const result = await req.db.collection('students').insertOne({
        ...data,
      });
      if (result.acknowledged) {
        res.status(200).json({ message: `${req.body.data.id} is created.` });
      }
    }
  } else {
    res.status(500).send('Internal Server Error');
  }
});

export default handler;
