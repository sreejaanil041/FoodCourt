import React from 'react';
import { register } from '../repository';
import { Card, Col, Row } from 'reactstrap';
import {

    Button,
  } from 'reactstrap';
  import { Link } from 'react-router-dom';

export default class SignUp extends React.Component{

  constructor() {
    super();
    this.state = { name: '', password: '', email:'', phone_number:'' };
    this.handleInputChange =this.handleInputChange.bind(this);
    this.submitRegister =this.submitRegister.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitRegister(event){
    event.preventDefault();
    register(this.state)
      .then(res =>{
          alert('User registered successfully. Please login.')
          window.location='/login';

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
              <h3>Sign Up </h3>
            </div>
            <div className="">
              <form onSubmit={this.submitRegister}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Phone number:</label>
                  <input type="text" className="form-control" name="phone_number" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange}/>
                </div>
                <Button>Register</Button>
              </form>
              <Link to="/login" >Login</Link>
            </div>
          </Col>
          </Row>
    );
  }
}
