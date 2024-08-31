import './App.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {ProdcutsCategoriesProvider} from "./context/ProductsCategoriesContext.jsx";
import { CartContextProvider } from './context/CartContext.jsx';
import { TimeContextoProvider } from './context/TimeContext.jsx';

function App() {

  return (
    <TimeContextoProvider>
    <CartContextProvider>
    <ProdcutsCategoriesProvider>
    <ModalProvider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </ModalProvider>
    </ProdcutsCategoriesProvider>
    </CartContextProvider>
    </TimeContextoProvider>
  )
}

export default App
