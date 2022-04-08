import cx from "classnames";
import React, { useState, useEffect } from "react";
import { Collapse } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClose } from "@fortawesome/free-solid-svg-icons";

export default function SideBar({
  data = [],
  openMenu,
  setOpenMenu,
  active,
  handleActive,
}) {
  var [toggle, setToggle] = useState(null);

  useEffect(() => {
    setToggle(active?.PARENT || data[0]?.NAME || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, active]);

  const toggleMenu = (name) => {
    setToggle(toggle === name ? null : name);
  };

  const container = cx("sidebar-container", {
    show: openMenu,
  });

  const sidebar = cx(
    ` flex-column vh-100 flex-shrink-0 text-white bg-primary sidebar`,
    {
      "open-mobile": openMenu,
      "close-mobile": !openMenu,
    }
  );

  const checkClick = (e) => {
    var container = document.getElementById("side-bar");
    if (!container.contains(e.target)) {
      setOpenMenu(false);
    }
  };

  return (
    <div className={container} onClick={checkClick}>
      <div className={sidebar} id="side-bar">
        <h4 className="d-flex align-items-center justify-content-center m-0 text-white">
          <img src="/logo.svg" alt="" />
        </h4>
        <ul className="nav nav-pills mb-auto mt-24">
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
        <div className="mobile-close" onClick={() => setOpenMenu(false)}>
          <span className="fw-bold">Close</span>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </div>
    </div>
  );
}

const CollapseMenu = ({ data, open, active, handleActive, toggleMenu }) => {
  useEffect(() => {
    var myCollapse = document.getElementById(data.NAME);
    var bsCollapse = new Collapse(myCollapse, { toggle: false });
    open ? bsCollapse.show() : bsCollapse.hide();
  }, [open]);

  const classes = cx(`nav-item mt-4 w-100`, {
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
            className="nav-item mt-4 w-100"
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
