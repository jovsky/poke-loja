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

    case 'SET_REGION_FILTER':
      return {
        ...state,
        region: action.region
      }

    case 'SET_SEARCH_NAME':
      return {
        ...state,
        searchName: action.searchName
      }

    case 'RESET_REGION_FILTER':
      return {
        ...state,
        region: null
      }

    case 'RESET_TYPE_FILTER':
      return {
        ...state,
        type_1: null,
        type_2: null
      }

    case 'RESET_SEARCH_NAME':
      return {
        ...state,
        searchName: null
      }
      
    default:
      return state
  }
}

