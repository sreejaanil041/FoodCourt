import Page from 'components/Page';
import React from 'react';
import axios from 'axios';
import {configpath} from '../utils/config'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

class AdminUser extends React.Component
{
  
  constructor(props)
  {
    super(props)
    this.state = {
           firstname: '',
           lastname:'',
           email: '',
           password: '',
           phone_number:'',
          
    }
  }

  AdminUser=()=>{
let formdata = {firstname:this.state.firstname, lastname:this.state.lastname, email:this.state.email, password:this.state.password, phone_number:this.state.phone_number
     }
     console.log('name: ',formdata );
    axios.post(configpath +'/adminusers/create', formdata,{
    headers: {
    'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'
    }
  })   
  
.then(json => {  
  console.log('json: ', json );
if(json.data.Status==='Success'){  
  console.log(json.data.Status);  
  alert("Data Save Successfully");  
this.props.history.push('/UserList')  
}  
else{  
alert('Data not Saved');  
debugger;  
this.props.history.push('/UserList')  
}  
})  
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}  

 
  render()
  {
    return (
      <Page
        className="AdminUser"
        title="Add Admin  User"
        breadcrumbs={[{ name: 'Admin User', active: true }]}
      >
 
      <Row>
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add User Form</CardHeader>
            <CardBody>
              <Form enctype='multipart/form-data' >
                <FormGroup row>
                  <Label for="fName" sm={2}>
                    First Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="firstname"
                      onChange={this.handleChange} value={this.state.firstname}
                      placeholder="Enter your First Name"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="lName" sm={2}>
                    Last Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="lastname"
                      onChange={this.handleChange} value={this.state.lastname}
                      placeholder="Enter your Last Name"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="email" sm={2}>
                    email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email"
                      onChange={this.handleChange} value={this.state.email}
                      placeholder="Enter your email"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Password" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      onChange={this.handleChange} value={this.state.password}
                      placeholder="Enter your Password"
                    />
                  </Col>
                </FormGroup>

                

                <FormGroup row>
                  <Label for="Phone Number" sm={2}>
                    Phone Number
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="phone_number"
                       onChange={this.handleChange} value={this.state.phone_number}
                      placeholder="Enter your Phone Number"
                    />
                  </Col>
                </FormGroup>


                 <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button onClick={this.AddUser} className="btn btn-secondary">Save</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </Page>
    );
}
}

export default AdminUser;