import User from "../models/User";
import imagesView from "./images_view";

export default {
  render(user: User) {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
