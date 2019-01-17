import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
        products: [],
        product: {
            name: 'sampleName',
            price: 2
        }
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = (e) => {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(response => this.setState({ products: response.data }))
            .catch(err => console.log(err))
    };

    addProduct = _ => {
        const { product } = this.state;
        fetch(`http://localhost:4000/products/add?name=${product.name}&price=${product.price}`)
            .then(this.getProducts)
            .catch(err => console.log(err))
    };

    renderProducts = ({ product_id, name, price }) => <div key={product_id}>{name} <span>{price}</span></div>;

    render() {
        const { products, product } = this.state;
        return (
          <div className="App">
              {products.map(this.renderProducts)}

              <div>
                  <input
                      value={product.name}
                      onChange={e => this.setState({product: { ...product, name: e.target.value }})}
                  />
                  <input
                      value={product.price}
                      onChange={e => this.setState({product: { ...product, price: e.target.value }})}
                  />
                  <button onClick={this.addProduct}>Add</button>
              </div>
          </div>
        );
    }
}

export default App;
