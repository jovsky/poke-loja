import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTypesIcon, getFilteredPokeList } from '../../back-end/getAPI';
import PokeCard from './../pokeCard/pokeCard';
import { Col, Row, Container, Button } from 'react-bootstrap';
import './style.css'
import store from '../../redux/store/store'

export default function PokeList2(props) {

  const [pokeNameList, setNameList] = useState([]);
  const [pokeTypesIcons] = useState(getTypesIcon());
  // const [filters, setFilters] = useState({})
  const [curPage, setCurPage] = useState(1);
  const [limit] = useState(24);
  const [c, setC] = useState(0);

  const updateNameList = (filters) => {
    setTimeout( async () => {
      console.log('rcv', filters)
      const hasFilters = !Object.values(filters).every( v => v === null )
      setCurPage( hasFilters ? curPage : 1 )
      setNameList(await getFilteredPokeList( hasFilters ? { filters } : undefined ))
      
    }, 500);
  }

  const filters = useSelector( (state) => {
    console.log("sending filters", state.filters)
    //updateNameList(state.filters);
    //console.log(store.getState())
    return state
  })

  

  // storeFilters.subscribe( () => {
  //   setFilters( {...storeFilters.getState()} );
  //   updateNameList()
  // } );

  // useEffect(() => {
  //   console.log('atualiza', filters, curPage)

  //   setTimeout( async () => {
  //     const hasFilters = !Object.values(filters).every( v => v === null )
  //     setCurPage( hasFilters ? curPage : 1 )
  //     setNameList(await getFilteredPokeList( hasFilters ? { filters } : undefined ))
      
  //   }, 2000);
    
  // }, [pokeNameList, filters, curPage]);
  
  

  const getPageButtons = () => {
    const n = Math.ceil(pokeNameList.length/limit)
    const pageNums = []
    for(let i=1; i<=n; i++) 
      pageNums.push(i);
    return (
      <div className="page-btn-div">
        {pageNums.map( num => {
          return <Button 
                    key={num} 
                    id="page-btn"
                    onClick={() => {setCurPage(num)}}
                    active={num === curPage}
                    >{num}</Button>
        })}
      </div>
    )
  }

  return (
    <Col xs={7} sm={8} md={7} lg={7} className="poke-list-div">
      <h1>Lista</h1>
      <Container fluid className="poke-list-container">

          { 
            (pokeNameList === []) ? 
              <img src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif" alt="loading"/>
              : 
              <>
                {getPageButtons()}
                <Row className="poke-list-row"> 
                  {
                    pokeNameList.slice(limit*(curPage-1), limit*curPage).map( (name) => {
                      return (
                        <Col xs={12} sm={6} md={6} lg={4} xl={3} key={name}>
                          <PokeCard pokeName={name} pokeTypesIcons={pokeTypesIcons} key={name}/>
                        </Col>
                      )
                    })
                  }
                </Row>
                {getPageButtons()}
              </>
          }
      </Container>

    </Col>
  );

}
