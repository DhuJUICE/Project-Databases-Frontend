import React from 'react';
import '../styles/menu.css';

const Menu = () => {
  return (
    <div>
      <main>
        <div className="menu">
          <div className="row">
            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product 1" />
              <p>Product 1</p>
              <p>R100</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product 2" />
              <p>Product 2</p>
              <p>R150</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Product 3" />
              <p>Product 3</p>
              <p>R200</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;
