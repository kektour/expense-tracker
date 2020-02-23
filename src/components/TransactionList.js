import React, { useContext } from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/globalState';

function TransactionList() {
  const context = useContext(GlobalContext);
  const { transactions } = context;

  return (
    <React.Fragment>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(t => (
          <Transaction key={t.id} transaction={t} />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default TransactionList;
