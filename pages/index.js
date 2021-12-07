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
import data from '../utils/data';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Produtos</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                {/* Criando Hooks para cada produto dinamicamente usando o id do produto do data.js*/}
                <NextLink href={`/product/${product.id}`} passHref>
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
                  <Typography>R${product.price} </Typography>
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
