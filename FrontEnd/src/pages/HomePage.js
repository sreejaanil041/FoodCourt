
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';

import {

  productsData,

} from 'demos/dashboardPage';
import React from 'react';
import axios from 'axios';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import {configpath} from '../utils/config'
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			products: []
		}
      }

      componentDidMount(){
        getProducts().then((res) => {
            console.log(res.products);
            this.setState({ products:res.products });
          });
      }


  render() {
    const { products } =  this.state;

    return (

      <Page
        className="DashboardPage"
        title="Food menu">


        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardBody>
              <div className=" container">
				<h3 className="card-title">List of Available Products</h3>

				<hr/>
                <div class="row">
                {
					products.map((product, index) => <ProductItem product={product} key={index}/>)
				}
                </div>

				<hr/>
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<Link to="/cart"><button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>View Cart</button></Link>
				<br/><br/><br/>
			</div>

              </CardBody>
            </Card>
          </Col>



        </Row>



      </Page>
    );
  }
}
export default DashboardPage;
