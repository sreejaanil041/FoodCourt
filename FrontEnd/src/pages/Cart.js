import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts, deleteCartItem } from '../repository';
import CartItem from './CartItem';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0
		}
	}

	componentWillMount() {

        let cart = localStorage.getItem('cart');
        if (!cart) return;
        getCartProducts().then((res) => {
            if(res.status=='error'){
                alert(res.message + '.  Please login again');
                window.location = '/login';
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                return;

            }else{
            const carts = res.data.cart;
            let total = 0;
			for (var i = 0; i < carts.length; i++) {
				total += carts[i].amount * carts[i].quantity;
            }
            this.setState({ products: carts, total });

            }


          });


    }
    componentDidMount(){

      }

	removeFromCart = (product) => {
        console.log(product)
        console.log(this.state.products)

        deleteCartItem(product._id)
		let products = this.state.products.filter((item) => item._id !== product._id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product.product_id._id.toString()];
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = this.state.total - (product.quantity * product.amount)
		this.setState({products, total});
	}

	clearCart = () => {
		localStorage.removeItem('cart');
		this.setState({products: []});
	}

	render() {
		const { products, total } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title">Cart</h3>
				<hr/>
				{
					products.map((product, index) => <CartItem product={product} remove={this.removeFromCart} key={index}/>)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>: ''}

				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<br/><br/><br/>
			</div>
		);
	}
}
