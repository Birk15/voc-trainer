import React from 'react';
import Navbar from './components/navbar';
import AppRouter from './components/app_routes';
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
      <div>
        <BrowserRouter>
         <Navbar />
         <AppRouter />
        </BrowserRouter>
      </div>
    );
}
 
export default App;
