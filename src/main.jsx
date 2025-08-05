import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx';
// import MainContainer from './Components/MainContainer.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appStore from './utils/store.js';
import { Provider } from 'react-redux';
import NotFound from './Components/NotFound.jsx';
import { lazy, Suspense } from 'react';
import spinnerGif from "./assets/spinner.gif"

const App = lazy(() => import("./App.jsx"))
const MainContainer = lazy(() => import("./Components/MainContainer.jsx"))

// lazy fallback spinner
const spinner = (
  <div style={{ textAlign: 'center', padding: '2rem'}}>
    <img src={spinnerGif} alt="Loading..." width="80" />
  </div>
);


const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={spinner}><App/></Suspense>,
      errorElement: <NotFound />
    },
    {
      path: "/mainContainer",
      element: <Suspense fallback={spinner}><MainContainer /></Suspense>
    }
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={appStore}>
        <RouterProvider router={appRouter}/>
    </Provider>
  </StrictMode>,
)
