import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import Table from '../components/Table';
import mockData from './helpers/mockData';

const descriptionInput = 'description-input';
const currencyInput = 'currency-input';
const methodInput = 'method-input';
const valueInput = 'value-input';
const creditCard = 'Cartão de crédito';
const email = 'example@xablau.com';
const pass = 'asd123';

describe('Test Login page', () => {
  it('testa se tem um testo trybewallet"', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/trybewallet!/i);
    expect(text).toBeInTheDocument();
  });

  it('testa se tem"Login"', () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByText(/login/i);

    expect(login).toBeInTheDocument();
  });

  it('test login', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    userEvent.type(inputPass, pass);

    expect(inputEmail.value).toBe(email);
    expect(inputPass.value).toBe(pass);
  });

  it('testando button', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
  it('testa se tem  "trybeWallet"', () => {
    renderWithRedux(<Wallet />);
    const twallet = screen.getByText(/trybeWallet/i);
    expect(twallet).toBeInTheDocument();
  });

  it('testa a rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    userEvent.type(inputEmail, email);
    userEvent.type(inputPass, pass);

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Test Wallet page', () => {
  it('test if theres a text "Header"', () => {
    renderWithRedux(<Wallet />);

    const header = screen.getByText(/header/i);

    expect(header).toBeInTheDocument();
  });

  it('testa se tem  email text', () => {
    renderWithRedux(<Wallet />);

    const emailTxt = screen.getByTestId('email-field');

    expect(emailTxt).toBeInTheDocument();
  });

  it('test if theres a value', () => {
    renderWithRedux(<Wallet />);

    const value = screen.getByTestId('total-field');

    expect(value).toBeInTheDocument();
    expect(value.innerHTML).toEqual('0.00');
  });

  it('testa os inputs', () => {
    renderWithRedux(<Wallet />);
    const inputVal = screen.getByTestId(valueInput);
    const inputDesc = screen.getByTestId(descriptionInput);
    const inputCur = screen.getByTestId(currencyInput);
    const inputMeth = screen.getByTestId(methodInput);
    const inputTag = screen.getByTestId('tag-input');

    expect(inputVal).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(inputCur).toBeInTheDocument();
    expect(inputMeth).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
  });

  it('testa seleção de moeda', () => {
    renderWithRedux(<Wallet />);

    const currency = screen.getByTestId(currencyInput);

    userEvent.selectOptions(currency, 'BTC');
    expect(currency.value).toBe('BTC');
  });

  it('testa metodos de pagamento', () => {
    renderWithRedux(<Wallet />);

    const method = screen.getByTestId(methodInput);

    userEvent.selectOptions(method, creditCard);
    expect(method.value).toBe(creditCard);
  });

  it('testa opções', () => {
    renderWithRedux(<Wallet />);

    const category = screen.getByTestId('tag-input');

    userEvent.selectOptions(category, 'Lazer');
    expect(category.value).toBe('Lazer');
  });

  it('teste button', () => {
    renderWithRedux(<Wallet />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('testa se renderiza table', () => {
    renderWithRouterAndRedux(<Table />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });

  it('testa table', async () => {
    renderWithRedux(<Wallet />);

    const inputVal = screen.getByTestId(valueInput);
    const inputDesc = screen.getByTestId(descriptionInput);
    const inputCurr = await screen.findByTestId(currencyInput);
    const inputMeth = screen.getByTestId(methodInput);
    const inputTag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(inputVal, '123');
    userEvent.type(inputDesc, 'abc');
    // screen.debug();
    await waitFor(() => {
      userEvent.selectOptions(inputCurr, 'CAD');
    });
    userEvent.selectOptions(inputMeth, creditCard);
    userEvent.selectOptions(inputTag, 'Lazer');
    userEvent.click(button);
    await waitFor(() => {
      const desc = screen.getByText(/abc/i);
      const tag = screen.getByRole('cell', { name: /lazer/i });
      const meth = screen.getByRole('cell', { name: /cartão de crédito/i });
      const val = screen.getByRole('cell', { name: /123.00/i });
      const valConv = screen.getByTestId(/convertValue/i);
      const value = screen.getByTestId('total-field');
      expect(desc).toBeInTheDocument();
      expect(tag).toBeInTheDocument();
      expect(meth).toBeInTheDocument();
      expect(val).toBeInTheDocument();
      expect(valConv).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });
  it('testa o que tem dentro de  table', () => {
    renderWithRedux(<Wallet />);

    const desc = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const meth = screen.getByRole('columnheader', { name: /método de pagamento/i });

    expect(desc).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(meth).toBeInTheDocument();
  });
});

describe('Test Buttons at table', () => {
  it('test edit button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRedux(<Wallet />);

    const inputVal = screen.getByTestId(valueInput);
    const inputCur = screen.getByTestId(currencyInput);
    const inputMeth = screen.getByTestId(methodInput);
    const inputDesc = screen.getByTestId(descriptionInput);
    const inputTag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(inputVal, '123');
    userEvent.value(inputDesc, 'abc');
    userEvent.selectOptions(inputCur, 'CAD');
    userEvent.selectOptions(inputMeth, creditCard);
    userEvent.selectOptions(inputTag, 'Lazer');
    userEvent.click(button);

    const editButton = await screen.findByTestId('edit-btn');

    userEvent.click(editButton);

    expect(addExpenseButton).toHaveTextContent('Editar despesa');

    userEvent.type(inputVal, '244');
    userEvent.type(inputDesc, 'eur');

    expect(inputVal).toHaveValue(244);
    expect(inputDesc).toHaveValue('eur');

    userEvent.click(addExpenseButton);

    expect(addExpenseButton).toHaveTextContent('Adicionar despesa');
  });
});
