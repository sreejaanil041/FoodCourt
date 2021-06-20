import React from 'react';

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
            console.log('empty');
            alert('Please login before adding the items to cart');
           // window.location = '/login'
            // return;
        }
        console.log('not empty')

        let id = this.props.product._id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.order_count < qty) {
			cart[id] = this.props.product.order_count;
		} else {
			cart[id] = qty
        }
        var cartItems = [];
        for (var prop in cart) {
            if (cart.hasOwnProperty(prop)) {
                var innerObj = {};
                innerObj[prop] = cart[prop];
                cartItems.push(innerObj)
            }
        }
        console.log(cartItems);

		localStorage.setItem('cart', JSON.stringify(cart));
	}

	render(){
		const { product } = this.props;
		return (
            <div class="col-md-4">
            <div class="card mb-4 box-shadow">
            <img src={product.image} alt="product" />
            <div class="card-body">
                <p class="card-text">{product.name}</p>
                <p class="card-text">{product.description}</p>
                <p class="card-text">{product.short_description}</p>
                <p class="card-text">Price: $ {product.net_amount}</p>
                <p class="card-text">Available quantity: {product.order_count}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                  <button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}>Add to cart</button>
                  </div>
                  <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
                </div>
              </div>
            </div>
          </div>)
		    {/* <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
			    <h4 className="card-title">{product.name}</h4>
			    <p className="card-text">{product.description}</p>
                <p className="card-text">{product.short_description}</p>
			    <h5 className="card-text"><small>price: </small>${product.amount}</h5> */}
			    {/* <span className="card-text"><small>Available Quantity: </small>{product.available_quantity}</span> */}

			    {/* { product.available_quantity > 0 ? */}
			    	{/* <div>
			    		<button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}>Add to cart</button>
			    		<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
			    	</div> */}
                     {/* :
			    	<p className="text-danger"> product is out of stock </p>
			 	} */}

			  {/* </div>
			</div> */}

	}
}
