import React, { useState } from "react";

export default function Setting() {
  const [enablePattern, setenablePattern] = useState("on");
  const [uploadImage, setuploadImage] = useState(true);
  return (
    <div>
      <h3>Settings</h3>
      <br />
      <br />
      <div className="d-flex">
        <strong>Measurement Unit : </strong>

        <select
          class="form-select w-50 mx-3"
          aria-label="Default select example"
        >
          <option value="1">CM</option>
          <option value="2">MM</option>
          <option value="3">Meters</option>
          <option value="4">Ft</option>
          <option value="5">Yards</option>
        </select>
      </div>
      <br />
      <br />
      <div className="d-flex">
        <strong>Enable Patterns :</strong>{" "}
        <span class="form-check form-switch  mx-3">
          <input
            class="form-check-input p-2"
            value={enablePattern}
            onChange={() => setenablePattern("off")}
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          {/* <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label> */}
        </span>
      </div>
      <br />
      <br />
      <strong>DPI : 72 </strong>
      <br />
      <br />
      <div className="d-flex">
      <strong>Currency : </strong>
     
<select class="form-select w-50 mx-3" aria-label="Default select example">
 <option value="1">USD</option>
 <option value="2">EURO</option>
 <option value="3">Rupees</option>
 
</select>
      </div>
      <br />
      <br />
      <div className="d-flex">
        <strong>Allow Upload Image :</strong>{" "}
        <span class="form-check form-switch  mx-3">
          <input
            class="form-check-input p-2"
            value={enablePattern}
            onChange={() => setenablePattern("off")}
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          {/* <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label> */}
        </span>
      </div>
    </div>
  );
}
