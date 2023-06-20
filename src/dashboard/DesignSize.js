import React,{useState , useEffect , useContext} from 'react'
import axios from 'axios'
import { AppContaxt } from '../App'

import { useNavigate } from 'react-router-dom'
export default function DesignSize() {
  const navigate  = useNavigate()

const {updateDesignSize, setupdateDesignSize} = useContext(AppContaxt)

  const [designSizeValue, setdesignSizeValue] = useState()
  const [designSizeData, setdesignSizeData] = useState([])


  const handleAddSize = async () => {
     const addSize = await axios.post('http://localhost:5002/api/design/add',{"designsize":designSizeValue})
     console.log("addSize",addSize);

     getDesignSizeData()
  }



  const getDesignSizeData = async () => {
    const getDesignSize = await axios.get("http://localhost:5002/api/design/get")
     console.log("getDesignSize",getDesignSize);
     setdesignSizeData(getDesignSize.data.result.result)
  }

const handleUpdate = async (item) => {
setupdateDesignSize(item)
navigate('/updateDesign')
}
const handleDelete = async (id) => {
  console.log("id",id);
    const deletedData = await axios.delete(`http://localhost:5002/api/design/delete/${id}`)
    console.log("deletedData",deletedData);
    getDesignSizeData()

}

const deleteAlldesignSizeData = async () => {
  await axios.delete("http://localhost:5002/api/design/deleteAlldesignSize");
  getDesignSizeData();
}
  
  useEffect(() => {
    getDesignSizeData()
  }, [])
  
  return (
    <div>
    <h3 className='text-center'>Design Sizes</h3>
    
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className='my-3'>
           <h1> {designSizeValue}</h1>
              <label  className="form-label">Enter Design Size</label>

              <div className="d-flex">
              <input type="text" className='form-control'onChange={(e) => setdesignSizeValue(e.target.value)} placeholder='Enter Design Size' /> <button className='btn btn-dark mx-2' onClick={handleAddSize}>Add New Size</button>
          
              </div>

               </div>
          </div>
        </div>

        <hr /> 
        <div className="d-flex justify-content-end">
          {designSizeData.length >= 2 && (
            <button className="btn btn-dark" onClick={deleteAlldesignSizeData}>
              Delete All deleteAll Size's
            </button>
          )}
        </div>

        <div className="row">
         {
          designSizeData?.map((item,i) => <div className="col-sm-4 my-2 ">
               <div className="card">
               <div className="card-header text-center">
                <strong>Design Size</strong>
               </div>
                    <strong className='my-1 ms-3'>Design Size : {item?.designsize}</strong>
                      
               <div className="card-footer d-flex justify-content-between">
                <button className='btn btn-dark' onClick={() => handleUpdate(item)} >Update</button>
                <button className='btn btn-dark' onClick={() => handleDelete(item._id)} >Delete</button>
               </div>

               </div>
</div>)
         }
        </div>
        
      </div>
    </div>
  )
}
