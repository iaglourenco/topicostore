import Review from "../models/Review";

export default {
  render(review: Review) {
    return {
      id: review.id,
      opinion: review.opinion,
      productId: review.product,
      stars: review.stars,
      userId: review.user,
    };
  },

  renderMany(reviews: Review[]) {
    return reviews.map((review) => this.render(review));
  },
};
