import React, { useRef, useEffect } from "react";
import "../App.css";
import { Resizable } from "re-resizable";
import moment from "moment";
function RightComponent(props) {
  const {
    selectedBlogData,
    setDeleteDataID,
    openModal,
    title,
  } = props;
  const divRef = useRef();
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  };

  const resizableStyle = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    background: "rgb(240 240 240 / 24%)",
    padding: "10px",
    textAlign: "center",
  };
  return (
    <div ref={divRef} style={containerStyle}>
      <Resizable
        style={resizableStyle}
        defaultSize={{
          height: 500,
          width: divRef.current ? divRef.current.clientWidth : "",
        }}
      >
        <div style={{ fontSize: "20px" }}>{title}</div>

        <div className="header-details">
          <div className="title-details-container">
            <span style={{ fontWeight: "500" }}>Title</span>
            <span style={{ fontSize: "25px", fontWeight: "600" }}>
              {selectedBlogData.title}
            </span>
          </div>
          <div className="author-details-container">
            <span style={{ fontWeight: "500" }}>Author</span>
            <span>{selectedBlogData.author}</span>
          </div>
        </div>
        <div className="blog-content">
          <p>{selectedBlogData.content}</p>
          <div>{`createdAt : ${moment(selectedBlogData.createdAt).format(
            "DD-MM-YYYY HH:mm:ss A"
          )}`}</div>
        </div>
        <div className="update-delete-blog">
          <button
            onClick={(e) => openModal(e, "Update")}
            style={{ background: "teal" }}
          >
            Update
          </button>
          <button
            onClick={() => setDeleteDataID(selectedBlogData._id)}
            style={{ background: "red" }}
          >
            Delete
          </button>
        </div>
      </Resizable>
    </div>
  );
}

export default RightComponent;
