import React, { useState,useEffect , useContext} from "react";

import { useFormik } from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import * as yup from "yup";
import { AppContaxt } from "../App";
export default function Setting() {

  const {updatedValue_ , setupdatedValue_} = useContext(AppContaxt)
  const navigate = useNavigate()

  const [enablePattern, setenablePattern] = useState(true);
  const [uploadImage, setuploadImage] = useState(true);
  const [settingData, setsettingData] = useState([]);
  const [updateData, setupdateData] = useState({})

  // ****** form Handling
  const formik = useFormik({
    initialValues: {
      measurementunit: "",
      enablepatterns: '',
      resolutiondpi: '',
      currency: "",
      allowuploadimage: "",
    },
    validationSchema: yup.object({
      measurementunit: yup
        .string()
        .required("Please Entre your  Measurement Unit "),
      enablepatterns: yup
        .boolean()
        .required("Please Choose your enablePattern"),
      resolutiondpi: yup
        .string()
        .required("Please  Entre The resolutiondpi "),
      currency: yup.string().required("Please  Entre The currency "),
      allowuploadimage: yup
        .string()
        .required("Please  Entre The allowuploadimage "),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitted");
      const postData = await axios.post(
        "http://localhost:5002/api/setting/add",
        values
      );
      console.log("postData",postData);
      resetForm();
      getSettingData()
    },
  });

  const getSettingData = async () => {
const getData = await axios.get("http://localhost:5002/api/setting/get");
    console.log("getData", getData.data.result.result);
    setsettingData(getData.data.result.result);

  }

  useEffect(  () => {
    getSettingData()
  }, [])
  
  const handleUpdate = (item) => {
    navigate('/updateSetting') 
    setupdatedValue_(item)

  }
  const handleDelete = async (id) => {
    const deleteData = await axios.delete(`http://localhost:5002/api/setting/delete/${id}`);
    console.log("getData", deleteData);
    getSettingData()
  }

  const deleteAllSettings = async () => {
    await axios.delete("http://localhost:5002/api/setting/deleteAllSettings");
    getSettingData();
  }
  return (
    <>
      
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header text-center bg-dark text-light fs-3">
                Settings
              </div>
              <div className="card-body ">
                <form onSubmit={formik.handleSubmit}>
                  {" "}
                  <div>
                    <label for="name" className="form-label">
                      Measurement Unit
                    </label>
                    {/* ************* */}

                    <select
                      aria-label="Default select example"
                      name="measurementunit"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.measurementunit &&
                        formik.touched.measurementunit
                          ? "form-select is-invalid"
                          : "form-select "
                      }
                      id="name"
                      value={formik.values.measurementunit}
                    >
                      <option selected>
                        Open this select Measurement Unit
                      </option>
                      <option value="CM">CM</option>
                      <option value="MM">MM</option>
                      <option value="Meters">Meters</option>
                      <option value="Yards">Yards</option>
                      <option value="Ft">Ft</option>
                    </select>

                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.measurementunit}
                    </div>
                  </div>
                  {/* ************* Enable Patterns */}
                  <div className="my-3">
                    <div class="form-check form-switch  ">
                      <label
                        // class="form-check-label"
                        className="form-label"
                        for="flexSwitchCheckChecked"
                      >
                        Enable Patterns
                      </label>
                      {/* <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/> */}
                      <input
                        class="form-check-input p-2"
                        className={
                        formik.errors.resolutiondpi &&
                        formik.touched.resolutiondpi
                          ? "form-check-input p-2 is-invalid"
                          : "form-check-input p-2"
                      }
                        // value={enablePattern}
                        value={formik.values.enablepatterns}

                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                      
                       
                        type="checkbox"
                        id="enablepatterns"
                      />
                    </div>
                    {/* ********** */}
                   
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.enablepatterns}
                    </div>
                  </div>
                  {/* ********** resolutiondpi */}
                  <div className="mt-2">
                    <label for="resolutiondpi" className="form-label">
                      Resolution DPI
                    </label>
                    <input
                      type="text"
                      name="resolutiondpi"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.resolutiondpi &&
                        formik.touched.resolutiondpi
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="resolutiondpi"
                      value={formik.values.resolutiondpi}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.resolutiondpi}
                    </div>
                  </div>
                  {/* ********** currency */}
                  <div className="mt-2">
                    <label for="currency" className="form-label">
                      Currency
                    </label>
                    

                    <select
                      aria-label="Default select example"
                      name="currency"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.currency &&
                        formik.touched.currency
                          ? "form-select is-invalid"
                          : "form-select "
                      }
                      id="name"
                      value={formik.values.currency}
                    >
                      <option selected>
                        Open this select Currency 
                      </option>
                      <option value="USD">USD</option>
                      <option value="Rupees">Rupees</option>
                      <option value="EURO">EURO</option>
                     
                    </select>
                    {/* ************ */}
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.currency}
                    </div>
                  </div>
                  {/* ********** allowuploadimage */}
                  <div className="mt-2">
                    <label for="allowuploadimage" className="form-label">
                      Allow Upload Image
                    </label>
                    <input
                      type="text"
                      name="allowuploadimage"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.allowuploadimage &&
                        formik.touched.allowuploadimage
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="allowuploadimage"
                      value={formik.values.allowuploadimage}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.allowuploadimage}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Add Settings
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          {settingData.length >= 2 && (
            <button className="btn btn-dark" onClick={deleteAllSettings}>
              Delete All Settings
            </button>
          )}
        </div>

        <div className="row">
          {settingData?.map((item, i) => (
            <div className="col-sm-4 my-2" key={i}>
              <div className="card px-1 mx-1">
                <strong>Measurement Unit : {item.measurementunit}</strong>
                <strong>Enabel Pattern : {item.enablepatterns ? "Yes" : "No"}</strong>
                <strong>Resolution DPI : {item.resolutiondpi}</strong>
                <strong>Currency : {item.currency}</strong> 
                <strong>Upload Img : {item.allowuploadimage}</strong>
                <div className="d-flex justify-content-between my-3 mx-2">
                  <button className="btn btn-dark"  onClick={() => { handleUpdate(item)
                  }}>Update </button>
                  {/* <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setupdateData(item)}>Update </button> */}
                  <button className="btn btn-dark" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>





        {/* ******** modal */}

       


      </div>
    </>
  );
}
