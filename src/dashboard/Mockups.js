import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AppContaxt } from "../App";
export default function Mockups() {
  const navigate = useNavigate();

  const { updateMockUp, setupdateMockUp } = useContext(AppContaxt);
  const [mockupData, setmockupData] = useState([]);
  const [alpha, setalpha] = useState();
  const [name, setname] = useState();
  const [file1, setfile1] = useState();
  const [status, setstatus] = useState();

  const getMockUpData = async () => {
    const getData = await axios.get("http://localhost:5002/api/mockup/get");
    console.log("getData from mockups", getData);
    setmockupData(getData.data.result.result);
  };

  const handlePostData = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("mockuptitle", name);
    fd.append("mockupstatus", status);
    fd.append("avtar", file1);

    const postData = await axios.post(
      "http://localhost:5002/api/mockup/add",
      fd
    );
    console.log("postData from mockups", postData);
    getMockUpData();
    setname("");
    setfile1("");
    setstatus("");
  };

  const deleteAllMockups = async () => {
    await axios.delete("http://localhost:5002/api/mockup/deleteAllMockups");
    getMockUpData();
  };

  const handleUpdate = (item) => {
    navigate("/updateMockup");
    setupdateMockUp(item);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5002/api/mockup/delete/${id}`);
    getMockUpData();
  };

  useEffect(() => {
    getMockUpData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Mockups</h1>

      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className="card">
              <div className="card-header text-center bg-dark text-light fs-3">
                Mockup
              </div>
              <div className="card-body ">
                <form>
                  <div>
                    <label for="name" className="form-label">
                      Title
                    </label>

                    <input
                      type="text"
                      name="mockuptitle"
                      onChange={(e) => setname(e.target.value)}
                      className={"form-control"}
                      id="mockuptitle"
                      value={name}
                    />

                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback"></div>
                  </div>
                  {/* ************* Enable Patterns */}
                  <div className="my-3">
                    <div class="form-check form-switch  ">
                      <label
                        // class="form-check-label"
                        className="form-label"
                        for="flexSwitchCheckChecked"
                      >
                        Image Upload
                      </label>
                      {/* <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/> */}
                      <input
                        type="file"
                        name="mockupavtar"
                        onChange={(e) => setfile1(e.target.files[0])}
                        className={"form-control"}
                        id="mockuptitle"
                      />
                    </div>
                    {/* ********** */}

                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">invalid-feedback</div>
                  </div>
                  {/* ********** mockupstatus */}
                  <div className="mt-2">
                    <label for="mockupstatus" className="form-label">
                      Status
                    </label>
                    <input
                      type="text"
                      name="mockupstatus"
                      onChange={(e) => setstatus(e.target.value)}
                      className={"form-control"}
                      id="mockupstatus"
                      value={status}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">mockupstatus</div>
                  </div>

                  <button
                    onClick={handlePostData}
                    className="btn btn-primary w-100 mt-3"
                  >
                    Add Mockup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          {mockupData.length >= 2 && (
            <button onClick={deleteAllMockups} className="btn btn-dark my-2">
              Delete All Mockups
            </button>
          )}
        </div>
        <div className="row">
          {mockupData.map((item, i) => (
            <div className="col-sm-4" key={i}>
              <div className="card text-center  ">
                <h3 className="mt-2 card-header"> {item.mockuptitle}</h3>
                <img
                  src={`http://localhost:5002/${item.avtar}`}
                  className="img-fluid"
                  alt=""
                  height={100}
                />  
                <div className="card-footer">
                  Status : {item.mockupstatus}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-dark "
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-dark "
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
