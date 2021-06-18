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
import Table from 'reactstrap/lib/Table';

class Categories extends React.Component
{
  
   constructor(props)
  {
    super(props)
    this.state = {
      category:'',
      name:'',
      description:'',
      image:''
    }
    }

     componentDidMount() { 
       if(this.props.match.params.id!==undefined) 
       {
      axios.get(configpath +'/categories/' +this.props.match.params.id,{
        headers: {
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('token')
          }
      })  
          .then(response => {  
              this.setState({   
                category: response.data.data.categories.category,   
                name: response.data.data.categories.name,  
                description: response.data.data.categories.description,  
                image: response.data.data.categories.image });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
     }
      Categories=()=>{
        let data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];

data.append('image', imagedata);
data.append('category', this.state.category);
data.append('name', this.state.name);
data.append('description', this.state.description);

    // let formdata = {category:this.state.category, name:this.state.name, description:this.state.description, image:this.state.image}
     console.log('name: ',data );
 if(this.props.match.params.id!==undefined) 
       {
      axios.put(configpath +'/categories/'+ this.props.match.params.id, data,{
      headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem('token')
      }
  })  

  
.then((response) => {
  console.log(response);
if(response.data.status==='success'){  
this.props.history.push('/admin/categories') 
}
  alert(response.data.message);  

}, (error) => {
  console.log(error);
    }) 
       }
       else{

    axios.post(configpath +'/categories', data,{
      headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem('token')
      }
  })  

  
.then((response) => {
  console.log(response);
if(response.data.status==='success'){  
this.props.history.push('/admin/categories') 
}
  alert(response.data.message);  

}, (error) => {
  console.log(error);
    }) 
       }  
     }
handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}  

    render()
    {
        return(
         
 <Page      
        className="FoodCategories"
        title="Food Categories"
        breadcrumbs={[{ name: 'FoodCategories', active: true }]}
      >
 
      <Row allign ="center">
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add Food Categories Form</CardHeader>
            <CardBody>
              <Form encType='multipart/form-data'>
                <FormGroup row>
                  <Label for="ParentCategory" sm={12}>
                    Category
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="text"
                      name="category"
                       onChange={this.handleChange} value={this.state.category}
                      placeholder="Enter Food Parent Category"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Category" sm={12}>
                   Sub-Category
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="text"
                      name="name"
                       onChange={this.handleChange} value={this.state.name}
                      placeholder="Enter Food Category"
                    />
                  </Col>
                </FormGroup>
                
                 <FormGroup>
                  <Label for="Description">Description</Label>
                  <Input type="textarea" name="description" onChange={this.handleChange} value={this.state.description} />
                   
                </FormGroup>

                <FormGroup row>
                  <Label for="CategoryImage" sm={12}>
                    Category Image
                  </Label>
                  <Col sm={12}>
                    <Input type="file" name="image" onChange={this.handleChange} value={this.state.image}/>
                     
                    <FormText color="muted">
                      Select a food category image
                    </FormText>
                  </Col>
                </FormGroup>

               

                 <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button onClick={this.Categories} className="btn btn-secondary">Save</Button>
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

export default Categories;
