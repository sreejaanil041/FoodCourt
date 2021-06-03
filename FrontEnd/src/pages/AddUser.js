import Page from 'components/Page';
import React from 'react';
import axios from 'axios';

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

class AddUser extends React.Component
{
  
  constructor(props)
  {
    super(props)
    this.state = {
           name: '',
           email: '',
           password: '',
           phone_number:'',
           image:'',
          

    }
  }

  AddUser=()=>{
let formdata = {name:this.state.name, email:this.state.email, password:this.state.password, phone_number:this.state.phone_number,
     image:this.state.image}
     console.log('name: ',formdata );
    axios.post('http://localhost:4001/users/register', formdata,{
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
        className="AddUser"
        title="Add New  User"
        breadcrumbs={[{ name: 'AddUser', active: true }]}
      >
 
      <Row>
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add User Form</CardHeader>
            <CardBody>
              <Form enctype='multipart/form-data' >
                <FormGroup row>
                  <Label for="Name" sm={2}>
                    Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="name"
                      onChange={this.handleChange} value={this.state.name}
                      placeholder="Enter your First Name"
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
                  <Label for="Image" sm={2}>
                   User Photo
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="image"  onChange={this.handleChange} value={this.state.image} />
                    <FormText color="muted">
                      Enter your Photo
                    </FormText>
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

export default AddUser;
