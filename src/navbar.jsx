import React from 'react'




function navbar() {
    const navbarStyle = {
      textbg: "linear-gradient(to bottom, #800080, #191970)",
     
    };
    
  return (
    <header>
      <nav className="flex items-center justify-between px-2 py-0 bg-white-200">
        <div className="flex items-center space-x-4">
          <img
            src="https://jpcdn.it/img/d3c2eb8f4dda307c377a205f75c3f5b4.png"
            alt="Site Logo"
            className="h-6"
          />
          <h2 className="text-lg font-bold" style={navbarStyle}>
            <span
              style={{
                background: navbarStyle.textbg,
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block",
                backgroundImage: "linear-gradient(to right, black, gold)",
                paddingLeft: "5px", // Adjust padding as needed
              }}
            >
              TubeInSight
            </span>
          </h2>
        </div>
      </nav>
    </header>
  );
}

export default navbar