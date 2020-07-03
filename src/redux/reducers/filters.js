export default function filters(state = {}, action) {
  switch(action.type) {

    case 'LOAD_FILTER': 
      return action.filters

    case 'SET_TYPE_1_FILTER':
      return {
        ...state,
        type_1: action.type_1
      }

    case 'SET_TYPE_2_FILTER':
      return {
        ...state,
        type_2: action.type_2
      }
    case 'RESET_REGION_FILTER':
      return {
        ...state,
        region: null
      }

    case 'SET_REGION_FILTER':
      return {
        ...state,
        region: action.region
      }

    case 'RESET_TYPE_FILTER':
      return {
        ...state,
        type_1: null,
        type_2: null
      }
      
    default:
      return state
  }
}

