import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {ButtonContainer} from './Button';
import logo from '../logo.svg';

export default class NavBar extends Component {
  render() {
    return (
      <NavWapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              products
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="nav-link">
          <ButtonContainer>
            <span>
              <i className="fas fa-cart-plus" />
              my cart
            </span>
          </ButtonContainer>
      </Link>
      </NavWapper>
   
    );
  }
}

const NavWapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;