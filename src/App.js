import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './component/Layuot/Footer';
import Header from './component/Layuot/Header';
import MenuLeft from './component/Layuot/Menuleft';
import { CartProvider } from './component/home/Cartcontext';
function App(props) {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  return (
    <CartProvider>
      <Header />

      <section>
        <div className="container">
          <div className="row">
            {currentPath.includes('update') ||
              currentPath.includes('account') ||
              currentPath.includes('myproduct') ||
              currentPath.includes('addproduct') ||
              currentPath.includes('edit-product') ||
              currentPath.includes('cart')
              ? null : <MenuLeft />}

            {props.children}

          </div>
        </div>
      </section>

      <Footer />
    </CartProvider>
  );
}

export default App;