import {
  CURRENCY, SET_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDIT,
} from '../actions';

const INITIAL = {
  currencies: [],
  expenses: [],
  values: 0,
  editing: false,
  editId: 0,
};

const walletReducer = (state = INITIAL, action) => {
  switch (action.type) {
  case CURRENCY: {
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((a) => a !== 'USDT'),
    };
  }
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      values: state.values
      + (action.payload.value
        * action.payload.exchangeRates[action.payload.currency].ask),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      values: state.values
        - (
          (state.expenses.find((x) => x.id === action.payload).value)
          * (state.expenses.find((x) => x.id === action.payload)
            .exchangeRates[
              state.expenses.find((x) => x.id === action.payload).currency
            ].ask)
        ).toFixed(2),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editId: action.payload,
      editing: true,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: action.payload,
      editing: false,
    };
  default: return state;
  }
};

export default walletReducer;
