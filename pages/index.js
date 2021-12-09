//import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography} from '@material-ui/core';
import Layout from '../components/Layout';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import NextLink from 'next/link';
import db from "../utils/dbConnection"
import Product from '../models/Product';

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <div>
        <h1>Produtos</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            //md= numero de produtos
            <Grid item md={4} key={product.name}>
              <Card>
                {/* Criando Hooks para cada produto dinamicamente usando o slug do produto do data.js*/}
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      {/*formatação de produtos*/}
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  {/*formatação de preços*/}
                  <Typography>R$ {product.price} </Typography>
                  <Button size="small" color="primary">
                    Add no carrinho
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

// pega a lista de produtos do db e passa pra home
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
