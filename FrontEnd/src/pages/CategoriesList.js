import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { configpath } from '../utils/config';

class CategoriesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {


        debugger;
        axios.get(configpath + '/categories')
            .then(response => {
                console.log({data: response.data.categories.size()});
                this.setState({ data: response.data.categories });
                debugger;

            })
            .catch(function(error) {
                console.log(error);
            })
    }

    DeleteCategories = (categoryId) => {
        axios.delete(configpath + '/categories/' + categoryId)
            .then(json => {
                if (json.data.Status === 'Delete') {
                    alert('Record deleted successfully!!');
                }
            })
    }
    render() {

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
            <Link className = "btn btn-secondary"
            to = '/Categories' > Add Food Categories </Link> 
            
            </Col> 
            </FormGroup> 
            </Card> 
            < Card body >
            <table className = "table table-striped"
            style = {
                { marginTop: 10 } } >
            <thead >
            <tr >
            <th > Category Id: </th>
            <th > Parent Category </th>
            <th > Category </th> 
            <th > Description </th> 
            <th > Image </th>
             <th > Actions </th>
            </tr> 
            </thead>
            <tbody > {
                this.state.data.map(function(object, i) {
                    return (
                         < tr key = { i } >
                        <td > { object.category } </td>  
                          <td > { object.name } </td>   
                           <td > { object.description }</td>  
                            < td > { object.image } </td>  
                             <td >
                        < Link to = { "/edit/" + object.id }
                        className = "btn btn-success" > Edit </Link>
                           </td>   
                           <td >
                        <button type = "button"
                        onClick = { this.DeleteCategories(object.id) }
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