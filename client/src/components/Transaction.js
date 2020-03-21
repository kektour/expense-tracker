import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalState';

function Transaction(props) {
  const context = useContext(GlobalContext);
  const { deleteTransaction } = context;

  const { transaction } = props;
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button
        className="delete-btn"
        onClick={() => {
          deleteTransaction(transaction._id);
        }}
      >
        x
      </button>
    </li>
  );
}

export default Transaction;
