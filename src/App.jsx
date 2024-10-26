import './App.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {ProdcutsCategoriesProvider} from "./context/ProductsCategoriesContext.jsx";
import { CartContextProvider } from './context/CartContext.jsx';
import { TimeContextProvider } from './context/TimeContext.jsx';

function App() {

  return (
    <TimeContextProvider>
    <CartContextProvider>
    <ProdcutsCategoriesProvider>
    <ModalProvider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </ModalProvider>
    </ProdcutsCategoriesProvider>
    </CartContextProvider>
    </TimeContextProvider>
  )
}

export default App
