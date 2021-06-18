import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { configpath } from '../utils/config';

class CategoriesList extends React.Component {

    constructor(props) {

    
super (props);
  this.state = { data: [] };
  this.DeleteCategories = this.DeleteCategories.bind(this);

    }


    componentDidMount() {
       
        axios.get(configpath + '/categories',{
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('token')
                }
        })
            .then(response => {
               console.log('data', response.data.data);
                this.setState({ data: response.data.data.categories });               
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    DeleteCategories (categoryId)  {
console.log('hereeeeeeeeee')
        axios.delete(configpath + '/categories/' + categoryId,{
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('token')
                }
        })
            .then(response => {
                if (response.data.status === 'success') {
                    this.setState({ data: this.state.data.filter(item => item.id !== categoryId)});
                }
                 alert(response.data.message);
            })
    }
    render() {
console.log('stateeeeeeeee,',this.state.data)
        return ( <Page title = "CategoriesList"
            breadcrumbs = {
                [{ name: 'CategoriesList', active: true }] }
            className = "CategoriesList" >

            <Row>

            <Col>
            <Card className = "mb-3" >
            <CardHeader > Categories List </CardHeader> 
            <CardBody >

            <Card align = "right" >
            < FormGroup check row >
            <Col sm = {
                { size: 10, offset: 2 } } >
            <Link className = "btn btn-secondary mt-2 mr-2" 
            to = '/admin/add-category' > Add Food Category </Link> 
            
            </Col> 
            </FormGroup> 
            </Card> 
            < Card body >
            <table className = "table table-striped"
            style = {
                { marginTop: 10 } } >
            <thead >
            <tr >
            <th > Serial No: </th>
            <th > Category </th>
            <th > Sub Category </th> 
            <th > Description </th> 
            <th > Image </th>
             <th > Actions </th>
            </tr> 
            </thead>
            <tbody > {
              this.state.data!==undefined && this.state.data.length > 0 && this.state.data.map((object, i) =>{
                  console.log('ca',object.id)
                    return (
                         < tr key = { i } >
                         <td>{i+1}</td>
                        <td > { object.category } </td>  
                          <td > { object.name } </td>   
                           <td > { object.description }</td>  
                            < td > {
object.image != null ? <img className="rounded-circle mb-2" src={configpath+object.image} style={{width: "50px", height: "50px"}}/> : "No image"
} </td>  
                             <td >
                        < Link to = { "/admin/category/edit/" + object.id }
                        className = "btn btn-success mr-1"  > Edit </Link>

                       
                           
                        <button 
                       onClick = { () => {this.DeleteCategories(object.id)} }
                       // onClick={this.handleSort }
                        className = "btn btn-danger" > Delete </button> 
                          </td>  
                           </tr>  
                    )
                })
            }

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

export default CategoriesList;
