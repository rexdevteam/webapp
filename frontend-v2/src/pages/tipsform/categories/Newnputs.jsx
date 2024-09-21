import { Formik } from "formik";
import React, { useState, useRef } from "react";
import '../Newtrip'
const backendCategories = [
  "Transportation",
  "Education",
  "Rentals",
  "Taxis",
  "Others",
];

const NewInputs = () => {
  const [ItenaryData, setItenaryData] = useState({
    category: "",
    amount: "",
    name: "",
  });
  const [Itenaries, setItenaries] = useState([]);
  const [editMode, setEditMode] = useState(false); // To track if we're editing
  const [editId, setEditId] = useState(null); // To store the id of the itinerary being edited
  const ItenaryIndex = useRef(0);

  const resetInput = () => {
    setItenaryData({ category: "", amount: "", name: "" });
    setEditMode(false); // Exit edit mode after resetting
  };

  const addfields = () => {
    if (editMode) {
      // If in edit mode, update the specific itinerary
      const updatedItenaries = Itenaries.map((item) =>
        item.id === editId
          ? {
              ...item,
              category: ItenaryData.category,
              amount: ItenaryData.amount,
              name: ItenaryData.name,
            }
          : item
      );
      setItenaries(updatedItenaries);
      resetInput();
    } else {
      // Add new itinerary
      ItenaryIndex.current += 1;
      let currentItenary = {
        id: ItenaryIndex.current,
        category: ItenaryData.category,
        amount: ItenaryData.amount,
        name: ItenaryData.name,
      };
      setItenaries([...Itenaries, currentItenary]);
      resetInput();
    }
  };

  const handleEdits = (e) => {
    setItenaryData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleDelete = (id) => {
    // Filter out the deleted itinerary
    const updatedItenaries = Itenaries.filter((item) => item.id !== id);
    setItenaries(updatedItenaries);
  };

  const handleEdit = (id) => {
    // Find the itinerary to edit
    const itineraryToEdit = Itenaries.find((item) => item.id === id);
    setItenaryData(itineraryToEdit); // Load data into the form
    setEditMode(true); // Switch to edit mode
    setEditId(id); // Save the id of the itinerary being edited
  };

  return (
    <section>
      <div>
        <div>
          <label htmlFor="name">Enter Itinerary Name</label>
          <br />
          <input
            type="text"
            id="name"
            value={ItenaryData.name}
            onChange={handleEdits}
          />
        </div>
        <br />

        <div className="flex-cat">
          <div>
            <label htmlFor="category">Add Category</label>
            <select
              id="category"
              value={ItenaryData.category}
              onChange={handleEdits}
            >
              <option value="">Select Category</option>
              {backendCategories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount">Budget</label>
            <input
              type="text"
              id="amount"
              placeholder="Enter Amount"
              onChange={handleEdits}
              value={ItenaryData.amount}
            />
          </div>

          <div className="bx-cont">
            <i onClick={addfields} className="bx bx-plus bx-plus-p">
              {/* Change button text based on mode */}
            </i>
          </div>
        </div>
      </div>

      {/* Rendering each added Itinerary below */}
      <div>
        {Itenaries.map((itinerary) => (
          <div key={itinerary.id} className="itinerary">
            <p>
              <strong>Itinerary Name:</strong> {itinerary.name}
            </p>
            <p>
              <strong>Category:</strong> {itinerary.category}
            </p>
            <p>
              <strong>Budget:</strong> {itinerary.amount}
            </p>
            <button onClick={() => handleEdit(itinerary.id)}>Edit</button>
            <button onClick={() => handleDelete(itinerary.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewInputs;
