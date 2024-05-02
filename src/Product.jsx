import React, { Component } from 'react'
import axios, { all } from "axios"
import ProductList from './ProductList'
import Button from "./assets/common/Button"

export class Product extends Component {
    state = {
        groceryInput:"",
        groceryList:[],
        error:"",
        sortByOldest:true,
        sortByPurchased: false,
    }
    async componentDidMount(){
        const allGroceries = await axios.get('http://localhost:3000/api/product/get-all-products')
        this.setState({groceryList: allGroceries.data.payload})
    }
    handleOnSubmit = async (event)=>{
        event.preventDefault()
        if(!this.state.groceryInput.length <= 0 && !this.state.groceryList.some(item => item.product === this.state.groceryInput)){
                const newGrocery = await axios.post('http://localhost:3000/api/product/create-product',{product:this.state.groceryInput})
                const newArray = [...this.state.groceryList,newGrocery.data.payload]
                this.setState({groceryList:newArray,
                               groceryInput:""})
        }
    }
    handleGroceryOnChange = (event)=>{
        this.setState({groceryInput: event.target.value})
    }
    handleOnDelete = async (id)=>{
        const deletedItem = await axios.delete(`http://localhost:3000/api/product/delete-product-by-id/${id}`)
        console.log(deletedItem.data)
        this.setState({groceryList:this.state.groceryList.filter(item => item._id !== deletedItem.data.payload._id)})
    }
    handleOnEdit = async (id, updatedObj)=>{
        if(typeof updatedObj.purchased||(!updatedObj.todo.length<=0 && !this.state.groceryList.some(item => item.product === updatedObj.product))){
            const updatedArray = await axios.put(`http://localhost:3000/api/product/update-product-by-id/${id}`,updatedObj)
            const newArray = this.state.groceryList.map(item =>{
                if(updatedArray.data.payload._id === item._id){
                    const key = Object.keys(updatedObj)[0]
                    item[key] = updatedArray.data.payload[key]
                }
                return item
            })
            this.setState({groceryList:newArray})
        }
    }
    sortByDate = (array)=>{
        let sortedArray
        if(!this.state.sortByOldest){
            sortedArray = array.slice().sort((a,b)=> new Date (a.date)-new Date(b.date))
        } else {
            sortedArray = array.slice().sort((b,a)=> new Date (a.date)-new Date(b.date))
        }
        this.setState({
            groceryList:sortedArray,
            sortByOldest:!this.state.sortByOldest
        })
    }
    sortByPurchased = (array)=>{
        let sortedArray
        if(!this.state.sortByPurchased){
            sortedArray = array.sort((a,b)=>Number(a.purchased)- Number(b.purchased))
        } else {
            sortedArray = array.sort((b,a)=>Number(a.purchased)- Number(b.purchased))
        }
        this.setState({
            groceryList:sortedArray,
            sortByPurchased:!this.state.sortByPurchased
        })
    }
  render() {
    return (
      <div>
        <div className='form-div'>
            <p>{this.state.error}</p>
            <form onSubmit={this.handleOnSubmit}>
                <input 
                    name="groceryInput"
                    type="text"
                    value={this.state.groceryInput}
                    onChange={this.handleGroceryOnChange}
                    autoFocus
                />
                <button type="submit">Add</button>
            </form>
        </div>
        <div className='sortButtons'>
            {this.state.sortByOldest?
            (<Button
                label={"Sort By Oldest to Newest"}
                cssClass={"sortButton"}
                clickFunction={()=>{
                    this.sortByDate(this.state.groceryList)
                }}/>):(
                <Button
                    label={"Sort By Newest to Oldest"}
                    cssClass={"sortButton"}
                    clickFunction={()=>{
                        this.sortByDate(this.state.groceryList)
                    }}/>)}
            {this.state.sortByPurchased?
            (<Button
                label={"Sort By Purchased"}
                cssClass={"sortButton"}
                clickFunction={()=>{
                    this.sortByPurchased(this.state.groceryList)
                }}/>):(
                <Button
                    label={"Sort By Not Purchased"}
                    cssClass={"sortButton"}
                    clickFunction={()=>{
                        this.sortByPurchased(this.state.groceryList)
                    }}/>)}
        </div>
        <div className='grocery-div'>
            <ul>
                {this.state.groceryList.map((item)=>{
                    return(
                        <ProductList
                            key={item._id}
                            product = {item}
                            handleOnDelete = {this.handleOnDelete}
                            handleOnEdit = {this.handleOnEdit}
                        />
                    )
                })}
            </ul>
        </div>
      </div>
    )
  }
}

export default Product