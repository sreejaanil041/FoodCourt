import React from 'react';   
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import axios from 'axios'  
import Page from 'components/Page';
import {configpath} from '../utils/config'

class EditFoodProducts extends React.Component {  
    constructor(props) {  
        super(props)  
     
    this.onChangeProductName = this.onChangeProductName.bind(this);  
    this.onChangeCategorySelect = this.onChangeCategorySelect.bind(this);  
    this.onChangeQty = this.onChangeQty.bind(this);  
    this.onChangePrice = this.onChangePrice.bind(this);  
    this.onChangeDesc = this.onChangeDesc.bind(this); 
    this.onChangeImage = this.onChangeImage.bind(this); 
    this.onChangeStatus = this.onChangeStatus.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);  
  
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
  
  componentDidMount() {  
      axios.get(configpath + this.props.match.params.id)  
          .then(response => {  
              this.setState({   
                productname: response.data.productname,   
                categoryselect: response.data.categoryselect,  
                qty: response.data.qty,  
                price: response.data.price,
                desc: response.data.desc,
                image: response.data.image,
                status:response.data.status
                
                 });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
  
  onChangeProductName(e) {  
    this.setState({  
        productname: e.target.value  
    });  
  }  
  onChangeCategorySelect(e) {  
    this.setState({  
        categorySelect: e.target.value  
    });    
  }  
  onChangeQty(e) {  
    this.setState({  
        qty: e.target.value  
    });  
}  
    onChangePrice(e) {  
        this.setState({  
            price: e.target.value  
        });  
  }  
  
  onChangeDesc(e) {  
        this.setState({  
            desc: e.target.value  
        });  
  }  

  onChangeImage(e) {  
        this.setState({  
            image: e.target.value  
        });  
  }  

  onChangeStatus(e) {  
        this.setState({  
            status: e.target.value  
        });  
  }  
  onSubmit(e) {  
    debugger;  
    e.preventDefault();  
    const obj = {  
        id:this.props.match.params.id, 
        productname: this.state.productname,   
        categoryselect: this.state.categoryselect,  
        qty: this.state.qty,  
        price: this.state.price,
        desc: this.state.desc,
        image: this.state.image,
        status:this.state.status 
      
    };  
    axios.post(configpath, obj)  
        .then(res => console.log(res.data));  
        debugger;  
        this.props.history.push('/FoodList')  
  }  
    render() {  
        return (  
            <Container className="App">  
  
             <h4 className="PageHeading">Update Student Informations</h4>  
                <Form className="form" onSubmit={this.onSubmit}>  
                    <Col>  
                        <FormGroup row>  
                            <Label for="ProductName" sm={2}>Product Name</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="ProductName" value={this.state.productname} onChange={this.onChangeProductName}  
                                placeholder="Enter Product Name" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="Categories" sm={2}>Category</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="categoriesselect" value={this.state.categoriesselect} onChange={this.onChangeCategorySelect} placeholder="Enter Categories" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Quantity" sm={2}>Quantity</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="qty" value={this.state.qty} onChange={this.onChangeQty} placeholder="Enter Quantity" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Price" sm={2}>Price</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Price" value={this.state.Price} onChange={this.onChangePrice} placeholder="Enter Price" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="Description" sm={2}>Description</Label>  
                            <Col sm={10}>  
                                <Input type="textarea" name="Description" value={this.state.desc} onChange={this.onChangeDesc} placeholder="Enter Description" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="Image" sm={2}>Price</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="image" value={this.state.image} onChange={this.onChangeImage} placeholder="Enter Image" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="Status" sm={2}>Availability Status</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="status" value={this.state.status} onChange={this.onChangeStatus} placeholder="Enter Status" />  
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
  
export default EditFoodProducts; 