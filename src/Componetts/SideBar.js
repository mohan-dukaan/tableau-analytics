import cx from "classnames";
import React from "react";

export default function SideBar({ data, active, handleActive }) {
  return (
    <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 pt-4 text-white bg-primary sidebar">
      <h4 className="d-flex align-items-center justify-content-center m-0 text-white">
        <span className="fs-5 fw-bolder">Dukaan Analytics</span>
      </h4>
      <hr />
      <ul className="nav nav-pills mb-auto">
        {data
          .filter(({ values }) => values && values[0]?.formattedValue)
          ?.map(({ values }, idx) => (
            <li
              className="nav-item mt-1 w-100"
              key={idx}
              onClick={() => handleActive(values)}
            >
              <Link {...{ values, active }} />
            </li>
          ))}
      </ul>
      <hr />
    </div>
  );
}

const Link = ({ values, active }) => {
  const classes = cx(`nav-link fw-4 text-capitalize`, {
    active: JSON.stringify(values) === JSON.stringify(active),
  });
  return <p className={classes} title={values[0]?.formattedValue}>{values[0]?.formattedValue}</p>;
};
