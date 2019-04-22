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

  handlerDetail = () => {
    console.log('from detail')
  }
  addToCart = () => {
    console.log('from add to cart')
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