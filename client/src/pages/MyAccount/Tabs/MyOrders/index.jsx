import Divider from '@mui/material/Divider'
import React from 'react'
import OrderItem from '../../../../components/Reusables/Items/OrderItem'

const MyOrders = () => {
  return (
    <div>
       <div className="header p-5">
          <p className="text-gray-600 font-[600] text-[16px]">My Orders</p>
        </div>
        <Divider/>
        <OrderItem/>
    </div>
  )
}

export default MyOrders
