import React from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
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
import { mergeClasses } from '@material-ui/styles';
import useStyles from '../../utils/styles';
import Image from 'next/image';

export default function ProductScreen() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const product = data.products.find((a) => a.id === id);

  if (!product) {
    return <div> Produto inexistente</div>;
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
            Layout="responsive "
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
                    <Typography>R${product.price}</Typography>
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
                <Button fullWidth variant="contained" color="primary">
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
