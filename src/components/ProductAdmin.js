import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newproduct: { 
      "productname": "", 
      "id": ""
    },
    isAdmin: false,
    products: []
  }

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    try {
      // regular string, gets converted in API call
      const params = {
        "id": id,
        "productname": this.state.newproduct.productname
      };
      // dynamo safe string, goes in frontend
      const np = {
        "id": { S: id },
        "productname": { S: this.state.newproduct.productname }
      }
      await axios.post(`${config.api.invokeUrl}/products`, params);
      this.setState({ products: [...this.state.products, np] });
      this.setState({ newproduct: { "productname": "", "id": "" }});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateProduct = async (id, name) => {
    try {
      const params = {
        "id": id,
        "productname": name
      };
      console.log("PATCHING...");
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      // Find the index of the product to update
      const productIndex = this.state.products.findIndex(product => product.id.S === id);
      if (productIndex !== -1) {
        // Clone the products array to avoid mutating state directly
        const updatedProducts = [...this.state.products];
        // Update the product's name
        updatedProducts[productIndex].productname = { S: name };
        // Update the state with the new products array
        this.setState({ products: updatedProducts });
        console.log(this.state.products);
      }
    } catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }  

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.id.S !== id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "productname": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchProducts();
  }
  

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Product Admin</h1>
            <p className="subtitle is-5">Add and remove products using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newproduct.productname}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newproduct.id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0 ? (
                        this.state.products.map(product => (
                          <Product
                          name={product.productname.S}
                          id={product.id.S}
                          key={product.id.S}
                          handleAddProduct={this.handleAddProduct}
                          handleDeleteProduct={this.handleDeleteProduct}
                          handleUpdateProduct={this.handleUpdateProduct}
                          onAddProductNameChange={this.onAddProductNameChange}
                          onAddProductIdChange={this.onAddProductIdChange}
                          />
                        ))
                      ) : (
                        <div className="tile notification is-warning">No products available</div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}