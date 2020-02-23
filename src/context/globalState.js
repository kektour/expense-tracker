import React, { createContext, useReducer } from 'react';

const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
const ADD_TRANSACTION = 'ADD_TRANSACTION';

const initialState = {
  transactions: [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
  ]
};

function globalReducer(state, action) {
  switch (action.type) {
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext();

function GlobalProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(globalReducer, initialState);

  function deleteTransaction(id) {
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  }

  function addTransaction(transaction) {
    dispatch({ type: ADD_TRANSACTION, payload: transaction });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
