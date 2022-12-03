import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const id = req.query.id;
  const password = req.query.password;
  if (req.query?.id) {
    const idExist = await req.db
      .collection('students')
      .findOne({ id: id, password: password });
    if (idExist) {
      delete idExist.password;
      res
        .status(200)
        .json({ message: `Found your account`, userData: idExist });
    } else {
      res.status(201).json({
        message: `Id and password does not match. Or It may not exist in system. Please retry or create new one`,
      });
    }
  }
});

export default handler;
