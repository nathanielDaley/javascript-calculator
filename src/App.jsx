import "./App.css";
import Calculator from "./components/Calculator/Calculator";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <div className="app__container">
          <h1>Calculator</h1>
          <Calculator />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
