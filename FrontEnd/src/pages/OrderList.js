import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


class OrderList extends React.Component
{
render(){

 return (
    <Page
      title="Order List"
      breadcrumbs={[{ name: 'orderList', active: true }]}
      className="OrderList"
    >
      
        <Row >

                <Col>
                <Card className="mb-3" >
                    <CardHeader>Order List</CardHeader>
                    <CardBody>
                   
                    <Card body>
                      <Table >
                       <thead>
                          <tr>
                            <th>Order Id</th>
                            <th>Order Name</th>
                            <th>User Name</th>
                            <th>Order Status</th>
                             <th>Quantity</th>
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
     
      
      </Page>
      );
      }
}

export default OrderList;