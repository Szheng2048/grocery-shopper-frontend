import React, { Component } from 'react'
import "./App.css"
import Header from './Header'
import Product from './Product'

export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Product/>
      </div>
    )
  }
}

export default App