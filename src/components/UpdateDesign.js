import React,{useContext} from 'react'
import { AppContaxt } from '../App'



export default function UpdateDesign() {
    const {updateDesignSize, setupdateDesignSize} = useContext(AppContaxt)
   
    console.log("updateDesignSize",updateDesignSize);
  return (
    <div>UpdateDesign
    <div className="container">
        <div className="row">
            <div className="col-sm-6 offset-3">
                <div className="card">
                    <strong className='mx-2'>
                    updateDesignSize : {updateDesignSize?.designsize}
                    </strong>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}
