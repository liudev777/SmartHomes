import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderNumber, setOrderNumber] = useState(0); // list of users

  const incrementOrderNumber = () => {
    setOrderNumber(prevOrderNumber => prevOrderNumber + 1);
  };

  return (
    <OrderContext.Provider value={{ orderNumber, incrementOrderNumber}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
