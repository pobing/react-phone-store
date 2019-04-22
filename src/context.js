import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem];
    })
    this.setState(() => {
      return {products: tempProducts}
    })
  }

  componentDidMount () {
    this.setProducts();
  }
  
  getItem = (id) => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  }

  handlerDetail = (id) => {
    const product = this.getItem(id);
    this.setState(()=> {
      return {detailProduct: product}
    })
  }
  addToCart = (id) => {
    console.log(`from add to cart ${id}`)
  }
  render () {
    return (
      <ProductContext.Provider value={
        {
          ...this.state,
          handlerDetail: this.handlerDetail,
          addToCart: this.addToCart
        }
      }>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};