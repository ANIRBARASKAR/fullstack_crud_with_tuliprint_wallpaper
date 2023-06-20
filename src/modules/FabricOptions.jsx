import React, { useEffect, useState } from "react";
import axios from "axios";
const FabricOptions = (props) => {

  const [offMode, setoffMode] = useState(null)

  const getFabricData = (id) => {

    axios.post(props.url, { source: "febric", febric_id: id }).then(res => { props.setfabricData(res?.data?.febricData?.cfd_febric_size); props.setfabricName(res.data?.febricData?.title); props.setfabricSize(res.data?.febricData?.cfd_febric_size); props.setamount(res?.data?.febricData?.price); setoffMode(res?.data?.febricData) })
  }

  useEffect(() => {
    if (offMode?.id) {
      props.setShow(false);
    }
  }, [offMode])



  //  read more

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 80) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

  return (
    <>
      <div
        className="col-sm-12 row"
        style={{
          borderBottom: "1px solid #22222226",
          padding: 15,
          justifyContent: "space-between",
        }}
      >

        <div className="col-sm-6 choosenew_fabric">
          <img src={props.fabric?.fimage} style={{ width: 200, height: 200 }} />
        </div>
        <div className="col-sm-6 row">
          <h3
            style={{
              padding: 0,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {props.fabric?.title}
          </h3>
          {/* <p style={{ padding: 0, fontSize: 14, overflowWrap: 'break-word' }}>{props.fabric?.shortdesc}</p> */}

          <p style={{ padding: 0, fontSize: 14, overflowWrap: 'break-word' }}>
            <ReadMore>
              {props.fabric?.shortdesc}
            </ReadMore>
          </p>

          <span
            className="price_sec"
            style={{ color: "#cc1e6b", fontSize: 16, fontWeight: 700 }}
          >
            ${props.fabric?.price}
          </span>
          <div className='button-bottom'>
            <button
              className="btn" style={{
                width: 85, height: 35, backgroundColor: "#cc1e6b", fontSize: 14,
                color: 'white', padding: "0.275rem 0.55rem"
              }}

              onClick={() => { getFabricData(props.fabric?.id); props.setfabricId(props.fabric?.id) }}
            >
              Select
            </button>

            <a href={props.fabric?.url} className='learn_more' style={{ fontSize: 14, paddingLeft: 15 }}>Learn More</a>
          </div>
        </div>
      </div>


    </>
  );
};

export default FabricOptions;
