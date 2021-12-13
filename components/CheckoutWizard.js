import { StepLabel, Stepper, Step } from '@material-ui/core';
import React from 'react';
import useStyles from '../utils/styles';

export default function checkoutWizard({ activeStep = 0 }) {
  const classes = useStyles();
  return (
    <Stepper
      className={classes.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {[
        'Login',
        'Endereço de entrega',
        'Metodo de pagamento',
        'Finalizar Compra',
      ].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
