import React, { useState } from 'react'
import { MdOutlineMenuOpen,MdOutlineMenu } from "react-icons/md";


const Header = () => {
    const [isSideBarOpen,setSideBarOpen] = useState(false);
  return (
    <div className='w-full p-4 bg-[#e5e5e5]'>
        {
            isSideBarOpen ? <MdOutlineMenuOpen/>:<MdOutlineMenu/>
        }
      
     
    </div>
  )
}

export default Header;
