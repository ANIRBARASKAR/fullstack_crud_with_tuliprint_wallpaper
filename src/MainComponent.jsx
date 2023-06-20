import React, { useEffect, useRef, useState } from "react";
import Canvas from "./modules/Canvas";
import SideBar from "./modules/SideBar";
import { Container, Row } from "react-bootstrap";
import { fabric } from "fabric";
import axios from "axios";
const MainComponent = () => {
  const [canvas, setCanvas] = useState(null);
  const rotatecanvas = useRef();
  const divRef = useRef(null);

  //const[url, setUrl]=useState('https://uzia27.sg-host.com/wp-json/custom-fabric-designer/v1/designing')
  const [termUrl, settermUrl] = useState("https://uzia27.sg-host.com/");
  const [url, setUrl] = useState(
    "https://wtp10.developmentstagingserver.com/wp-json/custom-fabric-designer/v1/designing"
  );
  // *************
  const [productData, setproductData] = useState(null);
  const [fabricData, setfabricData] = useState(null);
  const [fabricDataC, setfabricDataC] = useState(null);
  const [fabricSize, setfabricSize] = useState([]);
  const [fabricName, setfabricName] = useState(null);
  const [amount, setamount] = useState(null);
  const [inputValue, setinputValue] = useState();
  const [basic1, setbasic1] = useState();
  const [ruler, setruler] = useState(true);
  const [overlayImg, setoverLayImg] = useState(null);
  const [designSize, setdesignSize] = useState(5);
  const [angle, setangle] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  /***** State for pattern *****/

  const [basic, setBasic] = useState(false);
  const [halfDrop, sethalfDrop] = useState(false);
  const [halfBrick, sethalfBrick] = useState(false);
  const [mirror, setmirror] = useState(false);
  const [center, setCenter] = useState(false);
  const [overLay, setOverlay] = useState(false);
  const [overLayImg, setOverlayImg] = useState(null);
  const [preImg, setPrevImg] = useState(null);
  const [file, setFile] = useState();
  const [overflowCss, setOverflowCss] = useState("auto");
  const [cwidth, setCwidth] = useState(null);
  const [cheight, setCheight] = useState(null);
  const [fabricSizeName, setFabricSizeName] = useState(null);
  const [fabricId, setfabricId] = useState(null);
  const [oldDesignSize, setOldDesignSize] = useState(null);
  const [fabricSizeSelected, setSelectedFabricSize] = useState(null);
  const [imgDpi, setimgDpi] = useState(72.23);
  const [originalDpi, setOriginalDpi] = useState(72.23);
  const [originalImagWidth, setOriginalImageWidth] = useState(800);

  useEffect(() => {
    let metadata = document
      .querySelector("meta[name='product_id']")
      .getAttribute("content");

    axios.post(url, { source: "product", product_id: metadata }).then((res) => {
      //console.log(res,'Image response');
      setproductData(res?.data?.productData);
      setfabricName("Alphabric");
      // setfabricName(fabricData?.title);
      setamount(fabricData?.price);
      setfabricData(res?.data?.productData?.cfd__pf_febric);
      setfabricName(res?.data?.productData?.cfd__pf_febric[0]?.title);
      setamount(res?.data?.productData?.cfd__pf_febric[0]?.price);
      setfabricId(res?.data?.productData?.cfd__pf_febric[0]?.id);
      setFile(res?.data?.productData?.CFD_img_high_resolution);
      setdesignSize(res?.data?.productData?.cfd__pf_deisgn_size[1]?.value);
      setSelectedFabricSize(
        res?.data?.productData?.cfd__pf_deisgn_size[0]?.key
      );
      setFabricSizeName(res?.data?.productData?.cfd__pf_deisgn_size[0]?.key);
      setinputValue(res?.data?.productData?.CFD_img_high_resolution);
      // setamount(res?.data?.productData?.cfd__pf_febric[0]?.price);
      console.log("res",res);
      setfabricDataC(() => {
        axios
          .post(url, {
            source: "febric",
            febric_id: res?.data?.productData?.cfd__pf_febric[0]?.id,
          })
          .then((resp) => {
            setfabricSize(resp?.data?.febricData?.cfd_febric_size);
            setamount(resp?.data?.febricData?.cfd_febric_size[0]?.price);
          });
      });
    });
  }, []);

  return (
    <div>
      <Container className="main_Section">
        <Row style={{ display: "flex" }}>
          <Canvas
            canvas={canvas}
            setCanvas={setCanvas}
            productData={productData}
            fabricData={fabricData}
            setfabricData={setfabricData}
            fabricSize={fabricSize}
            setfabricSize={setfabricSize}
            fabricName={fabricName}
            setfabricName={setfabricName}
            amount={amount}
            setamount={setamount}
            url={url}
            setdesignSize={setdesignSize}
            designSize={designSize}
            angle={angle}
            setangle={setangle}
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            /***** State for pattern *****/

            basic={basic}
            setBasic={setBasic}
            halfDrop={halfDrop}
            sethalfDrop={sethalfDrop}
            halfBrick={halfBrick}
            sethalfBrick={sethalfBrick}
            mirror={mirror}
            setmirror={setmirror}
            center={center}
            setCenter={setCenter}
            overLay={overLay}
            setOverlay={setOverlay}
            overLayImg={overLayImg}
            setOverlayImg={setOverlayImg}
            preImg={preImg}
            overflowCss={overflowCss}
            setOverflowCss={setOverflowCss}
            cwidth={cwidth}
            setCwidth={setCwidth}
            cheight={cheight}
            setCheight={setCheight}
            fabricId={fabricId}
            setfabricId={setfabricId}
            divRef={divRef}
            oldDesignSize={oldDesignSize}
            setOldDesignSize={setOldDesignSize}
            originalDpi={originalDpi}
            setOriginalDpi={setOriginalDpi}
            imgDpi={imgDpi}
            setimgDpi={setimgDpi}
            originalImagWidth={originalImagWidth}
            setOriginalImageWidth={setOriginalImageWidth}
          />

          <SideBar
            canvas={canvas}
            setCanvas={setCanvas}
            rotatecanvas={rotatecanvas.current}
            productData={productData}
            fabricData={fabricData}
            setfabricData={setfabricData}
            fabricSize={fabricSize}
            setfabricSize={setfabricSize}
            fabricName={fabricName}
            setfabricName={setfabricName}
            amount={amount}
            setamount={setamount}
            url={url}
            setdesignSize={setdesignSize}
            designSize={designSize}
            angle={angle}
            setangle={setangle}
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            oldDesignSize={oldDesignSize}
            setOldDesignSize={setOldDesignSize}
            /***** State for pattern *****/

            basic={basic}
            setBasic={setBasic}
            halfDrop={halfDrop}
            sethalfDrop={sethalfDrop}
            halfBrick={halfBrick}
            sethalfBrick={sethalfBrick}
            mirror={mirror}
            setmirror={setmirror}
            center={center}
            setCenter={setCenter}
            overLay={overLay}
            setOverlay={setOverlay}
            overLayImg={overLayImg}
            setOverlayImg={setOverlayImg}
            setPrevImg={setPrevImg}
            file={file}
            setFile={setFile}
            overflowCss={overflowCss}
            setOverflowCss={setOverflowCss}
            cwidth={cwidth}
            setCwidth={setCwidth}
            cheight={cheight}
            setCheight={setCheight}
            fabricSizeName={fabricSizeName}
            setFabricSizeName={setFabricSizeName}
            fabricId={fabricId}
            setfabricId={setfabricId}
            divRef={divRef}
            fabricSizeSelected={fabricSizeSelected}
            setSelectedFabricSize={setSelectedFabricSize}
            originalDpi={originalDpi}
            setOriginalDpi={setOriginalDpi}
            imgDpi={imgDpi}
            setimgDpi={setimgDpi}
            originalImagWidth={originalImagWidth}
            setOriginalImageWidth={setOriginalImageWidth}
            termUrl={termUrl}
          />
        </Row>
      </Container>
    </div>
  );
};

export default MainComponent;
