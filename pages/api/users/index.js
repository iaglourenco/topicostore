import connect from "../../../utils/dbConnection";
import User from "../../../models/User";

connect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Method not allowed" });
      break;
  }
};
