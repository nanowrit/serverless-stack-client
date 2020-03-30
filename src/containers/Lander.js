import React from "react";
import { Link } from "react-router-dom";
import "./Lander.css";
import { Image } from "react-bootstrap";

export default function Lander(props) {
    return (
        <div className="Lander">
            <div className="aboveFold">
                <div className="copyAboveFold">                
                    <h1 className="headerAboveFold">Welcome to Nanowrit Labs</h1>
                    <p className="tagAboveFold">We study the techniques, processes and work...</p>
                    <p className="tagAboveFold">...of classic pulp fiction writers...</p>
                    <p className="tagAboveFold">...to create useful workflows for the modern writer.</p>
                    {/* <p className="tagAboveFold">We study the workflows of classic pulp fiction writers to provide modern writers the same tools to create classic stories today</p> */}
                </div>
                <Image className="artAboveFold" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/The_Devil_in_Iron.png" alt="The Devil In Iron" responsive />
        </div>
          <div>
              <div className="belowFold">
                  <Image className="artBelowFold" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/Weird_Tales_November_1941.png" />
                  <div className="copyBelowFold">
                    <h1 className="headerBelowFold">Check out our Library</h1>
                    <p className="tagAboveFold">where we keep our collection of classic tales...</p>
                    <p className="tagAboveFold">...written by some of the finest in the business.</p>
                  </div>
              </div>
            <Link to="/login" className="btn btn-info btn-lg">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success btn-lg">
              Signup
            </Link>
          </div>
        </div>
      );
}