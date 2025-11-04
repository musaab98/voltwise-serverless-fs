import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/voltwise-serverless-fs/#">
            <img src={process.env.PUBLIC_URL + "/voltwise-logo.png"} width="112" height="28" alt="voltwise logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/voltwise-serverless-fs/#" className="navbar-item">
              Home
            </a>
            <a href="/voltwise-serverless-fs/#products" className="navbar-item">
              Products
            </a>
            <a href="/voltwise-serverless-fs/#admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href="/voltwise-serverless-fs/#register" className="button is-primary">
                  <strong>Register</strong>
                </a>
                <a href="/voltwise-serverless-fs/#login" className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
