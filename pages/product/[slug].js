import React,{useContext} from 'react';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
//import { mergeClasses } from '@material-ui/styles';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import Product from '../../models/Product';
import db from '../../utils/dbConnection';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product} = props;
  const classes = useStyles();

  if (!product) {
    return (
      <Layout>
        <div>
          <NextLink href="/" passHref>
            <Link>
              <Typography> Voltar aos Produtos</Typography>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Typography component="h1" variant="h1">
            Por enquanto não temos esse produto em nossa loja.
          </Typography>
        </Grid>
      </Layout>
    );
  }

  const addToCartHandler = async () =>{
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
        window.alert('Item fora de estoque');
        return;
    }
    dispatch({type:'CART_ADD_ITEM',payload: {...product,quantity: quantity }})
    router.push('/cart');

  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography> Voltar aos Produtos</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        {/*md= device medio , xs= device extra pequeno*/}
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            Layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Categoria:{product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Marca:{product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Avaliação:{product.rating} estrelas({product.numReviews}
                avaliações)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Descrição:
                {product.description}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Preço</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>R$ {product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Estoque</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'Em estoque' : 'Sem estoque'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary"
                onClick={addToCartHandler}>
                  adicionar ao carrinho
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;
  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
