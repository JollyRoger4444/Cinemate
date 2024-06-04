import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer} from "./components"
import { Loader } from './Kimbo/Loader';


function App() {
  return (
    <div className="App">
      <Header />
      <Loader />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
