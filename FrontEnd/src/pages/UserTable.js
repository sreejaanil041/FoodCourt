import React, { Component } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom';  
import config_path from './config_path'

class UserTable extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
    DeleteUser= () =>{  
     axios.delete('http://localhost:4001/categories/deleteUser?userid='+this.props.obj.userid)  
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
            {this.props.obj.name}  
          </td>  
          <td>  
            {this.props.obj.email}  
          </td>  
          <td>  
            {this.props.obj.password}  
          </td>  
          <td>  
            {this.props.obj.phone_number}  
          </td>  
          <td>  
            {this.props.obj.image}  
          </td>  
          <td>  
          <Link to={"/edit/"+this.props.obj.userid} className="btn btn-success">Edit</Link>  
          </td>  
          <td>  
            <button type="button" onClick={this.DeleteUser} className="btn btn-danger">Delete</button>  
          </td>  
        </tr>  
    );  
  }  
}  
  
export default UserTable; 