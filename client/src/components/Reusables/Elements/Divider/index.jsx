import React from 'react'

const Divider = ({bg="black",width="1"}) => {
  return (
    <div style={{height:`${width}px;`, background:`${bg};`}} ></div>
  )
}

export default Divider
