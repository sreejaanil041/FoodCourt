import Page from 'components/Page';
import React from 'react';
import axios from 'axios';
import { configpath } from '../utils/config'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    
    Input,
    Label,
    Row,
} from 'reactstrap';

class FoodProducts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            productname: '',
            categoryid: '',
            description: '',
            amount: '',
            discount_percentage: ''
        }
        console.log("test");
    }

    componentDidMount() {
        if (this.props.match.params.id !== undefined) {
            axios.get(configpath + '/products/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        productname: response.data.data.products.name,
                        categoryid: response.data.data.category_id._id,
                        description: response.data.data.category_id.description,
                        amount: response.data.data.products.amount,
                        discount_percentage: response.data.data.products.discount_percentage
                    });

                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    }


    FoodProducts = () => {
        console.log("test 1");
        let data = new FormData();
        data.append('productname', this.state.productname);
        data.append('categoryid', this.state.categoryid);
        data.append('description', this.state.description);
        data.append('amount', this.state.amount);
        data.append('discount_percentage', this.state.discount_percentage);

        // let formdata = {category:this.state.category, name:this.state.name, description:this.state.description, image:this.state.image}
        console.log('name: ', data);
        if (this.props.match.params.id !== undefined) {
            console.log("test 2");
            axios.put(configpath + '/products/' + this.props.match.params.id, data, {
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                }
            })


            .then((response) => {
                console.log(response);
                if (response.data.status === 'success') {
                    console.log("test 3");
                    this.props.history.push('/admin/food-products')
                }
                alert(response.data.message);

            }, (error) => {
                console.log(error);
            })
        } else {
            console.log("test 4");
            console.log(data);
            axios.post(configpath + '/products', data, {
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': token
                }
            })


            .then((response) => {
                console.log("test 5");
                console.log(response);
                if (response.data.status === 'success') {
                    this.props.history.push('/admin/food-products')
                }
                alert(response.data.message);

            }, (error) => {
                console.log("test 6");
                console.log(error);
            })
        }
    }

    //   FoodProducts =()=>{
    //      let formdata = {name:this.state.name, email:this.state.email, password:this.state.password, phone_number:this.state.phone_number,
    //      image:this.state.image}
    //      console.log('name: ',formdata );
    //     axios.post( configpath + 'foodProducts/register', formdata,{
    //     headers: {
    //     'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'
    //     }
    //   })   

    // .then(json => {  
    //   console.log('json: ', json );
    // if(json.data.Status==='Success'){  
    //   console.log(json.data.Status);  
    //   alert("Data Save Successfully");  
    // this.props.history.push('/FoodList')  
    // }  
    // else{  
    // alert('Data not Saved');  
    // debugger;  
    // this.props.history.push('/FoodList')  
    // }  
    // })  
    // }  

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value });
    }

    render() {
        return ( <Page className = "FoodProducts" title = "FoodProducts" breadcrumbs = {
                [{ name: 'FoodProducts', active: true }] } >

            <Row >
            <Col xl = { 6 }
            lg = { 12 }
            md = { 12 } >
            <Card >
            <CardHeader > Add Food Products Form </CardHeader> 
            <CardBody >
            <Form >
            <FormGroup row >
            <Label
            for = "ProductName"
            sm = { 2 } >
            Product Name </Label> 
            <Col sm = { 10 } >
            <Input type = "text"
            name = "productname"
            onChange = { this.handleChange }
            value = { this.state.productname }
            placeholder = "Enter a Food Item" />
            </Col>
            </FormGroup>

            <FormGroup row >
            <Label
            for = "categorySelect"
            sm = { 2 } >
            Select Category </Label> 
            <Col sm = { 10 } >
            <Input type = "select"
            name = "categoryid"
            onChange = { this.handleChange }
            value = { this.state.categoryid }/>
            </Col> 
            </FormGroup>


            <FormGroup row >
            <Label
            for = "Description"
            sm = { 2 } >
            Description </Label>
            <Col sm = { 10 } >
            <Input type = "text"
            name = "description"
            placeholder = "Enter the Description"
            onChange = { this.handleChange }
            value = { this.state.description }/> 
            </Col> 
            </FormGroup>

            <FormGroup row >
            <Label
            for = "Amount"
            sm = { 2 } >
            Amount </Label>
            <Col sm = { 10 } >
            <Input type = "text"
            name = "amount"
            placeholder = "Enter the Amount"
            onChange = { this.handleChange }
            value = { this.state.amount }/> 
            </Col> 
            </FormGroup>

            <FormGroup row >
            <Label
            for = "Discount Percentage"
            sm = { 2 } >
            Discount Percentage </Label> 
            <Col sm = { 10 } >
            <Input type = "text"
            name = "discount_percentage"
            onChange = { this.handleChange }
            value = { this.state.discount_percentage }/> 
            </Col> 
            </FormGroup>

            <FormGroup check row >
            <Col sm = {{ size: 10, offset: 2 } } >
            <Button onClick = { this.FoodProducts }
            className = "btn btn-secondary" > Save </Button>
            </Col> 
            </FormGroup>

            </Form> 
            </CardBody> 
            </Card> 
            </Col> 
            </Row> 
            </Page>
        )
    }
}

export default FoodProducts;