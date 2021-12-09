import BuyRecord from "../models/BuyRecord";

export default {
  render(buyRecord: BuyRecord) {
    return {
      id: buyRecord.id,
      enviado: buyRecord.enviado,
      status: buyRecord.status,
      total: buyRecord.total,
      products: buyRecord.products.map((product) => {
        return {
          name: product.name,
          price: product.price,
          category: product.category,
        };
      }),
    };
  },

  renderMany(buyRecords: BuyRecord[]) {
    return buyRecords.map((buyRecord) => this.render(buyRecord));
  },
};
