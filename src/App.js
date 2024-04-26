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
  let [dataDeleted, setDataDelated] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5500/product");
        setAPIData(response.data);
        setSelectedBlogData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [dataDeleted]);

  useEffect(() => {
    const handleDeleteBlogData = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:5500/product/delete?uuid=${deleteDataID}`
        );
        console.log(response, "Deleted");
        setDataDelated(!dataDeleted);
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedBlogData = {
      title: formData.get("title"),
      author: formData.get("author"),
      content: formData.get("content"),
      address: formData.get("address"),
      city: formData.get("city"),
      contact: formData.get("contact"),
    };
    try {
      const response = await axios.put(
        `http://localhost:5500/product/update?uuid=${selectedBlogData._id}`,
        updatedBlogData
      );
      console.log(response.data);
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
          <h3>API Calling</h3>
        </div>
        <div className="trafic-count">
          <p>
            GET : <span>1</span>
          </p>
          <p>
            POST (CREATE) : <span>1</span>
          </p>
          <p>
            PUT (UPDATE) : <span>1</span>
          </p>
          <p>
            DELETE (REMOVE) : <span>1</span>
          </p>
        </div>
      </div>
      <div className="top-container">
        <div style={{ width: "30%" }}>
          <LeftComponent
            title="Blog Title"
            data={apiData}
            setSelectedBlogData={setSelectedBlogData}
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
            Update Item
          </span>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedBlogData.title}
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                name="author"
                defaultValue={selectedBlogData.author}
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                name="content"
                defaultValue={selectedBlogData.content}
              ></textarea>
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                defaultValue={selectedBlogData.address}
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                name="city"
                defaultValue={selectedBlogData.city}
              />
            </div>
            <div>
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                defaultValue={selectedBlogData.contact}
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
