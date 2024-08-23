import './App.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {ModalProvider} from "./context/ModalContext.jsx";

function App() {

  return (
      <ModalProvider>
          <BrowserRouter>
              <AppRouter />
          </BrowserRouter>
      </ModalProvider>
  )
}

export default App
