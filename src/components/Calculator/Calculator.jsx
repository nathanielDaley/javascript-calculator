import "./Calculator.css";
import symbols from "../../utils/constants";
import { useState } from "react";

function Calculator() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const expressionTrimmed = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;

      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percentage") {
      if (answer === "") return;

      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(expressionTrimmed + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();

      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if the last symbol in the expression is an operator do nothing
    if (isOperator(expressionTrimmed.charAt(expressionTrimmed.length - 1)))
      return;

    const symbols = expressionTrimmed.split(" ");
    const newSymbols = [];

    for (let i = symbols.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(symbols[i]) && isOperator(symbols[i - 1])) {
        newSymbols.unshift(symbols[i]);
        let j = 0;
        let k = i - 1;

        while (isOperator(symbols[k])) {
          k--;
          j++;
        }

        i -= j;
      } else {
        newSymbols.unshift(symbols[i]);
      }
    }

    const newExpression = newSymbols.join(" ");

    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }

    setExpression("");
  };

  return (
    <div id="calculator" className="calculator">
      <div id="display" className="calculator__display">
        <div id="answer" className="calculator__answer">
          {answer}
        </div>
        <div id="expression" className="calculator__expression">
          {expression}
        </div>
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
