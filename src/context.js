import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: storeProducts,
    detailProduct: detailProduct
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