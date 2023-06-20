import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
    <div className="">
      <div className=" "> 
        <div
          className="card"
          style={{ height: 758, border: "2px solid black" }}
        >
          
          <Link to="/">
            <button className=" mx-4 my-2 btn btn-outline-dark w-75">Home</button>
          </Link>
          <Link to="/setting">
            <button className=" mx-4 my-2 btn btn-outline-dark w-75">Settings</button>
          </Link>
          <Link to="/designSize">
            <button className=" mx-4 my-2 btn btn-outline-dark w-75">DesignSize</button>
          </Link>
          <Link to="/mockups">
            <button className=" mx-4 my-2 btn btn-outline-dark w-75">Mockups</button>
          </Link>
          <Link to="/materials">
            <button className=" mx-4 my-2 btn btn-outline-dark w-75">Materials</button>
          </Link>
        </div>
      </div>
      <div className="">
        
      </div>
      </div>
    </>
  );
}
