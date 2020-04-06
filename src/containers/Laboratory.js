import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Laboratory(props) {
    return (
        <div className="Laboratory align-middle center">
            <h1 className="Black-Ops radioactive">Restricted Access</h1>
            <h3 className="center pale-silver">Please Sign up or in to proceed</h3>
            <div className="buttons">
                <Link to="/login" className="btn btn-lg">
                    Login
                </Link>
                <Link to="/signup" className="btn btn-lg center">
                    Signup
                </Link>
            </div>
        </div>

    )
} 