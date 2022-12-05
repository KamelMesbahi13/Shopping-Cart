import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShoppingCartContext from './context/ShoppingCartContext'
import NavBar from './Components/NavBar';
import Store from './Pages/Store';

const App: React.FC = () => {
  return (
    <ShoppingCartContext>
      <div className='container'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Store />}/>
        </Routes>
      </div>
    </ShoppingCartContext>
  )
}

export default App