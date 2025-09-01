import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import React from 'react'

const Address = () => {
  return (
    <div>
       <div className="header p-5">
          <p className="text-gray-600 font-[600] text-[16px]">My Address</p>
        </div>
        <Divider />
        <div className="address-body p-4">
            <div className="add-address flex items-center justify-center border-[1px] border-[#a0a0a0] border-dashed p-5 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer text-sm font-[500] text-gray-600">
                Add shipping address
            </div>
        </div>
    </div>
  )
}

export default Address
