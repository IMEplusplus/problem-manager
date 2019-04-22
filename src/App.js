import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom'
import Problems from './components/Problems'
import Solutions from './components/Solutions'
import About from './components/About'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import logger from 'redux-logger'

const store =  createStore(
    rootReducer,
  {},
    applyMiddleware(logger, thunk)
)

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
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Menu/>
            <Switch>
              <Route path='/solutions' component={Solutions}/>
              <Route path='/about' component={About}/>
              <Route path='/' component={Problems}/>
            </Switch>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
