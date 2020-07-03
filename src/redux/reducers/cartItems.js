export default function cartItems(prevState = [], action) {
  
  switch(action.type) {

    case 'LOAD_ITEMS': {
      return [...action.items];
    }

    case 'ADD_ITEM': {
      const newItem = {
        ...action.newItem,
        code: (new Date()).getTime()
      }
      const newState = [ ...prevState, newItem];
      return newState;
    }

    case 'DELETE_ITEM': {
      const newState = prevState.filter( item => item.code !== action.code);
      return newState;
    }
    default:
      return prevState;
  }
}
