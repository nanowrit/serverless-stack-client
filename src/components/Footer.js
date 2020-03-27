import React from "react";
// import { Button, Glyphicon } from "react-bootstrap";
import "./Footer.css";

export default function Footer({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
      <div className="Footer">
        <p>nanowritlabs &copy; 2020</p>
      </div>
  );
}