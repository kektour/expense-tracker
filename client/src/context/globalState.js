import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const GET_TRANSACTIONS_IS_LOADING = 'GET_TRANSACTIONS_IS_LOADING';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
const TRANSACTION_ERROR = 'TRANSACTION_ERROR';

const initialState = {
  transactions: [],
  isError: null,
  isLoading: false
};

function globalReducer(state, action) {
  switch (action.type) {
    case GET_TRANSACTIONS_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isLoading: false
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(t => t._id !== action.payload)
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext();

function GlobalProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(globalReducer, initialState);

  async function getTransactions() {
    try {
      dispatch({ type: GET_TRANSACTIONS_IS_LOADING });
      const res = await axios.get('/v1/api/transactions');
      dispatch({ type: GET_TRANSACTIONS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err.response.data });
    }
  }

  async function addTransaction(transaction) {
    try {
      const res = await axios.post('/v1/api/transactions', transaction, { headers: { 'Content-Type': 'application/json' } });
      transaction = res.data.data;
      dispatch({ type: ADD_TRANSACTION, payload: transaction });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err.response.data });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/v1/api/transactions/${id}`);
      dispatch({ type: DELETE_TRANSACTION, payload: id });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err.response.data });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        isLoading: state.isLoading,
        isError: state.isError,
        getTransactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
