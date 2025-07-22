import React from 'react'

const Divider = ({bg="black",width="1"}) => {
  return (
    <div className={`h-[${width}px] w-full bg-[${bg}]`}></div>
  )
}

export default Divider
