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
      this.DeleteUser = this.DeleteUser.bind(this);
    }  
    componentDidMount(){  
     
      axios.get(configpath + '/users/')  
        .then(response => {  
          this.setState({ data: response.data.data.user });  
         
  
        })  
        .catch(function (error) {  
          console.log(error);  
        })  
    }  

   DeleteUser= (Uid) =>{ 
     console.log('hereeeeeeeeee')
        axios.delete(configpath + '/users/' + Uid)
            .then(response => {
                if (response.data.status === 'success') {
                    this.setState({ data: this.state.data.filter(item => item.id !== Uid)});
                }
                 alert(response.data.message);
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
                    <Link className = "btn btn-secondary" to='/admin/add-user' >Add User</Link>
                  </Col>
                </FormGroup>
                    </Card>
                    <Card body>
                      <table>
                        <thead>
                          <tr>
                            <th>Serial No:</th>
                            <th>User Name</th>
                            <th>email</th>
                            <th>Phone</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.data!==undefined && this.state.data.length > 0 && this.state.data.map(function(object, i){  
                           return (  
        <tr key ={i}> 
        <td>  
            {i+1}  
          </td>  
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
            {object.image != null ? <img src={configpath+object.image}/> : "No image"}
          </td>  
          <td>  
          < Link to = { "/users/edit/" + object.id } className = "btn btn-success mr-1"  > Edit </Link>
          <button onClick = { () => {this.DeleteUser(object.id)} }className = "btn btn-danger" > Delete </button> 
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

export default UserList;