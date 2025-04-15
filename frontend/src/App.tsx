
import { BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';



const App=()=>{
  return(
    <Router>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
      <AppRoutes/>
      </main>
      
    </Router>
  )
}

export default App;

