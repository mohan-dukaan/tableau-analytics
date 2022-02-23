import cx from "classnames";
import React, { useState, useEffect } from "react";
import { Collapse } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function SideBar({ data = [], active, handleActive }) {
  var [toggle, setToggle] = useState(null);

  useEffect(() => {
    setToggle(data[0]?.NAME || null);
  }, [data]);

  const toggleMenu = (name) => {
    setToggle(toggle === name ? null : name);
  };

  return (
    <div className="d-flex flex-column vh-100 flex-shrink-0 text-white bg-primary sidebar">
      <h4 className="d-flex align-items-center justify-content-center m-0 text-white">
        <span className="fs-5 fw-bolder">Dukaan Analytics</span>
      </h4>
      <hr />
      <ul className="nav nav-pills mb-auto">
        {data?.map((ele, idx) => (
          <CollapseMenu
            key={idx}
            data={ele}
            active={active}
            handleActive={handleActive}
            open={toggle === ele.NAME}
            toggleMenu={toggleMenu}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
}

const CollapseMenu = ({ data, open, active, handleActive, toggleMenu }) => {
  useEffect(() => {
    var myCollapse = document.getElementById(data.NAME);
    var bsCollapse = new Collapse(myCollapse, { toggle: false });
    open ? bsCollapse.show() : bsCollapse.hide();
  }, [open]);

  const classes = cx(`nav-item mt-1 w-100`, {
    collapsed: open === true,
  });

  return (
    <React.Fragment>
      <li
        className={classes}
        onClick={() => toggleMenu(data.NAME)}
        aria-controls={data.NAME}
      >
        <Link data={data} active={active} showArrow />
      </li>
      <div className="collapse w-100" id={data.NAME}>
        {data?.sub_menu?.map((el, idx) => (
          <li
            className="nav-item mt-1 w-100"
            key={idx}
            onClick={() => handleActive(el)}
          >
            <Link data={el} active={active} sub_menu={true} />
          </li>
        ))}
      </div>
    </React.Fragment>
  );
};
const Link = ({ data, title, active, ...rest }) => {
  const classes = cx(`nav-link fw-4 text-capitalize`, {
    active:
      JSON.stringify(data) === JSON.stringify(active) ||
      data.NAME === active.PARENT,
    sub: rest.sub_menu === true,
  });
  return (
    <p className={classes} title={title || data.NAME}>
      {rest.showArrow && <FontAwesomeIcon icon={faChevronDown} />}
      <span>{title || data.NAME}</span>
    </p>
  );
};
