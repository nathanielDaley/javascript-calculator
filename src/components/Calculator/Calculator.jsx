import "./Calculator.css";
import symbols from "../../utils/constants";

function Calculator() {
  const buttonPress = (symbol) => {
    console.log(symbol);
  };

  return (
    <div id="calculator" className="calculator">
      <div id="display">
        <div id="answer" className="calculator__answer">
          0
        </div>
        <div id="expression" className="calculator__expression"></div>
      </div>
      {symbols.map((symbol, index) => (
        <button
          key={index}
          id={symbol.name}
          className="calculator__button"
          onClick={() => buttonPress(symbol.value)}
          style={{ gridArea: symbol.name }}
        >
          {symbol.display}
        </button>
      ))}
    </div>
  );
}

export default Calculator;
