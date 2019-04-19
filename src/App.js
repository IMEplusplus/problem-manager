import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GenericTable from './components/GenericTable';
import LeftMenu from './components/LeftMenu'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
          <LeftMenu>
            <GenericTable />
          </LeftMenu>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
