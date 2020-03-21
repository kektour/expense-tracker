import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalState';

function Balance() {
  const context = useContext(GlobalContext);
  const { transactions } = context;

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <React.Fragment>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </React.Fragment>
  );
}

export default Balance;
