import profile from './img/LinkedIn_Profile_Pic.jpg';
import './App.css';
import { Accordion, AppBar, Button, IconButton, Toolbar } from '@mui/material';
import Home from '@mui/icons-material/Home';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Toolbar variant="regular">
          <IconButton edge="start" color="inherit" aria-label="Home" sx={{ mr: 2 }}>
            <Home />
          </IconButton>
          <Button>Resume</Button>
          <Button>Projects</Button>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <img src={profile} />
        <span>Please excuse the appearance of this site</span>
        <span>while construction is in progress...</span>
        
      </header>
    </div>
  );
}

export default App;
