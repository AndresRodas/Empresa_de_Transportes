import './App.css';
//prime imports
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";     
import "primeflex/primeflex.css";
//pages
import Home from './pages/Home';
//context
import CarProvider from './context/CarProvider';
 
function App() {
  return (
    <div className="App">
      <CarProvider>
        <Home/>
      </CarProvider>
    </div>
  );
}

export default App;
