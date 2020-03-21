import React, { useContext, useEffect } from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/globalState';

function TransactionList() {
  const context = useContext(GlobalContext);
  const { transactions, getTransactions } = context;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(t => (
          <Transaction key={t._id} transaction={t} />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default TransactionList;
