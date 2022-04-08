import axios from "axios";
import React, { useState } from "react";
import { SHEET_URL } from "./assets/constants";
import SideBar from "./Componetts/SideBar";
import Tableau from "./Componetts/Tableau";

function App() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState({});

  React.useEffect(() => {
    axios
      .get(SHEET_URL)
      .then((res) => {
        let DATA = res.data.sheets[0].data[0].rowData;
        let header = DATA[0].values.reduce(
          (a, c) => [...a, c.formattedValue],
          []
        );

        let data = DATA.filter((_, idx) => idx !== 0)
          .reduce((acc, cur) => {
            var dd = cur?.values?.reduce(
              (a, c, idx) => ({ ...a, [header[idx]]: c.formattedValue }),
              {}
            );
            if (dd) {
              Object.keys(dd).forEach((key) => {
                if (!dd[key]) {
                  delete dd[key];
                }
              });
              if (Object.keys(dd).length > 0) {
                return [...acc, dd];
              }
            }
            return [...acc];
          }, [])
          .filter((el) => el);
        var main_menu = [...new Set(data.map((el) => el[header[0]]))];
        var menu_data = main_menu.reduce((a, c) => {
          var sub_menu = data.filter((el) => el[header[0]] === c);
          return [...a, { NAME: c, sub_menu }];
        }, []);
        var name = JSON.parse(localStorage.getItem("toggle")) || null;
        setActive(name||menu_data[0]?.sub_menu[0] || []);
        setData(menu_data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleActive = (row) => {
    setActive(row);
    localStorage.setItem("toggle", JSON.stringify(row));
  };

  return (
    <div className="App">
      <div className="d-flex">
        <SideBar data={data} active={active} handleActive={handleActive} />
        {Object.keys(active).length > 0 && (
          <div className="" style={{ padding: 24 }}>
            <Tableau url={active.URL} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
