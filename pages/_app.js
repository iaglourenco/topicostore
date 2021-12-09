import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import '../styles/globals.css';
//import { Provider } from 'next-auth/client';
import { StoreProvider } from '../utils/Store';

function MyApp({ Component, pageProps }) {
  // arrumando problema de rendenizaçao do css do server side no refresh da pagina
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
