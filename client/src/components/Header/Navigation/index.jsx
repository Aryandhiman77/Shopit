import React, { useState } from 'react'
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoRocketOutline } from "react-icons/io5";
import DrawerNavigation from './Drawer';



const Navigation = () => {
    const [isDrawerOpen,setDrawerOpen]=useState(false);
    
  return (
    <div className='max-w-[95%] mx-auto flex items-center '>
        <div className='col_1 w-[20%]'>
        <Button onClick={()=>setDrawerOpen(true)} className="flex flex-row gap-x-2 !text-black">
            <RiMenu3Line className='text-2xl'/>
            Shop By Categories
            <MdOutlineKeyboardArrowDown className='text-2xl'/>
        </Button>
        </div>
        <div className="col_2 w-[65%] mx-auto text-gray-500">
            <ul className='flex gap-x-4 font-[500]'>
                <Link to={"/category"} className='hover:text-primary'>Stationary</Link>
                <Link to={"/category"} className='hover:text-primary'>Electronics</Link>
                <Link to={"/category"} className='hover:text-primary'>Beauty</Link>
                <Link to={"/category"} className='hover:text-primary'>Health Care</Link>
                <Link to={"/category"} className='hover:text-primary'>Kitchin</Link>
                <Link to={"/category"} className='hover:text-primary'>Fashion</Link>
                <Link to={"/category"} className='hover:text-primary'>Footwear</Link>
                <Link to={"/category"} className='hover:text-primary'>Groceries</Link>
                <Link to={"/category"} className='hover:text-primary'>Jwellery</Link>
            </ul>
        </div>
        <div className="info flex items-center gap-x-2 w-[20%] text-gray-500 font-[400]" >
            <IoRocketOutline className='text-xl'/>
            Free all india delivery
        </div>
        <DrawerNavigation isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} position={"left"}/>
    </div>
  )
}

export default Navigation
