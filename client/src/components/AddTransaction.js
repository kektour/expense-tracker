import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/globalState';

function AddTransaction() {
  const context = useContext(GlobalContext);
  const { addTransaction } = context;

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount
    };
    addTransaction(newTransaction);
  }

  return (
    <React.Fragment>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={e => {
              setText(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            placeholder="Enter amount..."
            value={amount}
            onChange={e => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </React.Fragment>
  );
}

export default AddTransaction;
