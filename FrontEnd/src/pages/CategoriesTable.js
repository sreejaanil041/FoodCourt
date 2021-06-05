import React, { Component } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom'; 
import config_path from './config_path'

class CategoriesTable extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
    DeleteCategories= () =>{  
     axios.delete('http://localhost:4001/categories/deleteCategories?categoryid='+this.props.obj.categoryId)  
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
            {this.props.obj.category}  
          </td>  
          <td>  
            {this.props.obj.name}  
          </td>  
          <td>  
            {this.props.obj.description}  
          </td>  
          <td>  
            {this.props.obj.image}  
          </td>  
          <td>  
          <Link to={"/edit/"+this.props.obj.categoryId} className="btn btn-success">Edit</Link>  
          </td>  
          <td>  
            <button type="button" onClick={this.DeleteCategories} className="btn btn-danger">Delete</button>  
          </td>  
        </tr>  
    );  
  }  
}  
  
export default CategoriesTable; 