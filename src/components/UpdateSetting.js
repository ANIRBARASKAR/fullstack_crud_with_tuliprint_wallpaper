import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { AppContaxt } from "../App";
export default function UpdateSetting() {
  const params = useParams();
  const navigate = useNavigate();

  const { updatedValue_, setupdatedValue_ } = useContext(AppContaxt);

  //   console.log("updatedValue_ from UpdateSetting",updatedValue_);
  const [updateingSetting, setupdateingSetting] = useState([]);
  const [enablePattern, setenablePattern] = useState(true);

  // *******************
  const formik = useFormik({
    initialValues: {
      measurementunit: updatedValue_?.measurementunit,
      enablepatterns: updatedValue_?.enablepatterns,
      resolutiondpi: updatedValue_?.resolutiondpi,
      currency: updatedValue_?.currency,
      allowuploadimage: updatedValue_?.allowuploadimage,
    },
    validationSchema: yup.object({
      measurementunit: yup
        .string()
        .required("Please Entre your  Measurement Unit "),
      enablepatterns: yup
        .string()
        .required("Please Entre your enablepatterns ID"),
      resolutiondpi: yup.string().required("Please  Entre The resolutiondpi "),
      currency: yup.string().required("Please  Entre The currency "),
      allowuploadimage: yup
        .string()
        .required("Please  Entre The allowuploadimage "),
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log("updatedValue_._id",updatedValue_._id);

      if (updatedValue_._id) {
        console.log(" updated 🤘🤘 values", values);
        const updateData = await axios.put(
          `http://localhost:5002/api/setting/update/${updatedValue_._id}`,
          values
        );
        console.log("updatedData", updateData);

        //   const getData = await axios.get("http://localhost:5002/api/get");
        //   console.log("getData", getData.data.result.result);
        //   setsettingData(getData.data.result.result);
        resetForm();
        navigate("/setting");
      }
    },
  });
  // *******************

  return (
    <div>
      UpdateSetting
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header text-center bg-dark text-light fs-3">
                Update Settings
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
                  <div className="mt-2">
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
                        // value={enablePattern}
                        value={formik.values.enablepatterns}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onChange={() => {
                        //   setenablePattern(!enablePattern);
                        // }}
                        type="checkbox"
                        id="enablepatterns"
                      />
                    </div>
                    {/* ********** */}
                    {/* <label for="enablepatterns" className="form-label">
                      {" "}
                      Enable Patterns
                    </label> */}
                    {/* <input
                      type="text"
                      name="enablepatterns"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.enablepatterns &&
                        formik.touched.enablepatterns
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="enablepatterns"
                      value={formik.values.enablepatterns}
                    /> */}
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
                      currency
                    </label>
                    <select
                      aria-label="Default select example"
                      name="currency"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.currency && formik.touched.currency
                          ? "form-select is-invalid"
                          : "form-select "
                      }
                      id="name"
                      value={formik.values.currency}
                    >
                      <option selected>Open this select Currency</option>
                      <option value="USD">USD</option>
                      <option value="Rupees">Rupees</option>
                      <option value="EURO">EURO</option>
                    </select>
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
      </div>
    </div>
  );
}
