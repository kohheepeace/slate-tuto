import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import { Editor } from 'slate-react';
import { Value } from 'slate';
import initialData from '../slate-editor/initialData.json';

import Navbar from './Navbar';
import s from './App.scss';


const initialValue = Value.fromJSON(initialData);

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
      value: initialValue,
    };
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <div className={s.container}>
          <div className={s.editor}>
            <Editor value={this.state.value} onChange={this.onChange} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
