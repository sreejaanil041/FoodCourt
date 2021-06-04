import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
const tableTypes = [ 'striped'];




class CategoriesList extends React.Component
{
render(){

 return (
    <Page
      title="CategoriesList"
      breadcrumbs={[{ name: 'CategoriesList', active: true }]}
      className="CategoriesList"
    >
      {tableTypes.map((tableType, index) => (
        <Row key={index}>

                <Col>
                <Card className="mb-3" >
                    <CardHeader>Categories List</CardHeader>
                    <CardBody>

                    <Card align = "right"> 
                    <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Link className = "btn btn-secondary" to='/Categories' >Add Food Categories</Link>
                  </Col>
                </FormGroup>
                    </Card>
                    <Card body>
                      <Table dark>
                        <thead>
                          <tr>
                            <th>Category Id:</th>
                            <th>Parent Category</th>
                            <th>Category</th>
                            <th>Availability</th>
                            <th>Action</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td></td>
                            <td></td>
                            <td></td>
                             <td></td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td></td>
                            <td></td>
                            <td></td>
                             <td></td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td></td>
                            <td></td>
                            <td></td>
                             <td></td>
                          </tr>
                        </tbody>
                      </Table>
              </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )
      )}
      </Page>
      );
      }
}

export default CategoriesList;