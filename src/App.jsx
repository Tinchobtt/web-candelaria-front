import './App.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {ProdcutsCategoriesProvider} from "./context/ProductsCategoriesContext.jsx";
import { CartContextProvider } from './context/CartContext.jsx';

function App() {

  return (
      <CartContextProvider>
      <ProdcutsCategoriesProvider>
      <ModalProvider>
          <BrowserRouter>
              <AppRouter />
          </BrowserRouter>
      </ModalProvider>
      </ProdcutsCategoriesProvider>
      </CartContextProvider>
  )
}

export default App
