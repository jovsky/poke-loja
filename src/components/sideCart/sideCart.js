import React, { Component } from 'react';
import './style.css'
import { Col, Row, Container, Button } from 'react-bootstrap';
import store from './../../redux/store/store'
import cartIcon from './../../asserts/images/cart-ball.png'

function formatMoney(float) {
  const int = parseInt(float);
  const strInt = (int).toString()
  let decimal = ((float - int) * 100).toFixed(0);
  if (decimal === "0") decimal += "0"


  let newStr = "";
  const len = strInt.length
  for (let i = len - 1; i >= 0; i--) {
    if ((i + 1) % 3 === 0 && (i + 1) !== len) {
      newStr += ".";
    }
    newStr += strInt.charAt(len - 1 - i);
  }
  const final = newStr + "," + decimal.toString()
  return final
}

export default class SideCart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      totalPriceNum: 0,
      totalPriceStr: "0,00",
      canDelete: false
    }
  }

  async componentDidMount() {
    store.subscribe( () => {
      this.setState({
        items: store.getState().cartItems
      });
      this.updateElements();
    });
    this.setState({
          items: []
    })
    store.dispatch({
      type: "LOAD_ITEMS",
      items: this.state.items
    })
    // window.store = store;
    // console.log(store.getState())
  }

  updateElements = () => {
    setTimeout( () => {
      let total = 0;
      this.state.items.map( item => total += item.priceNum);
      this.setState({
        totalPriceNum: total,
        totalPriceStr: formatMoney(total),
      });
    }, 100)
  }

  handleClickDelBtn = () => {
    this.setState({
      canDelete: !this.state.canDelete
    })
  }

  handleClickDelItem = (code) => {
    store.dispatch({
      type: "DELETE_ITEM",
      code
    })
  }

  render() {

    return (
      <Col xs={5} sm={4} md={3} lg={3} className="poke-cart-div">
        <Row id="cart-title-col" className="py-2">
          <Col xs={6}>
            <h1 id="cart-title-text">Carrinho</h1>
          </Col>
          <Col xs={3}>
            <img src={cartIcon} height={'60px'} alt="cart-ball"/>
          </Col>
        </Row>

          {/** DELETE ITEM BUTTON */}
        <Row style={{
                display: this.state.items.length > 0 ? 'flex':'none',
                flexDirection: 'row'}}>
          <Col xs={{spane: 2, offset: 8}}>
            <Button 
                  size={'sm'} 
                  id="del-item-btn"
                  onClick={this.handleClickDelBtn} 
                  style={{
                    backgroundColor: 'red',
                    opacity: this.state.canDelete ? '100%' : '50%', 
                    color: 'white',
                    fontWeigth: '700',
                    border: 'none'}} 
                  width={'20px'}>
                    <span role="img" aria-label="del-item">↓🗑️</span>
            </Button>
          </Col>
        </Row>
        <Container fluid className="poke-cart-container">
        {
          this.state.items.map( item => {
            return (
              <Row 
                    key={item.code} 
                    onClick={this.state.canDelete ? () =>{this.handleClickDelItem(item.code) }: ''} 
                    className="cart-item-row"
                    style={{
                      backgroundColor: this.state.canDelete ? 'rgb(255,0,0,0.1)' : 'transparent',
                      cursor: this.state.canDelete ? 'pointer' : 'auto'
                    }}>
                <Col xs={1} id="item-quantity">{item.quantity}x </Col>
                <Col xs={9} lg={5} id="item-poke-name">{item.name}</Col>
                <Col xs={1} id="item-shiny">{(item.shiny) ? "★" : ""}</Col>
                <Col xs={12} lg={5} id="item-price">R$ {item.priceStr}</Col>
              </Row>
            )
          })
        }


        {/* <div class="card">
          <div class="card-header">
            <a class="card-link" data-toggle="collapse" href="#collapseOne">
              Collapsible Group Item #1
            </a>
          </div>
          <div id="collapseOne" class="collapse show">
            <div class="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div> */}


        </Container>
        <Row id="total-price-row">
          <Col xs={3}>Total </Col>
          <Col xs={9} style={{color: 'rgb(255,56,92)'}}>R$ {this.state.totalPriceStr}</Col></Row>
        {
          this.state.items.length > 0 ? 
            <Button className="buy-btn">Comprar</Button> : ''
        }
      </Col>
    );

  }
}