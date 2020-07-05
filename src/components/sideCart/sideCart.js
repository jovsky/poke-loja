import React, { Component } from 'react';
import './style.css'
import { Col, Row, Container, Button, Modal } from 'react-bootstrap';
import store from './../../redux/store/store'
import cartIcon from './../../asserts/images/cart-ball.png'

function formatMoney(float) {
  const int = parseInt(float);
  const strInt = (int).toString()
  let decimal = ((float - int) * 100).toFixed(0);
  if (decimal.length === 1) decimal += "0"


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
      canDelete: false,
      showModal: false
    }
  }

  async componentDidMount() {
    store.subscribe(() => {
      this.setState({
        items: store.getState().cartItems
      });
      this.updateElements();
    });

    let localList;

    localList = JSON.parse( localStorage.getItem('cartItems') ) || []

    console.log('getState', store.getState().cartItems)
    this.setState({
      items: localList
    })

  }

  updateElements = () => {
    setTimeout(() => {
      let total = 0;
      this.state.items.map(item => total += item.priceNum);
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

  handleBuy = (action) => {
    if (action === 'show')
      this.setState({ showModal: true });
    else if (action === 'close') {
      this.setState({ showModal: false });
      store.dispatch({
        type: "CLEAR_LIST",
      })
    }
  }

  // clearList = () => {
  //   store.dispatch({
  //     type: "CLEAR_LIST",
  //   })
  // }

  render() {

    return (
      <Col xs={5} sm={4} md={3} lg={3} className="poke-cart-div">
        <Row id="cart-title-row" className="py-2">
          <Col xs={8} md={6}>
            <h1 id="cart-title-text">Carrinho</h1>
          </Col>
          <Col xs={2} md={3}>
            <img src={cartIcon} height={'45px'} alt="cartn-ball" />
          </Col>
        </Row>

        {/** DELETE ITEM BUTTON */}
        <Row style={{
          display: this.state.items.length > 0 ? 'flex' : 'none',
          flexDirection: 'row'
        }}>
          <Col xs={{ spane: 2, offset: 8 }}>
            <Button
              size={'sm'}
              id="del-item-btn"
              onClick={this.handleClickDelBtn}
              style={{
                backgroundColor: 'red',
                opacity: this.state.canDelete ? '100%' : '30%',
                color: 'white',
                fontWeigth: '700',
                border: 'none'
              }}
              width={'20px'}>
              <span role="img" aria-label="del-item">↓🗑️</span>
            </Button>
          </Col>
        </Row>
        <Container fluid className="poke-cart-container">
          {
            this.state.items.map(item => {
              return (
                <Row
                  key={item.code}
                  onClick={this.state.canDelete ? () => { this.handleClickDelItem(item.code) } : ()=>{}}
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

        </Container>
        <Row id="total-price-row">
          <Col xs={12} md={2}>Total </Col>
          <Col xs={12} md={10} style={{ color: 'rgb(255,56,92)' }}>R$ {this.state.totalPriceStr}</Col>
        </Row>
        {
          this.state.items.length > 0 ?
            <Button id="buy-btn" className="mt-3" onClick={() => { this.handleBuy('show') }} >
              Comprar
            </Button> : ''
        }


        {/** MODAL OBRIGADO */}
        <Modal show={this.state.showModal} onHide={() => { this.handleBuy('close') }}>
          <Modal.Header closeButton>
            <Modal.Title>Obrigado, treinador!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col className="modal-thanks-div" xs={12}>
            <img 
            src={'https://25.media.tumblr.com/tumblr_lh013m9gyV1qgjv7io1_500.gif'} 
            height="100px"
            alt="thanks"></img>
            <p>
              Seus Pokémon foram comprados com sucesso :)
            </p>
            </Col>
            <Container className="px-4">
              {this.state.items.map(item => {
                return (
                  <Row key={item.code} className="cart-item-row-buy">
                    <Col xs={1} id="item-quantity">{item.quantity}x </Col>
                    <Col xs={5} id="item-poke-name">{item.name}</Col>
                    <Col xs={1} id="item-shiny">{(item.shiny) ? "★" : ""}</Col>
                    <Col xs={5} id="item-price">R$ {item.priceStr}</Col>
                  </Row>
                )
              })}
            </Container>
            <Row id="total-price-row-buy">
              <Col xs={12} md={2}>Total </Col>
              <Col xs={12} md={10} style={{ color: 'rgb(255,56,92)' }}>R$ {this.state.totalPriceStr}</Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button id="buy-btn" onClick={() => { this.handleBuy('close') }}>
              Comprar mais
            </Button>
          </Modal.Footer>
        </Modal>

      </Col>
    );

  }
}
