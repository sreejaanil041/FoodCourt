import React from 'react';   
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import axios from 'axios'  
import Page from 'components/Page';
import {configpath} from '../utils/config'

class EditUser extends React.Component {  
    constructor(props) {  
        super(props)  
     
    this.onChangeName = this.onChangeName.bind(this);  
    this.onChangeEmail = this.onChangeEmail.bind(this);  
    this.onChangePhone = this.onChangePhone.bind(this);  
    this.onChangeImage = this.onChangeImage.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);  
  
         this.state = {  
            name: '',
           email: '',
           phone_number:'',
           image:''
  
        }  
    }  
  
  componentDidMount() {  
      axios.get(configpath + this.props.match.params.id)  
          .then(response => {  
              this.setState({   
                name: response.data.name,   
                email: response.data.email,  
                phone_number: response.data.phone_number,  
                image: response.data.image });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
  
  onChangeName(e) {  
    this.setState({  
        name: e.target.value  
    });  
  }  
  onChangeEmail(e) {  
    this.setState({  
        email: e.target.value  
    });    
  }  
  onChangePhone(e) {  
    this.setState({  
        phone_number: e.target.value  
    });  
}  
    onChangeImage(e) {  
        this.setState({  
            image: e.target.value  
        });  
  }  
  
  onSubmit(e) {  
    debugger;  
    e.preventDefault();  
    const obj = {  
        id:this.props.match.params.id,  
      name: this.state.name,  
      email: this.state.email,  
      phone_number: this.state.phone_number,  
      image: this.state.image
  
    };  
    axios.post(configpath, obj)  
        .then(res => console.log(res.data));  
        debugger;  
        this.props.history.push('/UserList')  
  }  
    render() {  
        return (  
            <Container className="App">  
  
             <h4 className="PageHeading">Update Student Informations</h4>  
                <Form className="form" onSubmit={this.onSubmit}>  
                    <Col>  
                        <FormGroup row>  
                            <Label for="name" sm={2}>Name</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Name" value={this.state.name} onChange={this.onChangeName}  
                                placeholder="Enter Name" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="email" sm={2}>email</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Enter Email" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="phone" sm={2}>Phone</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="phone_number" value={this.state.phone_number} onChange={this.onChangePhone} placeholder="Enter Phone Number" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Image" sm={2}>Image</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="image"value={this.state.image} onChange={this.onChangeImage} placeholder="Enter Image" />  
                            </Col>  
                        </FormGroup>   
                    </Col>  
                    <Col>  
                        <FormGroup row>  
                            <Col sm={5}>  
                            </Col>  
                            <Col sm={1}>  
                          <Button type="submit" color="success">Submit</Button>{' '}  
                            </Col>  
                            <Col sm={1}>  
                                <Button color="danger">Cancel</Button>{' '}  
                            </Col>  
                            <Col sm={5}>  
                            </Col>  
                        </FormGroup>  
                    </Col>  
                </Form>  
            </Container>  
        );  
    }  
  
}  
  
export default EditUser; 