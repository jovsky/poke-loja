import React from 'react';
import './App.css';
import PokeList from './components/pokeList/pokeList'
import FilterMenu from './components/filterMenu/filterMenu';
import SideCart from './components/sideCart/sideCart';
import { Row, Container, Nav, Navbar } from 'react-bootstrap';
import brand from './asserts/images/ball-pixel-big.png'

function App() {

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark" style={{backgroundColor: 'black'}}>
        <Navbar.Brand href="#home">
          <img src={brand} alt="brandimg"></img>
          Master PokéMart
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>

      <Container fluid className="">
        <Row className="main-div">
          <FilterMenu />
          <PokeList />
          <SideCart />
        </Row>
      </Container>

      <div className="cart-resume"></div>


    </div>
  );
}

export default App;
