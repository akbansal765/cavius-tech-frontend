import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appStore from './utils/store.js';
import { Provider } from 'react-redux';
import MainContainer from './Components/MainContainer.jsx';
import NotFound from './Components/NotFound.jsx';

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />
    },
    {
      path: "/mainContainer",
      element: <MainContainer />
    }
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={appStore}>
        <RouterProvider router={appRouter}/>
    </Provider>
  </StrictMode>,
)
