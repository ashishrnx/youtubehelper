import React from 'react'

export default function Navbar() {
  const navbarStyle = {
    textbg: "linear-gradient(to right, #E55341, #D98973)",
  };
  
  return (
    <header>
      <nav className="flex items-center justify-between px-4 py-2" style={navbarStyle}>
        <div className="flex items-center space-x-4">
          <img
            src="https://jpcdn.it/img/d3c2eb8f4dda307c377a205f75c3f5b4.png"
            alt="Site Logo"
            className="h-8"
          />
          <h2 className="text-2xl font-bold">
            <span
              style={{
                background: navbarStyle.textbg,
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block",
                paddingLeft: "5px",
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