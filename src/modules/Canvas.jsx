import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Col } from 'react-bootstrap'
import flo from '../assets/images/flo.jpg'
import pillow from '../assets/images/pillow.png'
import PL from '../assets/images/PL.png'
import PL1 from '../assets/images/PL1.png'
import PL2 from '../assets/images/PL2.png'
import PL3 from '../assets/images/PL3.png'
import PL4 from '../assets/images/PL4.png'
import PL5 from '../assets/images/PL5.png'
import n from '../assets/images/n.png'
import mask from '../assets/images/dress-mask.png'
import { fabric } from 'fabric';

export default function Canvas(props) {

  const { canvas, setCanvas, productData,
    basic,
    setBasic,
    halfDrop,
    sethalfDrop,
    halfBrick,
    sethalfBrick,
    mirror,
    setmirror,
    center,
    setCenter,
    angle,
    setangle,
    designSize,
    overLay,
    setOverlay,
    overLayImg,
    setOverlayImg,
    setdesignSize,
    preImg,
    overflowCss,
    setOverflowCss,
    cwidth, 
    setCwidth,
   cheight,  
   setCheight,
   oldDesignSize, 
   setOldDesignSize,
   divRef,
   originalDpi,
   setOriginalDpi,
   imgDpi,
   setimgDpi,
  } = props;
  const canvasRef = useRef(null);
  const canvas2 = useRef(null);

  const [rulerShow, setRulerShow] = useState(true);
  
  const [overlayImage , setOverlayImage]=useState(null);
  const canvasWithRuler = () => {

    var ctx2 = canvas2.current?.getContext("2d")
    drawRulers(ctx2, 37.7952755906, canvas2.current?.width, canvas2.current?.height);

    function drawRulers(t, e, n, s) {
      const i = 37.7952755906;
      // const i = 27;

      //  Ruler's  x-axis & Y-axis   grey
      var dynamicHeight = 18 * i
      var dynamicWidth = 18 * i
      t.fillStyle = "white";
      t.fillRect(i, 0, dynamicWidth, i);
      t.fillRect(0, i, i, dynamicHeight);
      t.fillStyle = "black";
      t.fillRect(0, 0, i, i);
      t.beginPath();
      t.font = "16px Lato";
      t.fillStyle = "white";
      t.textAlign = "center";
      t.fillText("cm.", i / 2, i - 15);

      let l = true;
      let c = true;

      t.fillStyle = "black";
      for (let d = 1; n >= d; d += 1) {
        const h = d * e;
        let u = `${d}`;
        if (
          (12 > n && !l) ||
          (32 > n && !l && c) ||
          (n >= 32 && d % 12 === 0)
        ) {
          t.fillText(u, h + i, i - 8);
        } else {
          t.fillText(l ? d : d, h + i, i - 8);
        }
        l = !l;
        if (!l) {
          c = !c;
        }
      }

      l = true;
      c = true;

      t.textAlign = "right";
      for (let p = 1; s >= p; p += 1) {
        const f = p * e;
        const u = `${p}`;
        if (
          (12 > s && !l) ||
          (32 > s && !l && c) ||
          (s >= 32 && p % 12 === 0)
        ) {
          t.fillText(u, i - 8, f + i);
        } else {
          t.fillText(p ? p : "\u2014", i - 8, f + i);
        }
        l = !l;
        if (!l) {
          c = !c;
        }
      }
    }
  };

  useLayoutEffect(() => {
    // console.log(window?.innerWidth ,window.innerHeight);
       var width =0;
       var height =0;
     if(window.innerWidth >768){
          width=2835;
          height=2835
     }else{
           width=605
           height=605
     }




    canvasRef.current = new fabric.StaticCanvas('canvas', { width: width, height:height, interactive: false, preserveObjectStacking: true,pixelPerfect:true,backgroundImageStretch:'none' })
    canvas2.current = new fabric.Canvas("canvas2", { width: (width + 37.7952755906), height: (height + 37.7952755906) })
    //canvasRef.current?.setInteractive(false);
    setCanvas(canvasRef.current);
    canvasWithRuler()
    setRulerShow(true)
    canvasRef.current.contextContainer.imageSmoothingEnabled = false;
    return () => {
      canvasRef.current?.dispose();
    }

  }, [])


  useEffect(() => {
    if (overLay == 1) {
      setRulerShow(false)
    } else {
      setRulerShow(true)
    }
  }, [overLay])

  // useEffect(()=>{
  //   if(overLay){
  //     if(overLayImg!=null){
  //         handleOverlay()
  //     }
  //   }
  // },[designSize , angle])

  const handleOverlay = (e) => {

     
    
      divRef.current.scrollTop=0;   
      divRef.current.scrollLeft=0;

   setCwidth(canvasRef.current?.width);
   setCheight(canvasRef.current?.height);
    fabric.Image.fromURL(e, function (img) {
      img.set({
         scaleX: canvasRef.current.getWidth() / img.width,
         scaleY: canvasRef.current.getHeight() / img.height,
        scaleX: 620/img.width,
         scaleY: 620/img.height,
        objectCaching: false,
        originX:'left',
        originY:'top',
        excludeFromExport: false
      });
      setOverlayImg(e);
      setOverflowCss('hidden');
      canvasRef.current.setOverlayImage(img, canvasRef.current.renderAll.bind(canvasRef.current));
      
      canvasRef.current.requestRenderAll();

      
      if(oldDesignSize==null){
        setOldDesignSize(designSize);
        setdesignSize(designSize/8);
      }

    }, {

      crossOrigin: 'anonymous'

    });

    setOverlay(true)

  }

  const removeOverlay = () => {
   if(overLay){ 
    canvasRef.current.setOverlayImage(null, canvasRef.current?.renderAll.bind(canvasRef.current));
    canvasRef.current?.setWidth(cwidth);
    canvasRef.current?.setHeight(cheight);
    setOverlay(false);
    setOverflowCss('auto');
    setdesignSize(oldDesignSize);
    setOldDesignSize(null);
    // setRulerShow(true);
   }
  }


  return (
    <>
      <Col xs={12} lg={8} className="MainLeftSection">
        <div className='innerLeft_sec'>
          <div className='Outer_imageSec'>
            {/* <img src={preImg !== null ? preImg : pillow} onClick={() => removeOverlay()} /> */}
            <img src={preImg} onClick={() => removeOverlay()} />
          </div>
          {productData?.cfd__pf_mock_up.map((img, i) => {
            return <div className='Outer_imageSec' key={i} style={{ backgroundImage: 'url(' + preImg + ')', backgroundSize: '20px' }}>
              <button className='left_btn' >
                <img src={img} onClick={() => { handleOverlay(img); }} />
              </button>
            </div>
          })}


        </div>
        <div className="cannvas_outer" /*style={{textAlign:'center'}}*/>
          <div className='inner_sec' ref={divRef} style={{overflow:overflowCss}}>
            <canvas id='canvas'
              style={{ border: " solid 1px black" }}
            ></canvas>
            {/* <img src={PL} /> */}


            <canvas
              id="canvas2"
              style={{
                // position: "absolute",

                // top: -38,
                // left: 141+'px',
                // right: 0

                display: rulerShow ? 'block' : 'none'
              }}
            ></canvas>

            

          </div>
        </div>

      </Col>
    </>
  )
}