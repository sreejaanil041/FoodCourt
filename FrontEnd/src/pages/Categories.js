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

      Categories=()=>{
     let formdata = {category:this.state.category, name:this.state.name, description:this.state.description, image:this.state.image}
     console.log('name: ',formdata );
    axios.post(configpath +'/categories', formdata,{
    headers: {
    'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'
    }
  })   
  
.then(json => {  
  console.log('json: ', json );
if(json.data.Status==='Success'){  
  console.log(json.data.Status);  
  alert("Data Save Successfully");  
this.props.history.push('/CategoriesList')  
}  
else{  
alert('Data not Saved');  
debugger;  
this.props.history.push('/CategoriesList')  
}  
})  
}  

handleChange= (e)=> {  
this.setState({[e.target.name]:e.target.value});  
}  

    render()
    {
        return(

 <Page
        className="FoodCategories"
        title="FoodCategories"
        breadcrumbs={[{ name: 'FoodCategories', active: true }]}
      >
 
      <Row>
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add Food Categories Form</CardHeader>
            <CardBody>
              <Form enctype='multipart/form-data'>
                <FormGroup row>
                  <Label for="ParentCategory" sm={2}>
                    Parent Category
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="category"
                       onChange={this.handleChange} value={this.state.category}
                      placeholder="Enter Food Parent Category"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Category" sm={2}>
                   Category
                  </Label>
                  <Col sm={10}>
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
                  <Label for="CategoryImage" sm={2}>
                    Category Image
                  </Label>
                  <Col sm={10}>
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
