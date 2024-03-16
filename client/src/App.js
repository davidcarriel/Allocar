import './App.css';
import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './components/home.js'
import SignIn from './components/signin.js';
import SignUp from './components/signup.js';
import NotFoundPage from './components/notFoundPage.js';
import Requests from './components/requests.js';

function App() {
  return (
    <>
      <Toaster toastOptions={{ duration: 2000, style: { width: "40vw", height: "8vh", "fontSize": "20px", }, }} position="top-center" />
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/requests' element={<Requests />} />
            <Route path='/' element={<SignIn />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
