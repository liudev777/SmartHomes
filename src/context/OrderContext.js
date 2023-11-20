import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderNumber, setOrderNumber] = useState(() => {
    return parseInt(localStorage.getItem('lastOrderNumber')) || 0;
  });

  const incrementOrderNumber = () => {
    setOrderNumber(prevOrderNumber => {
      const newOrderNumber = prevOrderNumber + 1;
      localStorage.setItem('lastOrderNumber', newOrderNumber); // Update local storage
      return newOrderNumber;
    });
  };

  return (
    <OrderContext.Provider value={{ orderNumber, incrementOrderNumber }}>
      {children}
    </OrderContext.Provider>
  );
};


export const useOrder = () => useContext(OrderContext);
