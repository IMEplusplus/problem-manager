import React, { Component } from 'react';
import './App.css';
import LeftMenu from './components/Menu'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom'
import Problems from './components/Problems'
import Solutions from './components/Solutions'
import About from './components/About'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#424242",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#f1601d",
      contrastText: "#ffffff"
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <LeftMenu/>
          <Switch>
            <Route path='/solutions' component={Solutions}/>
            <Route path='/about' component={About}/>
            <Route path='/' component={Problems}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
