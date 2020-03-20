import React, {Component} from 'react';
import bridge_logo from './bridge_logo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  state = {
    reqResponse: undefined,
    numberValue: undefined,
    results: []
  };

  handleInputNumberChange = (e) => { this.setState({ numberValue: e.target.value }) }

  handleSubmitButtonClick = () => {
    this.submitNumber()
    .then(res => this.setState(prevState => ({ results: [...prevState.results, res.express] })))
    .catch(err => console.log(err));
  }

  getButtonSubmit = () => {
    let isValidInt = /^\d+$/.test(this.state.numberValue)
    if (isValidInt) {
      return <Button variant="contained" color="secondary" onClick={ this.handleSubmitButtonClick }>Calcular</Button>
    } else {
      return <Button variant="contained" disabled>Calcular</Button>
    }
  }
  
  submitNumber = async () => {
    const response = await fetch('/api/divisors?number='+this.state.numberValue)
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  renderResponse = () => {
    return (
      <div className="results">
        {
          this.state.results.map((prevResult, index) => {
            return (
              <div key={index} className="renderedResult">
                <hr></hr>
                <p className="respInfos">{prevResult.reqNumber + (prevResult.isPrime ? " é" : " não é") + " um número primo. Seus divisores são:"}</p>
                <p className="respInfos">{prevResult.divisors.join(", ")}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={bridge_logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Desafio Dev. Full Stack</h1>
        </header>
        <div className="App-body">
          <p className="App-intro">Calcule já os divisores de um número:</p>
          <TextField id="standard-basic" label="Insira um número inteiro" onChange={ this.handleInputNumberChange } />
          <p className="newLine"/>
          { this.getButtonSubmit() }
          { this.renderResponse() }
        </div>
      </div>
    )
  }
}

export default App;