import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

function Navbar() {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Slate-Tuto
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
