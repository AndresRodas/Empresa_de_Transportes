import { useReducer, createContext } from 'react'
import carReducer, { initialCars } from './CarReducer'

const CarContext = createContext()

const CarProvider = ({ children }) => {
  const [car, dispatch] = useReducer(carReducer, initialCars)
  return (
    <CarContext.Provider value={[car, dispatch]}>
      {children}
    </CarContext.Provider>
  )
}

export { CarContext }
export default CarProvider
