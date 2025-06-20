import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import React from "react";

const BrandLogo = () => {
  return (
    <React.Fragment>
      <Link to="/">
        {/* <img
          src={logo}
          className="w-full h-15"
          loading="lazy"
          alt="ai powered note taking app"
        /> */}
        <p>NoteVerse</p>
      </Link>
    </React.Fragment>
  );
};

export default BrandLogo; // Added export statement
