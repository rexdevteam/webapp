import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./newtrip.css";

import PageHead from "../../components/page/PageHead";
import groos from "../../assets/img/gross.png";
import Schedulecal from "../../assets/img/schedule.png";
import { useState, useEffect, useRef } from "react";

function Newtrip() {
  const backendCategories = [
    "Transportation",
    "Education",
    "Rentals",
    "Taxis",
    "Others",
  ];

  const [itineraries, setItineraries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const ItineraryIndex = useRef(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      console.log("Accordion is opened");
    } else {
      console.log("Accordion is closed");
    }
  }, [isOpen]);

  useEffect(() => {
    const storedItineraries =
      JSON.parse(localStorage.getItem("itinerary")) || [];
    setItineraries(storedItineraries);
    ItineraryIndex.current = storedItineraries.length; // To keep the ID in sync with existing data
  }, []);

  // Save to localStorage whenever itineraries change
  useEffect(() => {
    if (itineraries.length > 0) {
      localStorage.setItem("itinerary", JSON.stringify(itineraries));
    }
  }, [itineraries]);

  const formik = useFormik({
    initialValues: {
      destination: "",
      datetogo: "",
      datetoreturn: "",
      budget: "",
      itineraryName: "",
      category: "",
      itineraryAmount: "",
      submittedItineraries: [], // Field to hold itineraries in Formik
    },
    validationSchema: Yup.object({
      destination: Yup.string().required("Destination is required"),
      datetogo: Yup.date().required("Departure date is required"),
      datetoreturn: Yup.date()
        .required("Return date is required")
        .min(
          Yup.ref("datetogo"),
          "Return date cannot be before departure date"
        ),
    }),
    onSubmit: (values) => {
      // Add itineraries to the Formik values object before submitting
      values.submittedItineraries = itineraries;

      // Remove itineraries from localStorage
      localStorage.removeItem("itinerary");

      // Clear the itineraries state after form submission
      setItineraries([]);

      // Proceed with form submission (now values include itineraries)
      console.log(values);
    },
  });

  const addItinerary = () => {
    ItineraryIndex.current += 1;
    const newItinerary = {
      id: ItineraryIndex.current,
      name: formik.values.itineraryName,
      category: formik.values.category,
      amount: formik.values.itineraryAmount,
    };

    if (editMode) {
      const updatedItineraries = itineraries.map((item) =>
        item.id === editId ? { ...item, ...newItinerary } : item
      );
      setItineraries(updatedItineraries);
      setEditMode(false);
      setEditId(null);
    } else {
      setItineraries([...itineraries, newItinerary]);
    }

    formik.setFieldValue("itineraryName", "");
    formik.setFieldValue("category", "");
    formik.setFieldValue("itineraryAmount", "");
  };

  const handleDelete = (id) => {
    setItineraries(itineraries.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const itineraryToEdit = itineraries.find((item) => item.id === id);
    formik.setFieldValue("itineraryName", itineraryToEdit.name);
    formik.setFieldValue("category", itineraryToEdit.category);
    formik.setFieldValue("itineraryAmount", itineraryToEdit.amount);
    setEditMode(true);
    setEditId(id);
  };



  return (
    <div id="Addtrip">
      <PageHead title="Add New Trip" />
      <form className="forms-control" onSubmit={formik.handleSubmit}>
        <section className="form-sec">
          <div className="des-amm">
            <div>
              <label htmlFor="destination">
                <b>Destination:</b>
              </label>
              <input
                type="text"
                id="destination"
                placeholder="Enter destination"
                value={formik.values.destination}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.destination && formik.errors.destination && (
                <small className="err">{formik.errors.destination}</small>
              )}
            </div>

            <div>
              <label htmlFor="budget">
                <b>Budget:</b>
              </label>
              <input
                type="number"
                id="budget"
                placeholder="Enter budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.budget && formik.errors.budget && (
                <small className="err">{formik.errors.budget}</small>
              )}
            </div>
          </div>
          <br />

          <div className="fligh-date">
            <div>
              <label htmlFor="datetogo">
                <b>Departure:</b>
              </label>
              <br />
              <input
                type="date"
                id="datetogo"
                value={formik.values.datetogo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.datetogo && formik.errors.datetogo && (
                <small className="err">{formik.errors.datetogo}</small>
              )}
            </div>

            <div>
              <label htmlFor="datetoreturn">
                <b>Return:</b>
              </label>
              <br />
              <input
                type="date"
                id="datetoreturn"
                value={formik.values.datetoreturn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.datetoreturn && formik.errors.datetoreturn && (
                <small className="err">{formik.errors.datetoreturn}</small>
              )}
            </div>
          </div>
          <br />
          <br />
          <div>
            <div className="flex-cont">
              <div>
                <h2>Add Itineraries</h2>
              </div>
              <div onClick={toggleAccordion} className="accordion-button">
                <i class="bx bx-plus bx-plus"></i>
              </div>
            </div>

            {isOpen && (
              <div className="int-form">
                <div>
                  <label htmlFor="itineraryName">
                    <b>Itinerary Name:</b>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="itineraryName"
                    placeholder="Enter intinery Name"
                    value={formik.values.itineraryName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.itineraryName &&
                    formik.errors.itineraryName && (
                      <small className="err">
                        {formik.errors.itineraryName}
                      </small>
                    )}
                </div>
                <br />
                <div className="acc-flex-2">
                  <div>
                    <label htmlFor="category">
                      <b>Category:</b>
                    </label>
                    <br />
                    <select
                      id="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Category</option>
                      {backendCategories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <small className="err">{formik.errors.category}</small>
                    )}
                  </div>

                  <div>
                    <label htmlFor="itineraryAmount">
                      <b>Amount:</b>
                    </label>
                    <br />
                    <input
                      type="number"
                      placeholder="Budget for inteneries"
                      id="itineraryAmount"
                      value={formik.values.itineraryAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.itineraryAmount &&
                      formik.errors.itineraryAmount && (
                        <small className="err">
                          {formik.errors.itineraryAmount}
                        </small>
                      )}
                  </div>
                  <br />
                </div>
                <br />
                <button className="bx-cont" type="button"  onClick={addItinerary}>
                  Add Intinery
                </button>
              </div>
            )}
          </div>
          <br />

          <div className="intin-tab">
            {itineraries.map((itinerary) => (
              <div className="init-tag" key={itinerary.id}>
                <p>
                  <b>Name:</b> {itinerary.name}
                </p>
                <p>
                  <b>Category:</b> {itinerary.category}
                </p>
                <p>
                  <b>Amount:</b> {itinerary.amount}
                </p>
                <div className="flex-but">
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(itinerary.id)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(itinerary.id)}
                    className="del"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <br />

          <button   className="submit" type="submit">
            Submit
          </button>
        </section>
      </form>
    </div>
  );
}

export default Newtrip;
