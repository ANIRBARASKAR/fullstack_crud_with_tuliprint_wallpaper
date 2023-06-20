import React,{useContext , useState} from 'react'
import { AppContaxt } from '../App';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function UpdateMockUp() {

    const navigate = useNavigate()


    const { updateMockUp, setupdateMockUp } = useContext(AppContaxt);
    console.log("updateMockUp",updateMockUp);
    const [name, setname] = useState(updateMockUp?.mockuptitle);
  const [file1, setfile1] = useState(updateMockUp?.avtar);
  const [status, setstatus] = useState(updateMockUp?.mockupstatus);



const handleUpdateData = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("mockuptitle", name);
    fd.append("mockupstatus", status);
    fd.append("avtar", file1);

    const updateData = await axios.put(
      `http://localhost:5002/api/mockup/update/${updateMockUp._id}`,
      fd
    );
    console.log("Update Data from mockups", updateData);
    setname('')
    setfile1('')
    setstatus('')
    navigate('/mockups')
  };

  return (
    <div>

        <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className="card">
              <div className="card-header text-center bg-dark text-light  text-center fs-3">
               Update Mockup
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
                    onClick={handleUpdateData}
                    className="btn btn-primary w-100 mt-3"
                  >
                    Add Mockup
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
