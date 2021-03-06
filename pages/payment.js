import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import useStyles from '../utils/styles';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);

  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Método de pagamento obrigatório', { variant: 'erro' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod');
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Metodo de Pagamento">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Metodo de Pagamento
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                arial-label="Metodo de Pagamento"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  disabled
                  label="Cartão"
                  value="Cartão"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  disabled
                  label="Dinheiro"
                  value="Dinheiro"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continuar
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
            >
              Voltar
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
