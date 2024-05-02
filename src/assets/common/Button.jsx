import React from 'react'

function Button({label, clickFunction, cssClass}) {
  return (
    <div>
        <button className={cssClass} onClick={clickFunction}>{label}</button>
    </div>
  )
}

export default Button