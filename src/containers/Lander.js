import React from "react";
import "./Lander.css";
import { Link } from "react-router-dom";

export default function Lander(props) {

    return (
        <div>
            <Link to="/laboratory"><h1 className="pull-left align-middle Aladin">To the Laboratory</h1></Link>            
            <Link to="/library"><h1 className="pull-right align-middle Aladin">To the Library</h1></Link>
        </div>
      );
}