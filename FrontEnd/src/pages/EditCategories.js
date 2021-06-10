import React from 'react';   
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import axios from 'axios'  
import Page from 'components/Page';
import {configpath} from '../utils/config'

class EditCategories extends React.Component {  
    constructor(props) {  
        super(props)  
     
    this.onChangeCategory = this.onChangeCategory.bind(this);  
    this.onChangeName = this.onChangeName.bind(this);  
    this.onChangeDescription = this.onChangeDescription.bind(this);  
    this.onChangeImage = this.onChangeImage.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);  
  
         this.state = {  
           category:'',
           name:'',
           description:'',
           image:''
  
        }  
    }  
  
  componentDidMount() {  
      axios.get(configpath +'/categories/' +this.props.match.params.id)  
          .then(response => {  
              this.setState({   
                category: response.data.category,   
                name: response.data.name,  
                description: response.data.description,  
                image: response.data.image });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
  
  onChangeName(e) {  
    this.setState({  
        category: e.target.value  
    });  
  }  
  onChangeRollNo(e) {  
    this.setState({  
        name: e.target.value  
    });    
  }  
  onChangeClass(e) {  
    this.setState({  
        description: e.target.value  
    });  
}  
    onChangeAddress(e) {  
        this.setState({  
            image: e.target.value  
        });  
  }  
  
  onSubmit(e) {  
    debugger;  
    e.preventDefault();  
    const obj = {  
         
      category: this.state.category,  
      name: this.state.name,  
      description: this.state.description,  
     image: this.state.image  
  
    };  
    axios.put(configpath+'/categories/'+this.props.match.params.id, obj)  
        .then(res => console.log(res.data));  
        debugger;  
        this.props.history.push('/Categorieslist')  
  }  
    render() {  
        return (  
            <Container className="App">  
  
             <h4 className="PageHeading">Update Student Informations</h4>  
                <Form className="form" onSubmit={this.onSubmit}>  
                    <Col>  
                        <FormGroup row>  
                            <Label for="Category" sm={2}>Category</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Category" value={this.state.category} onChange={this.onChangeCategory}  
                                placeholder="Enter Category" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="Name" sm={2}>Name</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Name" value={this.state.name} onChange={this.onChangeName} placeholder="Enter Name" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Description" sm={2}>Description</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Description" value={this.state.description} onChange={this.onChangeDescription} placeholder="Enter Description" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Image" sm={2}>Image</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Image" value={this.state.Image} onChange={this.onChangeImage} placeholder="Enter Image" />  
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
  
export default EditCategories; 