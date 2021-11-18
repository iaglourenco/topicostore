import connect from "../../../utils/dbConnection";
import User from "../../../models/User";

connect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser)
          return res.status(404).json({ message: "User not found" });
        res.status(200).json(deletedUser);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(400).json({ message: "Method not allowed" });
      break;
  }
};
