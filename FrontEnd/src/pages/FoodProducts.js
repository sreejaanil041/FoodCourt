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

class FoodProducts extends React.Component
{

   constructor(props)
  {
    super(props)
    this.state = {
           productname: '',
           categoryselect: '',
           qty: '',
           price:'',
           desc:'',
           image:'',
           status:''
    }
  }

  FoodProducts =()=>{
     let formdata = {name:this.state.name, email:this.state.email, password:this.state.password, phone_number:this.state.phone_number,
     image:this.state.image}
     console.log('name: ',formdata );
    axios.post( configpath + 'foodProducts/register', formdata,{
    headers: {
    'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'
    }
  })   
  
.then(json => {  
  console.log('json: ', json );
if(json.data.Status==='Success'){  
  console.log(json.data.Status);  
  alert("Data Save Successfully");  
this.props.history.push('/FoodList')  
}  
else{  
alert('Data not Saved');  
debugger;  
this.props.history.push('/FoodList')  
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
        className="FoodProducts"
        title="FoodProducts"
        breadcrumbs={[{ name: 'FoodProducts', active: true }]}
      >
 
      <Row>
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add Food Products Form</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="ProductName" sm={2}>
                    Product Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="productname"
                      onChange={this.handleChange} value={this.state.productname}
                      placeholder="Enter a Food Item"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="categorySelect" sm={2}>
                    Select Category
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="categorySelect" onChange={this.handleChange} value={this.state.categorySelect} />
                  </Col>
                </FormGroup>


                <FormGroup row>
                  <Label for="Quantity" sm={2}>
                    Quantity
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="qty"
                      placeholder="Enter the quantity"
                      onChange={this.handleChange} value={this.state.qty}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Price" sm={2}>
                    Price
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="price"
                      placeholder="Enter the Food Price"
                      onChange={this.handleChange} value={this.state.price}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Description" sm={2}>
                    Description
                  </Label>
                  <Col sm={10}>
                    <Input type="textarea" name="desc" onChange={this.handleChange} value={this.state.desc} />
                  </Col>
                </FormGroup>

                 <FormGroup row>
                  <Label for="ProductImage" sm={2}>
                    Product Image
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="image" onChange={this.handleChange} value={this.state.image} />
                    <FormText color="muted">
                      Select a food image
                    </FormText>
                  </Col>
                </FormGroup>

                <FormGroup tag="status" row>
                  <Label for="Availability" sm={2}>
                   Availability Status
                  </Label>
                  <Col sm={10}> 
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="status" onChange={this.handleChange} value={this.state.status}/> Yes
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="status" onChange={this.handleChange} value={this.state.status} /> No
                      </Label>
                    </FormGroup>
                    
                  </Col>
                </FormGroup>

                 <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button onClick={this.FoodProducts}  className="btn btn-secondary">Save</Button>
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

export default FoodProducts;
