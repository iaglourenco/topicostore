import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/dbConnection';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Nome',
    slug: 'slug-' + Math.random(),
    image: '/images/alguma.jpg',
    price: 0,
    category: 'Categoria',
    brand: 'Marca',
    countInStock: 0,
    description: 'Descrição',
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Produto Criado', product });
});

export default handler;
