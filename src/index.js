import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Blog from './component/blog/Blog';
import BlogDetail from './component/blog/Blogdetail';
import App from './App';
import Login from './component/login-regiter/Login';
import Register from './component/login-regiter/Register';
import Home from './component/Layuot/Home';


import Update from './component/Account/Update';
import Myproduct from './component/Account/Myproduct';
import Addproduct from './component/Account/Addproduct';
import Edit from './component/Account/Edit';
import Showproduct from './component/home/Showproduct';
import Addtocart from './component/home/Addtocart';
import Productdetail from './component/home/Productdetail';
import Cart from './component/home/Cart';
import { Provider } from 'react-redux';
import store from './component/home/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogdetail/:id" element={<BlogDetail />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/account" element={<Update />} />
          <Route path="/myproduct" element={<Myproduct />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/edit-product/:id" element={<Edit />} />
          <Route path='/showproduct' element={<Showproduct />} />
          <Route path='/add-cart' element={<Addtocart />} />
          <Route path="/productdetail/:id" element={<Productdetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </App>
    </Router>
  </Provider>
);

reportWebVitals();