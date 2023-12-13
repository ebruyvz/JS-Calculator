import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "0",
      currentNum: "",
      display: ""
    };
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.reset = this.reset.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.handlePercentage = this.handlePercentage.bind(this);
  }
  handleNumberClick(e) {
    let text = e.target.innerText;
    if (text === "." && this.state.currentNum.includes(".")) {
      return;
    }
    if (this.state.currentNum === "0" && text === "0") {
      return;
    }
    if (this.state.currentNum === "") {
      this.setState((prevState) => ({
        currentNum: text,
        display: prevState.display + text
      }));
    } else if (this.state.currentNum === ".") {
      this.setState((prevState) => ({
        currentNum: prevState.display + text,
        display: prevState.display + text
      }));
    } else {
      this.setState((prevState) => ({
        currentNum: prevState.currentNum + text,
        display: prevState.display + text
      }));
    }
  }
  handleOperation(e) {
    let text = e.target.innerText === "x" ? "*" : e.target.innerText;
    if (this.state.currentNum !== ".") {
      this.setState((prevState) => ({
        currentNum: text,
        display: prevState.display + text
      }));
    }
    if (text === "-" && this.state.currentNum === "-") {
      let newDisplay = this.state.display.slice(0, -1) + "+";
      this.setState({
        currentNum: text,
        display: newDisplay
      });
    }
    if ((text === "+" || text === "*" || text === "/") && (this.state.currentNum === "+" || this.state.currentNum === "*" || this.state.currentNum === "/")) {
      let newDisplay = this.state.display.slice(0, -1) + text;
      this.setState((prevState) => ({
        currentNum: text,
        display: newDisplay
      }));
    }
    if (this.state.display.length > 1) {
      let possible = this.state.display.slice(-2);
      if (possible === "*-" || possible === "/-") {
        let answer = this.state.display.slice(0, -2);
        this.setState({
          currentNum: text,
          display: answer + text
        });
      } else if (text === "." && this.state.display.slice(-2)[0] === ".") {
        let last = this.state.display;
        this.setState((prevState) => ({
          currentNum: last,
          display: last
        }));
      }
    }
  }
  reset() {
    this.setState({
      result: "0",
      currentNum: "",
      display: ""
    });
  }
  calculateResult() {
    let input = this.state.display.replace(/×/g, "*").replace(/÷/g, "/");
    const lastChar = input[input.length - 1];
    if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
      input = input.slice(0, -1);
    }
    let result = eval(input);
    this.setState({
      result,
      currentNum: result.toString(),
      display: result.toString()
    });
  }
  changeSign() {
    if (this.state.currentNum === "") {
      return;
    } else if (this.state.currentNum.charAt(0) === "-") {
      this.setState((prevState) => ({
        currentNum: prevState.currentNum.slice(1),
        display: prevState.display.slice(1)
      }));
    } else {
      this.setState((prevState) => ({
        currentNum: "-" + prevState.currentNum,
        display: "-" + prevState.display
      }));
    }
  }
  handlePercentage() {
    if (this.state.currentNum !== "") {
      let result = (this.state.currentNum) / 100;
      this.setState((prevState) => ({
        result: result,
        currentNum: result,
        display: result
      }));
    }
  }
  render() {
    return (
      <div id="calculator">
        <h1>CALCULATOR</h1>
        <div id="display">{this.state.display !== "" ? this.state.display : this.state.result}</div>
        <div>
          <button id="clear" onClick={() => this.reset()}>AC</button>
          <button id="plus_minus" onClick={this.changeSign}>+/-</button>
          <button id="percent" onClick={this.handlePercentage}>%</button>
          <button id="divide" onClick={this.handleOperation}>/</button>
        </div>
        <div>
          <button id="seven" onClick={this.handleNumberClick}>7</button>
          <button id="eight" onClick={this.handleNumberClick}>8</button>
          <button id="nine" onClick={this.handleNumberClick}>9</button>
          <button id="multiply" onClick={this.handleOperation}>*</button>
        </div>
        <div>
          <button id="four" onClick={this.handleNumberClick}>4</button>
          <button id="five" onClick={this.handleNumberClick}>5</button>
          <button id="six" onClick={this.handleNumberClick}>6</button>
          <button id="subtract" onClick={this.handleOperation}>-</button>
        </div>
        <div>
          <button id="one" onClick={this.handleNumberClick}>1</button>
          <button id="two" onClick={this.handleNumberClick}>2</button>
          <button id="three" onClick={this.handleNumberClick}>3</button>
          <button id="add" onClick={this.handleOperation}>+</button>
        </div>
        <div>
          <button id="zero" onClick={this.handleNumberClick}>0</button>
          <button id="zero" onClick={this.handleNumberClick}>0</button>
          <button id="decimal" onClick={this.handleNumberClick}>.</button>
          <button id="equals" onClick={this.calculateResult}>=</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
