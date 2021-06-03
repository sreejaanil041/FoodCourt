import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

class FoodProducts extends React.Component
{
  render()
  {
    return (
      <Page
        className="FoodProducts"
        title="FoodProducts"
        breadcrumbs={[{ name: 'FoodProducts', active: true }]}
      >
 
      <Row>
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add Food Products Form</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="ProductName" sm={2}>
                    Product Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="prodName"
                      placeholder="Enter a Food Item"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="categorySelect" sm={2}>
                    Select Category
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="categorySelect" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="currencySelect" sm={2}>
                    Select Currency
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="currencySelect" />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Quantity" sm={2}>
                    Quantity
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="qty"
                      placeholder="Enter the quantity"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Price" sm={2}>
                    Price
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="price"
                      placeholder="Enter the Food Price"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Description" sm={2}>
                    Description
                  </Label>
                  <Col sm={10}>
                    <Input type="textarea" name="desc" />
                  </Col>
                </FormGroup>

                 <FormGroup row>
                  <Label for="ProductImage" sm={2}>
                    Product Image
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="file" />
                    <FormText color="muted">
                      Select a food image
                    </FormText>
                  </Col>
                </FormGroup>

                <FormGroup tag="status" row>
                  <Label for="Availability" sm={2}>
                   Availability Status
                  </Label>
                  <Col sm={10}>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" /> Yes
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" /> No
                      </Label>
                    </FormGroup>
                    
                  </Col>
                </FormGroup>

                 <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Save</Button>
                  </Col>
                </FormGroup>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </Page>
    );
}
}

export default FoodProducts;
