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

  handleSelect_T1 = (event) => {
    store.dispatch({
      type: "SET_TYPE_1_FILTER",
      type_1: event === "-" ? null : event
    })
  }

  handleSelect_T2 = (event) => {
    store.dispatch({
      type: "SET_TYPE_2_FILTER",
      type_2: event === "-" ? null : event
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
  resetSelectsRegions = () => {
    store.dispatch({
      type: "RESET_REGION_FILTER",
    })
  }


  render() {
    return (
      <Col xs={12} md={2} className="filter-menu-div">
        <div className="filter-menu-div-filter">
          <h3>Filtrar pesquisa</h3>
        </div>
        <Container fluid id="type-filter-div" >
          <Row className="px-0">
          {/**  TYPE FILTER */}
          <Col xs={4} md={12} id="filter-div" >
            <Row className="mx-0">
            <Col xs={12} style={{fontSize: '16px'}}>
              <p>Filtrar por tipo</p>
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
                              onSelect={this.handleSelect_T1}
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
                            onSelect={this.handleSelect_T2}
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
          <Col xs={4} md={12} id="filter-div" >
            <Row id="row-types-div" className="mx-0" >
            <Col xs={12} style={{fontSize: '16px'}}>
              <p>Filtrar por região</p>
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
            <Col xs={12} lg={1} className="px-0 ml-1" id="div-reset-types">
              <Button onClick={this.resetSelectsT1T2} id="reset-button">×</Button>
            </Col>
            </Row>
          </Col>
        
          </Row>
        </Container>
      </Col>
    )
  }

}