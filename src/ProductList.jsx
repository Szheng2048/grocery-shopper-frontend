import React, { Component } from 'react'
import Button from "./assets/common/Button"

export class ProductList extends Component {
    state = {
        groceryInput: this.props.product.product,
        canEdit: false
    }
  render() {
    const {product, purchased, _id} = this.props.product
    const {handleOnDelete,handleOnEdit} = this.props
    return (
      <div className='productList-div'>
        {this.state.canEdit?
        (<input 
            type='text'
            onChange={(event)=>this.setState({groceryInput: event.target.value})}
            value = {this.state.groceryInput} />)
        :
        (<li style={{cursor:"pointer",textDecoration: purchased ? "line-through" : "none"}} 
                    className='li-style'>
                    {product}
                </li>)}
        {!this.state.canEdit?
            <Button
                label="Edit"
                cssClass={"editButton"}
                clickFunction={()=>{
                this.setState({canEdit:true})
            }}/>:
            <Button
                label="Done"
                cssClass={"doneButton"}
                clickFunction={()=>{
                    handleOnEdit(_id,{product:this.state.groceryInput})
                    this.setState({canEdit:false})
                }}/>}
        <Button
            label="Purchased"
            cssClass={"purchaseButton"}
            clickFunction={()=>{
                handleOnEdit(_id,{purchased:!purchased})
            }}/>
        <Button
            label="Delete"
            cssClass={"deleteButton"}
            clickFunction={()=>
                handleOnDelete(_id)
            }/>
      </div>
    )
  }
}

export default ProductList