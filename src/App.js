import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, useState } from 'react-router-dom'
import CreateStudent from './components/create-student.component'
import EditStudent from './components/edit-student.component'
import StudentList from './components/student-list.component'
import Login from './components/Login'
import Auth from './components/Auth';
import AuthenticatedRoute from './AuthenticatedRoute'

const logOut = () => {
  localStorage.clear();
  window.location.reload();
}


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/create-student'} className="nav-link">
                  React Node Test App
                </Link>
              </Navbar.Brand>
			  

              <Nav className="justify-content-end" >
  			    

        	  	<Nav style={ !localStorage.getItem("user.email") ? {display: "none"}:{} }>
                  <Link to={'/create-student'} className="nav-link">
                    Create Student
                  </Link>
                </Nav>
		        <Nav style={ !localStorage.getItem("user.email") ? {display: "none"}:{} }>
                  <Link to={'/student-list'} className="nav-link">
                    Student List
                  </Link>
                </Nav>

			  
				{!localStorage.getItem("user.email") &&
				<Nav>
                  <Link to={'/login'} className="nav-link">
                    Login
                  </Link>
                </Nav>
				}
				{localStorage.getItem("user.email") &&
				<Nav>
                  <Link to="#" className="nav-link" onClick={()=> logOut() }>
                    Logout
                  </Link>
                </Nav>
				}
              </Nav>
				
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
				<Route
                    exact
                    path="/login"
                    component={(props) => <Login {...props} />}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/"
                    component={(props) => <CreateStudent {...props} />}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/create-student"
                    component={(props) => <CreateStudent {...props} />}
                  />
                  <AuthenticatedRoute
                    exact
                    path="/edit-student/:id"
                    component={(props) => <EditStudent {...props} />}
                  />
                  <AuthenticatedRoute
				    exact
                    path="/student-list"
                    component={(props) => <StudentList {...props} />}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}
export default App