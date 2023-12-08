import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import { Navbar, Products } from './components';

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.productslist();

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products)



  return (
    <div>
        <Navbar />
        <Products />
    </div>
  )
}

export default App