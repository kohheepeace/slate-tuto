import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import Navbar from './Navbar';
import s from './App.scss';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: '#EF5350' },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <div className={s.container}>
          {/* content here */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
