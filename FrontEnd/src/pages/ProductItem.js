import React from 'react';
import { postCartProducts, isAuthenticated} from '../repository';
import {configpath} from '../utils/config';
export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            quantity: 1,
            cartArray:[]
		}
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	addToCart = () => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if(Object.keys(cart).length === 0 ){
            console.log(isAuthenticated());
            if(!isAuthenticated()){
                alert('Please login before adding the items to cart');
                window.location = '/login'
               return;
            }
        }
        let id = this.props.product._id.toString();
        cart[id] = (cart[id] ? cart[id]: 0);
        let qty = cart[id] + parseInt(this.state.quantity);
        let available_quantity = this.props.product.order_count-cart[id];
        if (this.props.product.order_count < qty) {
            alert(`Maximum available order for this food is, ${available_quantity}`);
            return;
         }else{
            var cartItems = [];
            cartItems.push({id: this.props.product._id, quantity: this.state.quantity});
            console.log(cartItems)
            postCartProducts(cartItems)
             .then(res => {
                 if(res.status == 'error'){
                     alert(res.message,'.Please login again');
                     return;
                 }
             })
            .catch(err => alert(err));

            cart[id] = qty



            localStorage.setItem('cart', JSON.stringify(cart));
         }

	}

	render(){
		const { product } = this.props;
		return (
            <div class="col-md-4">
            <div class="card mb-4 box-shadow">
            {product.image !== null ? <img src={configpath+product.image} alt="image"/> : "No image"}
            <div class="card-body">


                <p class="card-text">{product.name}</p>
                <p class="card-text">{product.description}</p>
                <p class="card-text">{product.short_description}</p>
                <p class="card-text">Price: $ {product.amount}</p>
                <p class="card-text">Discounted Price: $ {product.net_amount}</p>
                <p class="card-text">Available quantity: {product.order_count}</p>
                <p class="card-text">Discount: {product.discount_percentage} %</p>
                <div class="d-flex justify-content-between align-items-center">
                { product.order_count > 0 ?
			    	 <div>
			    		<button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}>Add to cart</button>
			    		<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
			    	</div>
                      :
			    	<p className="text-danger"> product is out of stock </p>
			 	}
                </div>
              </div>
            </div>
          </div>)


	}
}
