import React from 'react'
import "./style.css"

const ProgressBar = ({max=300,value=30,height=5,color="green"}) => {
  return (
    <div className='w-full flex items-center'>
       <progress value={value} max={max} style={{height:`${height}px`,'--progress-color':color}}/>
    </div>
  )
}

export default ProgressBar
