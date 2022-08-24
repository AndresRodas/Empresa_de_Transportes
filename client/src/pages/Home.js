import { useContext } from "react"
import Navbar from "../components/Navbar"
import Results from "../components/Results"
import { CarContext } from "../context/CarProvider"
import Pilots from "../components/Pilots"

export default function Home(){

    const [car, dispatch] = useContext(CarContext)
    const { content } = car

    return (
        <div>
            <Navbar/>
            { content === 'vehiculos' ? <Results/> : <Pilots/> }
        </div>
      )
    

}