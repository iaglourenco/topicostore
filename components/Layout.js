import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import useStyles from '../utils/styles';

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeigth: '400',
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeigth: '400',
        margin: '1rem 0',
      },
      palette: {
        type: 'ligth',
        primary: {
          main: '##3f51b5',
        },
        secundary: {
          main: '#208080',
        },
      },
    },
  });
  const classes = useStyles();

  return (
    <div>
      <Head>
        {/* Se houver algum titulo usa o valor de title - nome da loja, se não só o nome da loja 
         o parametro entre crase é chamado Template String , ele substitui a necessidade do uso de ""+"" 
         quando ocorre quando juntamos uma string com uma variavel*/}
        <title>{title ? `${title}-Topicos Store` : 'Topicos Store'}</title>

        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Tópicos Store</Typography>
              </Link>
            </NextLink>
            {/*esse div vai ocupar todo o width para jogar os outros divs no final
          para isso a classe grow*/}
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>Carrinho</Link>
              </NextLink>
              <NextLink href="/lart" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved to @Topicos-Store</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
