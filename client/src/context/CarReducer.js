import { types } from "../helpers/Types"

const initialCars = {
  cars: [],
  content: 'vehiculos'
}

const carReducer = (state, action) => {
  switch (action.type) {
    case types.setCar:
      return {
        ...state,
        cars: action.newCars
      }
    case types.setContent:
      return {
        ...state,
        content: action.setContent 
      }
    default:
      return state
  }
}

export { initialCars }
export default carReducer
