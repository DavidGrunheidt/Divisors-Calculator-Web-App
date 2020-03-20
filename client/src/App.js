import React, {Component} from 'react';
import bridge_logo from './bridge_logo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';

class App extends Component {
  state = {
    numberValue: undefined,
    results: [],
    waitingResp: false
  };

  handleInputNumberChange = (e) => { this.setState({ numberValue: e.target.value }) }

  handleSubmitButtonClick = () => {
    this.setState({ waitingResp: true })

    this.submitNumber()
    .then(res => this.setState(prevState => ({ 
      results: [...prevState.results, res.express],
      waitingResp: false
     })))
    .catch(err => console.log(err));
  }
  
  submitNumber = async () => {
    const endpoint = "https://divisors-calculator-api.herokuapp.com/api/divisors?number="
    const response = await fetch(endpoint+this.state.numberValue)
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  isValidInt(number) {
    return /^\d+$/.test(number)
  }

  renderTextField = () => {
    let maybeParsed = parseInt(this.state.numberValue)
    if (maybeParsed < 0 || maybeParsed >= 1e8) {
      return <TextField error id="standard-error-helper-text" label="Erro" helperText="Número deve ser > 0 e < 10^8." onChange={ this.handleInputNumberChange }/>
    } else {
      return <TextField id="standard-basic" label="Insira um número inteiro" onChange={ this.handleInputNumberChange } />
    }
  }

  renderButtonSubmit = () => {
    if (this.state.waitingResp) {
      return <CircularProgress />
    } else {
      let numberParsed = parseInt(this.state.numberValue)
      let alreadyCalculated = this.state.results.some(result => result.reqNumber === numberParsed)
    
      if (this.isValidInt(this.state.numberValue) && numberParsed < 1e8 && !alreadyCalculated) {
        return <Button variant="contained" color="secondary" onClick={ this.handleSubmitButtonClick }>Calcular</Button>
      } else {
        return <Button variant="contained" disabled>{alreadyCalculated ? "Já calculado" : "Calcular"}</Button>
      }
    }
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
          { this.renderTextField() }
          <p className="newLine"/>
          { this.renderButtonSubmit() }
          { this.renderResponse() }
        </div>
      </div>
    )
  }
}

export default App;