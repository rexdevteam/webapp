import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './newtrip.css'

import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";


function Newtrip() {


  const formik = useFormik({
    initialValues: {
      destination: '',
      datetogo: '',
      datetoreturn: '',
      amount: '',
    },
    validationSchema: Yup.object({
      destination: Yup.string()
        .required('Destination is required'),
      datetogo: Yup.date()
        .required('Departure date is required'),
      datetoreturn: Yup.date()
        .required('Return date is required')
        .min(Yup.ref('datetogo'), 'Return date cannot be before departure date'),
      amount: Yup.number()
        .required('Budget is required')
        .positive('Budget must be a positive number'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div id="Addtrip">
      <PageHead title={"Add New Trip"} />

      <form className="form-control" onSubmit={formik.handleSubmit}>
        <section className="form-sec">
          <div>
            <label htmlFor="destination">To</label>
            <br />
            <br />
            <i class="bx bxs-plane-land bx-land"></i>
            <input
              type="text"
              id="destination"
              name="destination"
              className="int"
              placeholder="Enter a destinaton"
              value={formik.values.destination}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.destination && formik.errors.destination ? (
              <p className="err">{formik.errors.destination}</p>
            ) : null}
          </div>
          <br />

          <div className="fligh-date">
            <div>
              <label htmlFor="datetogo">Departure</label>
              <br />
              <input
                type="date"
                name="datetogo"
                id="datetogo"
                onChange={formik.handleChange}
                value={formik.values.datetogo}
                onBlur={formik.handleBlur}
                className="ints"
              />
              {formik.touched.datetogo && formik.errors.datetogo ? (
                <p className="err">{formik.errors.datetogo}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="datetoreturn">Return </label>
              <br />
              <input
                type="date"
                id="datetoreturn"
                name="datetoreturn"
                value={formik.values.datetoreturn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="ints"
              />
              {formik.touched.datetoreturn && formik.errors.datetoreturn ? (
                <p className="err">{formik.errors.datetoreturn}</p>
              ) : null}
            </div>
          </div>
          <br />

          <div>
            <label htmlFor="amount">Budget for Trip</label>
            <br />
            <input
              type="number"
              id="amount"
              name="amount"
              value={formik.values.amount}
              className="int"
              placeholder="Enter your Budget"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <p className="err">{formik.errors.amount}</p>
            ) : null}
          </div>


          <button type='submit'>Submit</button>
        </section>
      </form>
    </div>
  );
}

export default Newtrip;
