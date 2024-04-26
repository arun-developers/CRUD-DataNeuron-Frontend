import React from "react";
import { Resizable } from "re-resizable";
import "../App.css";

function LeftComponent(props) {
  const { data, title, setSelectedBlogData, setSelectedBlogIndex, openModal } =
    props;
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const resizableStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // border: "1px solid #ddd",
    background: "rgb(240 240 240 / 24%)",
    padding: "10px",
    textAlign: "center",
  };

  const bottomDivStyle = {
    background: "green",
    padding: "7px",
    color: "white",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    textAlign: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const handleSingleBlogClick = (e, selectedItem, index) => {
    e.preventDefault();
    setSelectedBlogData(selectedItem);
    setSelectedBlogIndex(index);
  };

  return (
    <div style={containerStyle}>
      <Resizable
        style={resizableStyle}
        defaultSize={{
          height: 500,
        }}
      >
        <div>{title}</div>
        <div className="side-bar-main-container no-scrollbar">
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <div
                className="side-bar-data-container"
                key={index}
                onClick={(e) => handleSingleBlogClick(e, item, index)}
              >
                <div className="title-container">
                  <span style={{ fontSize: "12px" }}>Title</span>
                  <div>{item.title}</div>
                </div>
                <div className="author-container">
                  <span style={{ fontSize: "12px" }}>Author</span>
                  <span>{item.author}</span>
                </div>
              </div>
            ))}
        </div>
        <div onClick={(e) => openModal(e, "Create")} style={bottomDivStyle}>
          Create Your New Blog
        </div>
      </Resizable>
    </div>
  );
}

export default LeftComponent;
