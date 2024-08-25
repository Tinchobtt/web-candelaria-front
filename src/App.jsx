import './App.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";
import {ProdcutsCategoriesProvider} from "./context/ProductsCategoriesContext.jsx";

function App() {

  return (
      <ProdcutsCategoriesProvider>
      <ModalProvider>
          <BrowserRouter>
              <AppRouter />
          </BrowserRouter>
      </ModalProvider>
      </ProdcutsCategoriesProvider>
  )
}

export default App
