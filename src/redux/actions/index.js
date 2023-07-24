export const LOAD_EMAIL = 'LOAD_EMAIL';
export const CURRENCY = 'CURRENCY';
export const SET_EXPENSE = 'SET_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT = 'SAVE_EDIT';

export const loadEmail = (email) => ({
  type: LOAD_EMAIL,
  payload: email,
});

export const currency = (currencies) => ({
  type: CURRENCY,
  payload: currencies,
});

export const addExpenses = (thatState) => ({
  type: SET_EXPENSE,
  payload: thatState,
});

export const fetchApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  dispatch(currency(data));

  return data;
};

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEdit = (newExpense) => ({
  type: SAVE_EDIT,
  payload: newExpense,
});
