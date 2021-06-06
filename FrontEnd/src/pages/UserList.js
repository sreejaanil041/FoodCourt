import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {configpath} from '../utils/config';

class UserList extends React.Component
{

  constructor(props) {  
      super(props);  
      this.state = {data: []};  
    }  
    componentDidMount(){  
      debugger;  
      axios.get(configpath + '/users/')  
        .then(response => {  
          this.setState({ data: response.data.user });  
          debugger;  
  
        })  
        .catch(function (error) {  
          console.log(error);  
        })  
    }  

   DeleteUser= (id) =>{  
     axios.delete(configpath + '/users/'+id)  
    .then(json => {  
    if(json.data.Status==='Delete'){  
    alert('Record deleted successfully!!');  
    }  
    })  
    }  
  
render(){

 return (
    <Page
      title="User List"
      breadcrumbs={[{ name: 'userList', active: true }]}
      className="UserList">
     
        <Row >

                <Col>
                <Card className="mb-3" >
                    <CardHeader>User List</CardHeader>
                    <CardBody>
                    <Card align ="right"> 
                    <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Link className = "btn btn-secondary" to='/AddUser' >Add User</Link>
                  </Col>
                </FormGroup>
                    </Card>
                    <Card body>
                      <Table dark>
                        <thead>
                          <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>email</th>
                            <th>Phone</th>
                            <th>Image</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(function(object, i){  
                           return (  
        <tr key ={i}>  
          <td>  
            {this.object.name}  
          </td>  
          <td>  
            {this.object.email}  
          </td>  
          
          <td>  
            {this.object.phone_number}  
          </td>  
          <td>  
            {this.object.image}  
          </td>  
          <td>  
          <Link to={"/edit/"+object.userid} className="btn btn-success">Edit</Link>  
          </td>  
          <td>  
            <button type="button" onClick={this.DeleteUser} className="btn btn-danger">Delete</button>  
          </td>  
        </tr>  
    )  
     })  } 
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

export default UserList;