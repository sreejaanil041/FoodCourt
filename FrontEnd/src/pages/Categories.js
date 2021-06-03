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

class Categories extends React.Component
{
    render()
    {
        return(

 <Page
        className="FoodCategories"
        title="FoodCategories"
        breadcrumbs={[{ name: 'FoodCategories', active: true }]}
      >
 
      <Row>
    <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Add Food Categories Form</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="ParentCategory" sm={2}>
                    Parent Category
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="ParentCategory"
                      placeholder="Enter Food Parent Category"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="Category" sm={2}>
                   Category
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="Category"
                      placeholder="Enter Food Category"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="CategoryImage" sm={2}>
                    Category Image
                  </Label>
                  <Col sm={10}>
                    <Input type="file" name="file" />
                    <FormText color="muted">
                      Select a food category image
                    </FormText>
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

export default Categories;
