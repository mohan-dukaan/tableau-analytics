import axios from "axios";
import React, { useState } from "react";
import parse from "html-react-parser";
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
        let data = res.data.sheets[0].data[0].rowData.filter(
          (_, idx) => idx !== 0
        );
        setData(data);
        setActive(data[0].values);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleActive = (row) => {
    setActive(row);
  };

  return (
    <div className="App">
      <div className="d-flex">
        <SideBar data={data} active={active} handleActive={handleActive} />
        {active?.length > 0 && (
          <div className="p-4">
            <Tableau url={active[1].hyperlink} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
{
  /* <header className="App-header">
        {data
          .filter((_, idx) => idx !== 0)
          .map(({ values }) => (
            <div>{parse(values[1].formattedValue)}</div>
          ))}
      </header> */
}
