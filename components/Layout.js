import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { createTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  ThemeProvider,
  CssBaseline,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state; //usado na createMuiTreme
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
        mode: 'light',
        primary: {
          main: '#f0c000',
        },
        secundary: {
          main: '#208080',
        },
      },
    },
  });
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    e.preventDefault();
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };

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
              {/*Hook do nome do site para FrontPage*/}
              <Link>
                <Typography className={classes.brand}>Tópicos Store</Typography>
              </Link>
            </NextLink>
            {/*esse div vai ocupar todo o width para jogar os outros divs no final
          para isso a classe grow*/}
            <div className={classes.grow}></div>
            <div>
              {/*Hook para carrinho e login*/}
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Carrinho
                    </Badge>
                  ) : (
                    'Carrinho'
                  )}
                </Link>
              </NextLink>
              {userInfo ? ( //se ja estiver logado, botão de login se transforma no nome do cliente
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={(e) => loginMenuCloseHandler(e, null)}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Minha Conta
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Historico de pedido
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/products')
                        }
                      >
                        Painel admin
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
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
