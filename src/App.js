import React from 'react';
import './App.css';
import PokeList from './components/pokeList/pokeList'
import FilterMenu from './components/filterMenu/filterMenu';
import SideCart from './components/sideCart/sideCart';
import { Row, Container } from 'react-bootstrap';


function App() {

  return (
    <div className="App">
      
      <div className="top-menu"></div>

      <Container fluid className="">
        <Row className="main-div">
          <FilterMenu/>
          <PokeList/>
          <SideCart/>
        </Row>
      </Container>

      <div className="cart-resume"></div>


    </div>
  );
}

export default App;
