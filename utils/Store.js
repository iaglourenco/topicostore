import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

//Retorna o valor de contexto atual, o atualizando e renderizando
export const Store = createContext();
const initialState = {
  //salvando preferencia do usuário do darkMode
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
};

//atualização do darkMode pelo state
function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    default:
      //padrão = manter antigo, guardado nos Cookies
      return state;
  }
}
//todos os componentes dentro de StoreProvider terão acesso ao value, e state do darkmode
export function StoreProvider(props) {
  //atualizar o estado e coloca na fila de re-renderização do componente (useState)
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
