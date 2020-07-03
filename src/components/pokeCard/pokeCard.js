import React, { Component } from 'react';
import { getPokeData } from '../../back-end/getAPI';
import './style.css'
import { Col, Container, Form } from 'react-bootstrap';
import addCart from './../../asserts/images/add-to-cart.png'
import missingSprite from './../../asserts/images/missing-sprite.png'
import store from './../../redux/store/store'
import loading from './../../asserts/images/mini-loading.gif'

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

export default class PokeCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pokeData: undefined,
      shiny: false,
      priceNum: undefined,
      priceStr: undefined,
      sprite: undefined,
      quantity: 1,
      types: undefined,
      typesIcons: undefined
    }
  }

  async componentDidMount() {
    this.setState({
      pokeData: await getPokeData(this.props.pokeName),
      typesIcons: this.props.pokeTypesIcons,
    })
    try{
      this.setState({
        priceNum: parseFloat(this.state.pokeData.price_default),
        priceStr: formatMoney( this.state.pokeData.price_default ),
        sprite: this.state.pokeData.sprites.front_default !== null ?
        this.state.pokeData.sprites.front_default : missingSprite
      })
    }
    catch {

    }
  }

  handleCheckShiny = (event) => {

    this.setState({
      shiny: event.target.checked,
      sprite: (event.target.checked ? 
        (this.state.pokeData.sprites.front_shiny !== null ?
          this.state.pokeData.sprites.front_shiny : missingSprite
        ) : 
        (this.state.pokeData.sprites.front_default !== null ?
          this.state.pokeData.sprites.front_default : missingSprite
        )
      )
    })
    // update price
    let pr = (event.target.checked) ? this.state.pokeData.price_shiny : this.state.pokeData.price_default;
    pr *= this.state.quantity;
    this.setState({
      priceNum: pr,
      priceStr: formatMoney(pr)
    })
  }

  handleQuantityInput = (event) => {
    event.preventDefault();
    this.setState({ 
      quantity: parseInt(event.target.value) > 100 ? 100 : event.target.value,
    })
    // update price
    let pr = (this.state.shiny) ? this.state.pokeData.price_shiny : this.state.pokeData.price_default;
    pr *= event.target.value;
    this.setState({
      priceNum: pr,
      priceStr: formatMoney(pr)
    })
  }

  handleAddToCart = (event) => {
    event.preventDefault();

    store.dispatch({
      type: "ADD_ITEM",
      newItem: {
        name: this.state.pokeData.name,
        quantity: this.state.quantity,
        shiny: this.state.shiny,
        priceNum: this.state.priceNum,
        priceStr: this.state.priceStr,
        types: this.state.types
      }
    })
  }

  getTypes = () => {
    const ret = []
    for (let i = 0; i < Object.keys(this.state.pokeData.types).length; i++)
      ret.push(this.state.pokeData.types[i].type.name)
    return ret
  }

  render() {

    return (
      <Container fluid className="poke-card">
        {
          // (true) ?
        (this.state.pokeData === undefined) ?
          <img className="loading" src={loading} style={{width: '50px'}} alt="loading" /> : 
          <>
          <img className="poke-sprite" src={ this.state.sprite } alt="sprite" />
          <div className="pokemon-card-info">
            <h5 className="pokemon-card-name">{this.state.pokeData.name}</h5>
            <div className="pokemon-type"> {
              (this.getTypes() || []).map(name => {
                return <img className="type-icon" src={this.state.typesIcons[name]} key={name} alt={name} />;
              })
            } </div>
            <h4 className="pokemon-price"> R$ { this.state.priceStr }</h4>
          </div>

          <Form>
            <Form.Row>
              <Col xs={9}>
                <Form.Row>
                  <Col xs={4}>
                    <Form.Label> Shiny </Form.Label>
                  </Col>
                  <Col className="input-div">
                    <Form.Check id="input-check" className="shiny-input" onChange={this.handleCheckShiny} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col xs={4}>
                    <Form.Label> Qtd. </Form.Label> 
                  </Col>
                  <Col className="input-div">
                    <Form.Control 
                      id="input-qtd"
                      value={this.state.quantity} 
                      className="input-sm" 
                      type="number"
                      min="1"
                      max="100"
                      onChange={this.handleQuantityInput}/>
                  </Col>
                </Form.Row>
              </Col>
              <Col xs={3}>
              <button 
                className="submit-to-cart"
                type="submit" 
                onClick={this.handleAddToCart}> 
                  <img src={addCart} alt="+Cart"/>
              </button>
              </Col>
            </Form.Row>
          </Form>
          </>
        }
      </Container>
    );

  }
}
