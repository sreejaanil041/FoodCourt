import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {configpath} from '../utils/config'

class FoodList extends React.Component
{

  constructor(props) {  
      super(props);  
      this.state = {data: []};  
    } 

    componentDidMount(){  
      debugger;  
      axios.get( configpath + '/foodProducts')  
        .then(response => {  
          this.setState({ data: response.data.categories });  
          debugger;  
  
        })  
        .catch(function (error) {  
          console.log(error);  
        })  
    }  
      
   DeleteCategories= (foodProductsId) =>{  
     axios.delete( configpath + '/foodProducts/'+ foodProductsId)  
    .then(json => {  
    if(json.data.Status==='Delete'){  
    alert('Record deleted successfully!!');  
    }  
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
                    <CardHeader>Food List</CardHeader>
                    <CardBody>
                    <Card align ="right"> 
                    <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Link className="btn btn-secondary" to='/FoodProducts' >Add  Food Product</Link>
                  </Col>
                </FormGroup>
                    </Card>
                    <Card body>
                      <Table dark>
                        <thead>
                          <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Availability</th>
                            <th>Price</th>
                            <th>Actions</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                         {/* {this.state.data.map(function(object, i){  
                          return (  
        <tr key ={i}>  
        <td>  
            {this.props.obj.productname}  
          </td>
          <td>  
            {this.props.obj.categoryselect}  
          </td>  
            
          <td>  
            {this.props.obj.qty}  
          </td>  
          <td>  
            {this.props.obj.price}  
          </td>  
          <td>  
            {this.props.obj.desc}  
          </td>  
            
          <td>  
            {this.props.obj.image}  
          </td>  
          <td>  
            {this.props.obj.status}  
          </td>  
          <td>  
          <Link to={"/edit/"+this.props.obj.productid} className="btn btn-success">Edit</Link>  
          </td>  
          <td>  
            <button type="button" onClick={this.DeleteProduct} className="btn btn-danger">Delete</button>  
          </td>  
        </tr>  
    );  
     });  } */}
                        </tbody>
                      </Table>
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