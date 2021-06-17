import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {configpath} from '../utils/config'

class FoodList extends React.Component
{

  constructor(props) {  
      super(props);  
      this.state = {data: []};  

      this.DeleteProduct = this.DeleteProduct.bind(this);
    } 

    componentDidMount(){  
     
      axios.get( configpath + '/products')  
        .then(response => { 
          console.log("helloooooooooooooo"+ response.data.data.products) ;
          this.setState({ data: response.data.data.products });    
        })  
        .catch(function (error) {  
          console.log(error);  
        })  
    }  
      
   DeleteProduct= (foodProductsId) =>{  
     axios.delete( configpath + '/products/'+ foodProductsId)  
    .then(response => {  
    if(response.data.status==='success'){ 
      this.setState({ data: this.state.data.filter(item => item.id !== foodProductsId)});
    } 
    alert('Record deleted successfully!!');  
    
    })  
    }   

   
render(){

 return (
    <Page
      title="Food List"
      breadcrumbs={[{ name: 'foodList', active: true }]}
      className="FoodList"
    >
      
        <Row >

                <Col>
                <Card className="mb-3" >
                    <CardHeader>List of Food Products</CardHeader>
                    <CardBody>
                    <Card align ="right"> 
                    <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Link className="btn btn-secondary" to='/admin/add-food-product' >Add  Food Product</Link>
                  </Col>
                </FormGroup>
                    </Card>
                    <Card body>
                      <table>
                        <thead>
                          <tr>
                            <th>Serial No:</th>
                            <th>id</th>
                            <th>Category</th>
                            <th>Product Name</th>

                            <th>Description</th>
                            <th>Amount</th>
                            <th>Discount</th>
                            <th>Order Count</th>
                            <th>Actions</th>
                           
                            </tr>
                          </thead>
                        <tbody> {
              this.state.data!==undefined && this.state.data.length > 0 && this.state.data.map((object, i) =>{
       return (  
        <tr key ={i}>  
        <td>  {i+1} </td>
        <td>{object._id}</td>
        <td> { object.category_id !== undefined ? object.category_id.name : null} </td>  
        <td>  {object.name}  </td>
         
         <td> {object.description} </td>  
         <td>  {object.amount}  </td>  
         <td>  {object.discount_percentage} </td> 
         <td> {object.order_count} </td>  
         <td> < Link to = { "/admin/food-products/edit/" + object._id } className = "btn btn-success mr-1"  > Edit </Link> 
             <button type="button" onClick={()=>{this.DeleteProduct(object._id)}} className="btn btn-danger">Delete</button>  
          </td>  
        </tr>  
    ) 
     })  } 
                    </tbody>
                      </table>
              </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
     
      </Page>
      );
      }
}

export default FoodList;