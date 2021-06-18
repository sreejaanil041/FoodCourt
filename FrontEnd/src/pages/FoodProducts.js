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
            name: '',
            category_id: '',
            description: '',
            amount: '',
            discount_percentage: '',
            order_count:'',
            categories:[]
        }
        console.log("test");
    }

    componentDidMount() {
        this.CategoryList();
        if (this.props.match.params.id !== undefined) {
            axios.get(configpath + '/products/' + this.props.match.params.id,{
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token' : localStorage.getItem('token')
                    }
            })
                .then(response => {
                    console.log(response.data.data)
                    this.setState({
                        name: response.data.data.products.name,
                       category_id: response.data.data.products.category_id,
                        description: response.data.data.products.description,
                        amount: response.data.data.products.amount,
                        discount_percentage: response.data.data.products.discount_percentage,
                        order_count: response.data.data.products.order_count
                    });

                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    }

    CategoryList= ()=>
    {
      axios.get(configpath + '/categories',{
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : localStorage.getItem('token')
            }
      }
      )
      .then(response => {
         console.log('data', response.data.data);
          this.setState({ categories: response.data.data.categories });               
      })
      .catch(function(error) {
          console.log(error);
      })
    }

    FoodProducts = () => {
        console.log("test 1");
        let data = new FormData();
        data.append('name', this.state.name);
        data.append('category_id', this.state.category_id);
        data.append('description', this.state.description);
        data.append('amount', this.state.amount);
        data.append('discount_percentage', this.state.discount_percentage);
        data.append('order_count', this.state.order_count);
        // let formdata = {category:this.state.category, name:this.state.name, description:this.state.description, image:this.state.image}
        console.log('name: ', data);
        if (this.props.match.params.id !== undefined) {
            console.log("test 2");
            axios.put(configpath + '/products/' + this.props.match.params.id, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token' : localStorage.getItem('token')
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
                    'x-access-token' : localStorage.getItem('token')
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
        console.log("render"+ this.state.category_id)
        return ( <Page className = "FoodProducts" title = "Food Products" breadcrumbs = {
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
            sm = { 12 } >
            Product Name </Label> 
            <Col sm = { 12 } >
            <Input type = "text"
            name = "name"
            onChange = { this.handleChange }
            value = { this.state.name }
            placeholder = "Enter a Food Item" />
            </Col>
            </FormGroup>
{
            <FormGroup row >
            <Label
            for = "categorySelect"
            sm = { 12 } >
            Select Category </Label> 
            <Col sm = { 12 } >
            <Input type = "select"
            name = "category_id"
            onChange = { this.handleChange }
            value = { this.state.category_id }>
                <option>Select</option>
                 {this.state.categories.length > 0 && this.state.categories.map((object, i) =>{

                     return(
                         
                <option key={i} value = {object.id}>{object.name}</option>)})}
                </Input>
            </Col> 
            </FormGroup> }


            <FormGroup row >
            <Label
            for = "Description"
            sm = { 12 } >
            Description </Label>
            <Col sm = { 12 } >
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
            sm = { 12 } >
            Amount </Label>
            <Col sm = { 12 } >
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
            sm = { 12 } >
            Discount Percentage </Label> 
            <Col sm = { 12 } >
            <Input type = "text"
            name = "discount_percentage"
            onChange = { this.handleChange }
            value = { this.state.discount_percentage }/> 
            </Col> 
            </FormGroup>

            <FormGroup row >
            <Label
            for = "Order Count"
            sm = { 12 } >
            Order Count </Label> 
            <Col sm = { 12 } >
            <Input type = "text"
            name = "order_count"
            onChange = { this.handleChange }
            value = { this.state.order_count }/> 
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