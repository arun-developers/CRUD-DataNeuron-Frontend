import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import RightComponent from "./components/rightComponent";
import LeftComponent from "./components/leftComponent";
import BottomComponent from "./components/bottomComponent";

function App() {
  let [apiData, setAPIData] = useState([]);
  let [selectedBlogData, setSelectedBlogData] = useState({});
  let [deleteDataID, setDeleteDataID] = useState("");
  let [selectedBlogIndex, setSelectedBlogIndex] = useState("");
  let [dataDeleted, setDataDelated] = useState(false);
  let [modalIsOpen, setIsOpen] = useState(false);
  let [requestType, setRequestType] = useState("");
  let [apiCountObj, setAPICountObj] = useState([
    { method: "GET", count: 0, path: "/product" },
    { method: "POST", count: 0, path: "/product/create" },
    { method: "PUT", count: 0, path: "/product/update" },
    { method: "DELETE", count: 0, path: "/product/delete" },
    { method: "Traffic", count: 0, path: "/requestTrafficLog" },
  ]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "65%",
      height: "80%",
    },
  };

  // get  API Traffic Count
  useEffect(() => {
    const fetchTrafficAPICount = async () => {
      try {
        const updatedCounts = await Promise.all(
          apiCountObj.map(async (api) => {
            const response = await axios.get(
              `https://crud-dataneuron-backend.onrender.com/requestTrafficLog?q=${api.path}`
            );
            return { ...api, count: response.data[0].count };
          })
        );
        setAPICountObj(updatedCounts);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchTrafficAPICount();
  }, [dataDeleted]);

  // Initially fetch all data to show list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://crud-dataneuron-backend.onrender.com/product?sort=des"
        );
        setAPIData(response.data);
        if (selectedBlogIndex) {
          setSelectedBlogData(response.data[selectedBlogIndex]);
        } else {
          setSelectedBlogData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [dataDeleted]);
  // Delete data according to specific _id
  useEffect(() => {
    const handleDeleteBlogData = async () => {
      try {
        const response = await axios.delete(
          `https://crud-dataneuron-backend.onrender.com/product/delete?uuid=${deleteDataID}`
        );
        console.log(response, "Deleted");
        setDataDelated(!dataDeleted);
        setSelectedBlogIndex(0);
      } catch (error) {
        console.log(error);
      }
    };

    if (deleteDataID !== "") {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (shouldDelete) {
        handleDeleteBlogData();
      } else {
        setDeleteDataID("");
      }
    }
  }, [deleteDataID]);

  function openModal(e, type) {
    setRequestType(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setRequestType("");
  }
  // Create and update data according to request type
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const blogDataPayload = {
      title: formData.get("title"),
      author: formData.get("author"),
      content: formData.get("content"),
      address: formData.get("address"),
      city: formData.get("city"),
      contact: formData.get("contact"),
    };
    try {
      if (requestType === "Create") {
        const response = await axios.post(
          `https://crud-dataneuron-backend.onrender.com/product/create`,
          blogDataPayload
        );
        console.log(response.data);
      }
      if (requestType === "Update") {
        const response = await axios.put(
          `https://crud-dataneuron-backend.onrender.com/product/update?uuid=${selectedBlogData._id}`,
          blogDataPayload
        );
        console.log(response.data);
      }
      closeModal();
      setDataDelated(!dataDeleted);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <div>
          <h4>API Calling</h4>
        </div>
        <div className="trafic-count">
          {apiCountObj &&
            apiCountObj.length > 0 &&
            apiCountObj.map((item, index) => (
              <p key={index}>
                {item.method} : <span>{item.count}</span>
              </p>
            ))}
        </div>
      </div>
      <div className="top-container">
        <div style={{ width: "30%" }}>
          <LeftComponent
            title="Blog Title"
            data={apiData}
            openModal={openModal}
            setSelectedBlogData={setSelectedBlogData}
            setSelectedBlogIndex={setSelectedBlogIndex}
          />
        </div>
        <div style={{ width: "70%" }}>
          <RightComponent
            title="Complete Blog Details"
            selectedBlogData={selectedBlogData}
            setDeleteDataID={setDeleteDataID}
            openModal={openModal}
          />
        </div>
      </div>
      <div className="bottom-container">
        <BottomComponent data={"Bottom Component"} />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Update Blog"
      >
        <div className="modal-content no-scrollbar">
          <span className="close-icon" onClick={closeModal}></span>
          <span style={{ fontSize: "22px", fontWeight: "500" }}>
            {requestType} item
          </span>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Title</label>
              <input
                required
                type="text"
                name="title"
                defaultValue={
                  requestType === "Create" ? "" : selectedBlogData.title
                }
              />
            </div>
            <div>
              <label>Author</label>
              <input
                required
                type="text"
                name="author"
                defaultValue={
                  requestType === "Create" ? "" : selectedBlogData.author
                }
              />
            </div>
            <div>
              <label>Content</label>
              <textarea
                required
                name="content"
                defaultValue={
                  requestType === "Create" ? "" : selectedBlogData.content
                }
              ></textarea>
            </div>
            <div>
              <label>Address</label>
              <input
                required
                type="text"
                name="address"
                defaultValue={
                  requestType === "Create" ? "" : selectedBlogData.address
                }
              />
            </div>
            <div>
              <label>City</label>
              <input
                required
                type="text"
                name="city"
                defaultValue={
                  requestType === "Create" ? "" : selectedBlogData.city
                }
              />
            </div>
            <div>
              <label>Contact</label>
              <input
                required
                type="text"
                name="contact"
                defaultValue={
                  requestType === "Create" ? "" : selectedBlogData.contact
                }
                pattern="[0-9]{10}"
                title="Please enter a 10-digit valid mobile number"
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
