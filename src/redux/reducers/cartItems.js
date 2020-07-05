export default function cartItems(prevState = [], action) {
  
  switch(action.type) {

    case 'ADD_ITEM': {
      const newItem = {
        ...action.newItem,
        code: (new Date()).getTime()
      }
      const newState = [ ...prevState, newItem];
      localStorage.setItem('cartItems', JSON.stringify(newState) )
      console.log('stringify', JSON.stringify(newState))
      console.log('getitem', localStorage.getItem('cartItems'))
      return newState;
    }

    case 'DELETE_ITEM': {
      const newState = prevState.filter( item => item.code !== action.code);
      localStorage.setItem('cartItems', JSON.stringify(newState) )
      console.log('stringify', JSON.stringify(newState))
      console.log('getitem', JSON.parse(localStorage.getItem('cartItems')))
      return newState;
    }
    case 'CLEAR_LIST': {
      localStorage.setItem('cartItems', JSON.stringify([]) )
      console.log('stringify', JSON.stringify([]))
      console.log('getitem', JSON.parse(localStorage.getItem('cartItems')))
      return [];
    }
    default:
      return prevState;
  }
}
