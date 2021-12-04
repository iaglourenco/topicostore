import { makeStyles } from '@material-ui/core';
// função do material UI para mudar css, semelhante a criação de um objeto em javascript
const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    //muda o style do child, no caso o texto com o nome da loja
    '& a': {
      color: '#FFFFFF',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
});
export default useStyles;