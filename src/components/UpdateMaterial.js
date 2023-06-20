import React,{useState, useContext , useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContaxt } from '../App';

export default function UpdateMaterial() {
    const {updateMaterial, setupdateMaterial} = useContext(AppContaxt)

    const navigate = useNavigate()

    const [materialTitle,setmaterialTitle] = useState(updateMaterial?.materialTitle)
    const [materialAvtar,setmaterialAvtar] = useState(updateMaterial?.materialAvtar)
    const [materialDesc, setmaterialDesc] = useState(updateMaterial?.materialDesc)
    const [materialNavigate, setmaterialNavigate] = useState()



    const handleUpdateMaterialData = async (e) => {


        e.preventDefault();
        const fd = new FormData();
        fd.append("materialTitle", materialTitle);
        fd.append("materialAvtar", materialAvtar);
        fd.append("materialDesc", materialDesc);
    
        const updateData = await axios.put(
          `http://localhost:5002/api/material/update/${updateMaterial._id}`,
          fd
        );
        console.log("Update Data from mockups", updateData);
        setmaterialTitle('')
        setmaterialAvtar('')
        setmaterialDesc('')


        setupdateMaterial('')
        navigate('/materials')
    }

    useEffect(() => {
        !updateMaterial &&   navigate('/materials')

    }, [updateMaterial])
    
  return (
    <div>
        <div className="container">
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
                    onClick={handleUpdateMaterialData}
                    className="btn btn-primary w-100 my-4"
                  >
                    Update Material
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}
