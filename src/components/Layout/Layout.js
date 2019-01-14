import React from "react";
import "./Layout.scss";

const Layout = ({ sidebar, content }) => (
  <div className="Layout">
    <div className="Layout__sidebar">{sidebar}</div>
    <div className="Layout__content">{content}</div>
  </div>
);

export default Layout;
