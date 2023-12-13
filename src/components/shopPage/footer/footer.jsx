import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

export const Footer = ({ getPrice }) => {
  // Ensure the price is a valid number, otherwise set it to 0
  const formattedPrice = isNaN(getPrice) || null? 0 : Math.max(getPrice, 0).toFixed(2);

  return (
    <>
      <div className='footer'>
        <h1 className='footer-total'>
          סכום לתשלום: <span className='money'>₪</span>
          <span className="priceMoney">{formattedPrice}</span>
        </h1>
        <Link to={"/cart"}>
          <button className="btn-footer">לסיום</button>
        </Link>
      </div>
    </>
  );
};
