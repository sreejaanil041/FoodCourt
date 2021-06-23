import React from 'react';
import { isAuthenticated, getCartProducts } from '../repository';
import {  Redirect, Link } from 'react-router-dom';
import { addShippingAddress,checkout } from '../repository';
import { any } from 'prop-types';
export default class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
            total: 0,
            shippingId:'',
            name: '', address: '', landmark:'', phone_number:'',alternative_phone_number:'',
            city:'',state:'',country:'',post_code:''
		}
    }
    handleInputChange=(event)=> {
        this.setState({[event.target.name]: event.target.value})
      }
    addShippingAddress=(event)=>{
        event.preventDefault();
        addShippingAddress(this.state)
          .then(res =>{
             this.setState({shippingId: res.data._id})
          })
          .catch(err => alert(err));
      }
      checkout=()=>{
        if(this.state.shippingId ===''){
            alert('pls add shipping address');
           return;
        }
        checkout(this.state.shippingId).then((res)=>
        alert('Order successfully delivered')
        )

      }


	componentWillMount() {
		let cart = localStorage.getItem('cart');
        if (!cart) return;

            getCartProducts().then((res) => {
                if(res.status=="error"){
                    alert(res.message + '.  Please login again');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location = '/login';
                    return;
                }
                let products = res.data.cart;
                let total = 0;
                for (var i = 0; i < products.length; i++) {
                    total += products[i].amount * products[i].quantity;
                }
                this.setState({ products, total });
	    });
	}

	render() {
		// if (!isAuthenticated()) return (<Redirect to="/login" />);
		const { products, total } =  this.state;
		return (
            <div class="container">

            <div class="row">
              <div class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-muted">Your cart</span>

                  {/* <span class="badge badge-secondary badge-pill">{products!=undefined?'':products.length}</span> */}
                </h4>
                <ul class="list-group mb-3">
                { products.length ?
					products.map((product, index) =>
                  (<li key={index} class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">{product.product_id.name}</h6>
                <small class="text-muted">Quantity:{product.quantity} * Price:{product.amount}</small>
                    </div>
                    <span class="text-muted">${product.amount * product.quantity }</span>
                  </li>)):<h3 className="text-warning">No item on the cart</h3>
                }
                 <li class="list-group-item d-flex justify-content-between">
                 <span>Total (USD)</span>
                <strong>${total}</strong>
                </li>
                </ul>
                <button class="btn btn-primary btn-lg btn-block" onClick={this.checkout}
                 type="button">Submit</button>

                </div>



              <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Add shipping address</h4>
                <form class="needs-validation" novalidate onSubmit={this.addShippingAddress}>

                    <div class="row">
                     <div class=" mb-3">
                     <label>Name:</label>
                     <input type="text" className="form-control" name="name" onChange={this.handleInputChange}/>
                     </div>
                    </div>
                    <div class="row">
                     <div class=" mb-3">
                     <label>Address:</label>
                     <input type="text" className="form-control" name="address" onChange={this.handleInputChange}/>
                     </div>
                    </div>
                    <div class="row">
                     <div class=" mb-3">
                     <label>Landmark:</label>
                     <input type="text" className="form-control" name="landmark" onChange={this.handleInputChange}/>
                     </div>
                    </div>
                    <div class="row">
                     <div class=" mb-3">
                     <label>Phone number:</label>
                     <input type="number" className="form-control" name="phone_number" onChange={this.handleInputChange}/>
                     </div>
                    </div>
                    <div class="row">
                     <div class=" mb-3">
                     <label>Alternative phone number:</label>
                     <input type="number" className="form-control" name="alternative_phone_number" onChange={this.handleInputChange}/>
                     </div>
                    </div>
                    <div class="row">
                     <div class=" mb-3">
                     <label>City:</label>
                     <input type="text" className="form-control" name="city" onChange={this.handleInputChange}/>
                     </div>
                    </div> <div class="row">
                     <div class=" mb-3">
                     <label>State:</label>
                     <input type="text" className="form-control" name="state" onChange={this.handleInputChange}/>
                     </div>
                    </div> <div class="row">
                     <div class=" mb-3">
                     <label>Country:</label>
                     <input type="text" className="form-control" name="country" onChange={this.handleInputChange}/>
                     </div>
                    </div> <div class="row">
                     <div class=" mb-3">
                     <label>Postal code:</label>
                     <input type="number" className="form-control" name="post_code" onChange={this.handleInputChange}/>
                     </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Add</button>

                  <hr class="mb-4"></hr>
                </form>


                </div>
              </div>
            </div>


		);
	}
}
