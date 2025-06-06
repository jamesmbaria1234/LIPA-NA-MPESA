import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import { API_URL } from "../utills/Config";
import "./App.css";

function App() {
  const [loading, SetIsLoading] = useState(false)
  const [Error, setError] = useState(null)
  const formik = useFormik({
    initialValues: { phone: "", amount: "" },
    onSubmit: async function (values) {
      // console.log("Sending data:", values);
      try {
        SetIsLoading(true)
        
       const response= await axios.post(`${API_URL}api/stkPush`, {
          phoneNumber: String(values.phone), 
          amount: String(values.amount),
          
          
        }, {
          headers: { "Content-Type": "application/json" },
        });
        
        
        // console.log("frontend response",response);
        toast.success("Payment request sent successfully");
      } catch (error) {
        
        toast.error('Something went wrong ⚠️')
        // console.error("Error submitting form:", error.message);
     
      }finally{
        SetIsLoading(false) 
        setError(null)}
    },
    validate: function (values) {
      const errors = {};
      if (!values.phone) {
        errors.phone = "Phone is required";
      } else if (!/^2547\d{8}$/.test(values.phone)) {
        errors.phone = "Enter a valid Safaricom number (e.g., 2547123....)";
      }
      if (!values.amount) {
        errors.amount = "Amount is required";
      } else if (values.amount < 1) {
        errors.amount = "Amount must be at least 1 Ksh";
      }
      return errors;
    },
  });

  return (
    <div className="app">
       <ToastContainer />
      
      <form onSubmit={formik.handleSubmit}>
        <p>lipa na mpesa</p>
        <p>neuro-core innovators africa</p>         
        <div className="inputs">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your phone number"
          />
          {formik.touched.phone && formik.errors.phone && <p className="errors">{formik.errors.phone}</p>}
        </div>
        <div className="inputs">
          <label>Amount </label>
          <input
            type="number"
            name="amount"
            value={formik.values.amount}
            placeholder="Enter Amount in Ksh"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min="1"
          />
          {formik.touched.amount && formik.errors.amount && <p className="errors">{formik.errors.amount}</p>}
        </div>
        <div className="inputs">
          <button type="submit" disabled={loading}>{loading? "Loading..":"Submit"}</button>
        </div>
       
        {Error && <p className="errors">Error: {Error}</p>}

        <p className="copy-right"> copyright &copy;  James Mbaria 2025 . <br /> All rights reserved.</p>
      </form>
      
    </div>
  );
}

export default App;
