import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
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
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(()=>{
      return {
        products: [...tempProducts], 
        cart: [...this.state.cart, product], 
        detailProduct: { ...product }
      }
    }, this.addTotals)
  }

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({
      modalProduct: product, modalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  getTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => {subTotal += item.total});
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax).toFixed(2);
    const total  = subTotal + tempTax;
    return {subTotal, tax, total};
  }

  addTotals = () => {
    const totals = this.getTotals();
    this.setState(() => {
      return {
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total
      };
    },
      () => {
        console.log(this.state);
      }
    )
  }

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(() => {
      return {cart: [...tempCart]};

    }, this.addTotals)
  }

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return {cart: [...tempCart]};
  
      }, this.addTotals)
    }
  }

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    tempCart = tempCart.filter(item => {
      return item.id !== id;
    })
    this.setState(() => {
      return {
        cart: [...tempCart],
        product: [... tempProducts] 
      }
    }, this.addTotals());
  }

  clearCart = () => {
    this.setState({
      cart: []
    }, () => {
      this.setProducts();
      this.addTotals();
    })
  }

  render () {
    return (
      <ProductContext.Provider value={
        {
          ...this.state,
          handlerDetail: this.handlerDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }
      }>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};