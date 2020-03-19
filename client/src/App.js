import React, {Component} from 'react';
import bridge_logo from './bridge_logo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  state = {
    divisors: '',
    numberValue: undefined
  };

  handleInputNumberChange = (e) => { this.setState({ numberValue: e.target.value }) }

  handleSubmitButtonClick = () => {
    this.submitNumber()
    .then(res => this.setState({ divisors: res.express }))
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
    const response = await fetch('/api/divisors')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
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
          <p className="App-intro">{this.state.divisors}</p>
        </div>
      </div>
    )
  }
}

export default App;