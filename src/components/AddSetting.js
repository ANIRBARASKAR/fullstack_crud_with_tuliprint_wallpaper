import React from "react";
import { useFormik } from "formik";
import axios from "axios"
import * as yup from "yup";
export default function AddSetting() {
  const formik = useFormik({
    initialValues: {
      productName: "anir",
      avtar: "anir@gmail.com",
      price: "123",
    },
    validationSchema: yup.object({
      productName: yup.string().required("Please Entre your first name "),
      avtar: yup.string().required("Please Entre your avtar ID"),
      price: yup
        .string()
        .required("Please  Entre The price "),
       
     
    }),
    onSubmit: async (values, { resetForm }) => {
      const postData = await axios.post('http://localhost:5002/api/add',values)

      console.log(values);

      const getData = await axios.get('http://localhost:5002/api/get')
      console.log("getdata",getData);
      resetForm();
    },
  });
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header text-center bg-warning">Add Product</div>
              <div className="card-body ">
                <form onSubmit={formik.handleSubmit}>
                  {" "}
                  <div>
                    <label for="name" className="form-label">
                    Product name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.productName && formik.touched.productName
                          ? "form-control is-invalid"
                          : "form-control "
                      }
                      id="name"
                      value={formik.values.productName}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.productName}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label for="avtar" className="form-label">
                      {" "}
                      avtar
                    </label>
                    <input
                      type="text"
                      name="avtar"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.avtar && formik.touched.avtar
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="avtar"
                      value={formik.values.avtar}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.avtar}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label for="price" className="form-label">
                      price
                    </label>
                    <input
                      type="text"
                      name="price"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.price && formik.touched.price
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="price"
                      value={formik.values.price}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      {formik.errors.price}
                    </div>
                  </div>
                 
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                 Add Product
                  </button>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
