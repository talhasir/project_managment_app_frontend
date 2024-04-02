// import { Link } from "antd";
import AnchorLink from "antd/es/anchor/AnchorLink";
import React from "react";
import { Link } from "react-router-dom";

function PaginationComp({ links, page}) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          to={link.url || ""}
          key={link.label} // Corrected typo in key attribute
          className={
            "inline-block py-2 px-3 rounded-lg text-xs" +
            (link.active ? " bg-blue-600" : " bg-blue-300") // Moved space before class name
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}

export default PaginationComp;
