import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
      <div className="Footer">
        <Link to="/terms-of-use">terms of use</Link>
        <br></br>
        <a href="https://www.patreon.com/bePatron?u=32169123" data-patreon-widget-type="become-patron-button">Become a Patron!</a>
        <p>nanowritlabs &copy; 2020</p>
      </div>
  );
}