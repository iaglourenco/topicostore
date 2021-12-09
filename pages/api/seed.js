// seed some data to product model

import nc from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/dbConnection';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({message:'deu certo'});
});

export default handler;
