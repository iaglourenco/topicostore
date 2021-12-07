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
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
    //session={pageProps.session}>
  );
}

export default MyApp;
