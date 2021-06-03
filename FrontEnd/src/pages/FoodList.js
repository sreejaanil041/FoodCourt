import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

const tableTypes = [  'hover'];

class FoodList extends React.Component
{
render(){

 return (
    <Page
      title="Food List"
      breadcrumbs={[{ name: 'foodList', active: true }]}
      className="FoodList"
    >
      {tableTypes.map((tableType, index) => (
        <Row key={index}>

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
                          <tr>
                            <th scope="row">1</th>
                            <td></td>
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
                             <td></td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td></td>
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

export default FoodList;