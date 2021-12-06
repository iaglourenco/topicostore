import Product from "../models/Product";
import imagesView from "./images_view";

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviews,
      images: imagesView.renderMany(product.images),
    };
  },

  renderMany(products: Product[]) {
    return products.map((product) => this.render(product));
  },
};
