import React, { Component } from 'react';
import { getTypesIcon, getFilteredPokeList } from '../../back-end/getAPI';
import PokeCard from './../pokeCard/pokeCard';
import { Col, Row, Container, Button } from 'react-bootstrap';
import './style.css'
import store from '../../redux/store/store'
import loading from './../../asserts/images/big-loading.gif'
import notFound from './../../asserts/images/not-found.png'

export default class PokeList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      pokeNameList: undefined,
      pokeTypesIcons: getTypesIcon(),
      filters: { },
      curPage: 1,
      limit: 24
    };
   }
  
  componentDidMount() {

    this.updatePokeList()

    store.subscribe( this.updatePokeList );

  }

  updatePokeList = () => {
    
    this.setState({
      filters: {
        ...store.getState().filters
      }
    });
    
    setTimeout( async () => {
      const hasFilters = !Object.values(this.state.filters).every( v => v === null )

      this.setState({
        curPage: hasFilters ? this.state.curPage : 1,
        pokeNameList: await getFilteredPokeList( hasFilters ? { ...this.state.filters } : null )
      })
    }, 500)
  }

  getArrayForPage = () => {
    return this.state.pokeNameList
    .slice(this.state.limit*(this.state.curPage-1), this.state.limit*this.state.curPage)
  }

  handleChangePage(num) {
    this.setState({
      curPage: num
    })
  }

  getPageButtons = () => {
    const n = Math.ceil(this.state.pokeNameList.length/this.state.limit)
    if (n <=1) return 
    const pageNums = []
    for(let i=1; i<=n; i++) 
      pageNums.push(i);
    return (
      <div className="page-btn-div">
        {pageNums.map( num => {
          return <Button 
                    key={num} 
                    id="page-btn"
                    onClick={() => {this.handleChangePage(num)}}
                    active={num === this.state.curPage}
                    >{num}</Button>
        })}
      </div>
    )
  }

  render() {
    return (
      <Col xs={7} sm={8} md={7} lg={7} className="poke-list-div">
        <Container fluid className="px-3 mx-0">
          <h1 id="title-catalog" className="mt-3">PokéCatálogo</h1>
          <Container fluid className="poke-list-container pt-3 px-4">
              { 
                (this.state.pokeNameList === undefined) ? 
                  <img src={loading} alt="loading"/> : 
                  (this.state.pokeNameList.length === 0) ? 
                  <>
                    <img src={notFound} alt="loading" /> 
                    <p style={{color: 'white', fontSize: '16px'}}>
                      Nenhum resultado foi encontrado :(
                    </p>
                  </> : 
                  <>
                    <Row xs={12} style={{display: 'block', margin:'25px 0'}}>
                      {this.getPageButtons()}
                    </Row>
                    <Row className="poke-list-row my-2"> 
                      {
                        this.getArrayForPage().map( (name) => {
                          return (
                            <Col xs={12} sm={6} md={6} lg={4} xl={3} key={name}>
                              <PokeCard pokeName={name} pokeTypesIcons={this.state.pokeTypesIcons} key={name}/>
                            </Col>
                          )
                        })
                      }
                    </Row>
                    {this.getPageButtons()}
                  </>
              }
          </Container>
        </Container>
      </Col>
    );
  }
}
