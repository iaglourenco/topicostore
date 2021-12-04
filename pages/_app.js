import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // arrumando problema de rendenizaçao do css do server side no refresh da pagina
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
