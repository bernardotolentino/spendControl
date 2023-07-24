import React from 'react';
import { Navbar } from 'react-bootstrap';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <Navbar>
        <div>
          <Header />
          <WalletForm />
          <Table />
        </div>
      </Navbar>
    );
  }
}
export default Wallet;
