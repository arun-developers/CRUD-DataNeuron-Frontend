import React, { useRef, useEffect } from "react";
import "../App.css";
import { Resizable } from "re-resizable";

function BottomComponent(props) {
  let { data } = props;
  console.log(data, "bottommmmmmmmmmmmmmmmmmmmmmmmmmm");
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "rgb(240 240 240 / 24%)",
  };
  return (
    <div>
      <Resizable
        style={style}
        defaultSize={{
          height: 500,
        }}
      >
        {data}
      </Resizable>
    </div>
  );
}

export default BottomComponent;
