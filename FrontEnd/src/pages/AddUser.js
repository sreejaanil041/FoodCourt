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
           image:''
          

    }
  }

 componentDidMount() { 
       if(this.props.match.params.id!==undefined) 
       {
      axios.get(configpath +'/users/' +this.props.match.params.id)  
          .then(response => {  
              this.setState({   
                  
                name: response.data.data.user.name,
                email: response.data.data.user.email,
                password: response.data.data.user.password,
                phone_number:response.data.data.user.phone_number,
                image:response.data.data.user.image
            });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
     }
  AddUser=()=>{
    
    let data = new FormData();
data.append('name', this.state.name);
data.append('email', this.state.email);
data.append('password', this.state.password);
data.append('phone_number', this.state.phone_number);
data.append('image', this.state.image);

    // let formdata = {category:this.state.category, name:this.state.name, description:this.state.description, image:this.state.image}
     console.log('name: ',data );
 if(this.props.match.params.id!==undefined) 
       {
      axios.put(configpath +'/users/register/'+ this.props.match.params.id, data,{
      headers: {
      'Content-Type': 'application/json',
      //'Authorization': token
      }
  })  

  
.then((response) => {
  console.log(response);
if(response.data.status==='success'){  
this.props.history.push('/users/') 
}
  alert(response.data.message);  

}, (error) => {
  console.log(error);
    }) 
       }
       else{

    axios.post(configpath +'/users/register/', data,{
      headers: {
      'Content-Type': 'application/json',
      //'Authorization': token
      }
  })  

  
.then((response) => {
  console.log(response);
if(response.data.status==='success'){  
this.props.history.push('/users/') 
}
  alert(response.data.message);  

}, (error) => {
  console.log(error);
    }) 
       }  
     }

// ******************************
// let formdata = {name:this.state.name, email:this.state.email, password:this.state.password, phone_number:this.state.phone_number,
//      image:this.state.image}
//      console.log('name: ', data );
//     axios.post(configpath +'/users/register', formdata,{
//     headers: {
//     'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'
//     }
//   })   
  
// .then(json => {  
//   console.log('json: ', json );
// if(json.data.Status==='Success'){  
//   console.log(json.data.Status);  
//   alert("Data Save Successfully");  
// this.props.history.push('/UserList')  
// }  
// else{  
// alert('Data not Saved');  
// debugger;  
// this.props.history.push('/UserList')  
// }  
// })  
// }  

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
                   User Image
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="image"  onChange={this.handleChange} value={this.state.image} />
                    <FormText color="muted">
                      Enter your Image
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