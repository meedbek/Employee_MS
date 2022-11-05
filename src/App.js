import Projects from './components/projects.js';
import Clients from './components/Clients.js';
import Client from './components/Client.js';
import Project from './components/project.js';
import './App.css';
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import  {changeDateFormat}  from './functions/functions.js';

import { Navbar,Nav,NavDropdown,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  
  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">4D</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/projects">Projects</Nav.Link>
              <Nav.Link href="/clients">Clients</Nav.Link>
              {/*NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Switch>
          <Route path="/projects">
            <Projects/>
          </Route>
          <Route path="/clients">
            <Clients/>
          </Route>
          {/*<Route path="/client/:key">
            <Client/>
          </Route>
          <Route path="/project/:key">
            <Project/>
            </Route>*/}
        </Switch>
      </div>
      
    </Router>
    
  );
}

export default App;
