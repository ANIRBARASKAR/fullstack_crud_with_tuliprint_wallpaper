import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContaxt } from "../App";

export default function Materials() {
  const { updateMaterial, setupdateMaterial } = useContext(AppContaxt);
  const navigate = useNavigate();

  const [materialTitle, setmaterialTitle] = useState();
  const [materialAvtar, setmaterialAvtar] = useState();
  const [materialDesc, setmaterialDesc] = useState();
  const [materialNavigate, setmaterialNavigate] = useState();
  const [materialData, setmaterialData] = useState([]);

  const handlePostMaterialData = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("materialTitle", materialTitle);
    fd.append("materialAvtar", materialAvtar);
    fd.append("materialDesc", materialDesc);

    const postData = await axios.post(
      "http://localhost:5002/api/material/add",
      fd
    );
    console.log("postData from material", postData);
    getMaterialsData();
    setmaterialTitle("");
    setmaterialAvtar("");
    setmaterialDesc("");
    getMaterialsData();
  };

  const getMaterialsData = async () => {
    const getData = await axios.get("http://localhost:5002/api/material/get");
    console.log("getData from material", getData);
    setmaterialData(getData.data.result.result);
  };

  const handleMaterialUpdate = async (item) => {
    setupdateMaterial(item);
    navigate("/updateMaterial");
  };

  const handleMaterialDelete = async (id) => {
    await axios.delete(`http://localhost:5002/api/material/delete/${id}`);
    getMaterialsData();
  };

  const deleteAllMaterials = async () => {
    await axios.delete("http://localhost:5002/api/material/deleteAllMaterial");
    getMaterialsData();
  };

  useEffect(() => {
    getMaterialsData();
  }, []);
  useEffect(() => {
    console.log(materialData.length);
  }, [materialData]);

  return (
    <div>
      <div className="container">
        <h1 className="text-center">Materials</h1>

        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className="card">
              <div className="card-header text-center bg-dark text-light fs-3">
                Material
              </div>
              <div className="card-body ">
                <form>
                  <div>
                    <label for="name" className="form-label">
                      Materials Title
                    </label>

                    <input
                      type="text"
                      name="mockuptitle"
                      onChange={(e) => setmaterialTitle(e.target.value)}
                      className={"form-control"}
                      id="mockuptitle"
                      value={materialTitle}
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
                        Material Photo
                      </label>
                      {/* <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/> */}
                      <input
                        type="file"
                        name="mockupavtar"
                        onChange={(e) => setmaterialAvtar(e.target.files[0])}
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
                      Material Description
                    </label>
                    <textarea
                      type="text"
                      name="mockupstatus"
                      onChange={(e) => setmaterialDesc(e.target.value)}
                      className={"form-control"}
                      id="mockupstatus"
                      value={materialDesc}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">mockupstatus</div>
                  </div>

                  <button
                    onClick={handlePostMaterialData}
                    className="btn btn-primary w-100 my-4"
                  >
                    Add Material
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          {materialData.length >= 2 && (
            <button className="btn btn-dark" onClick={deleteAllMaterials}>
              Delete All Materials
            </button>
          )}
        </div>

        <div className="row">
          {materialData &&
            materialData.map((item, i) => (
              <div className="col-sm-4 my-2" key={i}>
                <div className="card">
                  <div className="card-header text-center">
                    {item.materialTitle}
                  </div>
                  <div className="card-body">
                    <img
                      src={`http://localhost:5002/${item.materialAvtar}`}
                      className="img-fluid"
                      height={100}
                      alt=""
                    />
                    <div>{item.materialDesc}</div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between my-2">
                      <button
                        className="btn btn-dark"
                        onClick={() => handleMaterialUpdate(item)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleMaterialDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
