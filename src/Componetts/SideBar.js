import React from "react";

export default function SideBar({ data, active, handleActive }) {
  return (
    <div
      className="d-flex flex-column vh-100 flex-shrink-0 p-3 pt-4 text-white bg-primary"
      style={{ width: 240 }}
    >
      <h4 className="d-flex align-items-center justify-content-center m-0 text-white">
        <span className="fs-5 fw-bolder">Dukaan Analytics</span>
      </h4>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {data
          .filter(({ values }) => values && values[0]?.formattedValue)
          ?.map(({ values }, idx) => (
            <li
              className="nav-item"
              key={idx}
              onClick={() => handleActive(values)}
            >
              <p
                className={`nav-link fw-4 text-capitalize ${
                  JSON.stringify(values) === JSON.stringify(active)
                    ? "active"
                    : ""
                }`}
              >
                {values[0]?.formattedValue}
              </p>
            </li>
          ))}
      </ul>
      <hr />
    </div>
  );
}
