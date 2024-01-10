import React from 'react'
import DropdownBox from './dropDownBox';



function navbar() {
    const navbarStyle = {
      textbg: "linear-gradient(to bottom, #800080, #191970)",
      
      
     
    };
    
  return (
    <header>
      <nav className="flex items-center justify-between px-2 py-0 bg-white-200">
        <div className="flex items-center space-x-4">
          <img src="./react-logo.png" alt="Site Logo" className="h-6" />
          <h2 className="text-lg font-bold" style={navbarStyle}>Summary Converter</h2>
        </div>
        <div className="ml-auto">
          <DropdownBox />
        </div>
      </nav>
    </header>
  );
}

export default navbar