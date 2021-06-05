import React, { Component } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom';  
class FoodProductsTable extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
    DeleteProduct= () =>{  
     axios.delete('http://localhost:4001/categories/deleteProducts?productid='+this.props.obj.productId)  
    .then(json => {  
    if(json.data.Status==='Delete'){  
    alert('Record deleted successfully!!');  
    }  
    })  
    }  
  render() {  
      
      
    return (  
        <tr>  
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
  }  
}  
  
export default FoodProductsTable; 