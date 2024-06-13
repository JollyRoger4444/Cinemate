import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer} from "./components"
import { Loader } from './Kimbo/Loader';
import { Error } from "./Kimbo/Error";


function App() {
  return (
    <div className="App">
      <Header />
      <Loader />
      <AllRoutes />
      <Footer />
      <Error />
    </div>
  );
}

export default App;
