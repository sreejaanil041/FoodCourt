import React from 'react';
import { login } from '../repository';
import { Card, Col, Row } from 'reactstrap';
import {

    Button,
  } from 'reactstrap';
  import { Link } from 'react-router-dom';

export default class Login extends React.Component{

  constructor() {
    super();
    this.state = { name: '', password: '' };
    this.handleInputChange =this.handleInputChange.bind(this);
    this.submitLogin =this.submitLogin.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitLogin(event){
    event.preventDefault();
    login(this.state)
      .then(res => {
          console.log(res);
          localStorage.setItem('user',JSON.stringify(res.data));
          localStorage.setItem('token',res.data.token);
          window.location='/';

    })
      .catch(err => alert(err));
  }

  render() {
     return (
        <Row
        style={{
          height: '80vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
            <div className="">
              <h3>Log in </h3>
            </div>
            <div className="">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange}/>
                </div>
                <Button>Login</Button>
              </form>
              <Link to="/sign-up" >Sign up</Link>
            </div>
          </Col>
          </Row>
    );
  }
}
