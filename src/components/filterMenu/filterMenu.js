import React, { Component } from 'react';
import { getTypesList } from '../../back-end/getAPI';
import { Col, Row, Dropdown, Button, Container } from 'react-bootstrap';
import './style.css'
import store from '../../redux/store/store'

const REGIONS = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola']

export default class FilterMenu extends Component{

  constructor(props) {
    super(props)
    this.state = {
      typesNames: ["-"].concat(getTypesList()),
      regionNames: ["-"].concat(REGIONS),
      type_1: null,
      type_2: null,
      region: null,
    }
  }

  componentDidMount () {
    store.subscribe( () => {
      const {type_1, type_2, region} = store.getState().filters
      this.setState({
        type_1,
        type_2,
        region
      });
    });

    store.dispatch({
      type: "LOAD_FILTER",
      filters: {
        type_1: this.state.type_1,
        type_2: this.state.type_2,
        region: this.state.region
      }
    })
  }

  // handleSelect_T1 = (selected) => {
  //   store.dispatch({
  //     type: "SET_TYPE_1_FILTER",
  //     type_1: selected === "-" ? null : selected
  //   })
  // }

  handleSelect_Type = (selected, which) => {
    if (which === 1)
      store.dispatch({
        type: "SET_TYPE_1_FILTER",
        type_1: selected === "-" ? null : selected
      })
    else if (which === 2)
      store.dispatch({
        type: "SET_TYPE_2_FILTER",
        type_2: selected === "-" ? null : selected
      })
  }
  resetSelectsT1T2 = () => {
    store.dispatch({
      type: "RESET_TYPE_FILTER",
    })
  }

  handleSelect_Region = (event) => {
    store.dispatch({
      type: "SET_REGION_FILTER",
      region: event === "-" ? null : event
    })
  }
  resetSelectRegion = () => {
    store.dispatch({
      type: "RESET_REGION_FILTER",
    })
  }


  render() {

    return (
      <Col xs={12} md={2} className="filter-menu-div">
        <Container fluid >
        <Row id="filter-title-row" className="py-3">
          <Col xs={12}>
            <h1 id="filter-title-text">Filtros de Busca</h1>
          </Col>
        </Row>
          <Row className="px-0">
          {/**  TYPE FILTER */}
          <Col xs={4} md={12} className="filter-div" >
            <Row className="mx-0">
            <Col xs={12} style={{fontSize: '16px'}}>
              <p>Por Tipos</p>
            </Col>
            <Col xs={12} lg={5} className="px-0 mx-0">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.type_1 || "Nenhum"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.typesNames.map( (name) => {
                    return <Dropdown.Item 
                              eventKey={name} 
                              key={name+"_T1"}
                              onSelect={(selected) => {this.handleSelect_Type(selected, 1)}}
                              >{name}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={12} lg={5} className="px-0 mx-0">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.type_2 || "Nenhum"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {this.state.typesNames.map( (name) => {
                    return <Dropdown.Item 
                            eventKey={name} 
                            key={name+"_T2"}
                            onSelect={ (selected) => {this.handleSelect_Type(selected, 2)}}
                            >{name}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={12} lg={1} className="px-0 ml-1" id="div-reset-types">
              <Button onClick={this.resetSelectsT1T2} id="reset-button">×</Button>
            </Col>
          </Row>
          </Col>

          {/**  REGION FILTER */}
          <Col xs={4} md={12} className="filter-div" >
            <Row className="mx-0" >
            <Col xs={12} style={{fontSize: '16px'}}>
              <p>Por Região</p>
            </Col>
            <Col xs={12} lg={10} className="px-0 mx-0">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.region || "Nenhum"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.regionNames.map( (name) => {
                    return <Dropdown.Item 
                              eventKey={name} 
                              key={name}
                              onSelect={this.handleSelect_Region}
                              >{name}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={12} lg={1} className="px-0 ml-1">
              <Button onClick={this.resetSelectRegion} id="reset-button">×</Button>
            </Col>
            </Row>
          </Col>
        
          </Row>
        </Container>
      </Col>
    )
  }

}