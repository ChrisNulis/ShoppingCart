import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import { Navbar, Products } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }
  const fetchCart = async () => {
    setCart (await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    try {
      const item = await commerce.cart.add(productId, quantity);
      console.log('Cart Item:', item); // Log the item object to inspect the structure
  
      // Check for errors in the response
      if (!item.success) {
        console.error('Error in commerce.cart.add. Response:', item);
        // Handle the error, display a message to the user, etc.
      } else {
        setCart(item.cart);
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
      // Handle other types of errors, such as network issues
    }
  };


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
 console.log(cart);
  

  return (
    <div>
        <Navbar />
        <Products products = {products} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default App