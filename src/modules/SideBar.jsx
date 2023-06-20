import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import rotate from "../assets/images/rotate.png";
import CanvasTest from "./CanvasTest";
import FabricOptions from "./FabricOptions";
import arrow from "../assets/images/arrow.png";
import upload from "../assets/images/upload.png";
import mirrorImg from "../assets/images/mirror.png";
import touchscreen from "../assets/images/touchscreen.png";
import cart from "../assets/images/cart.png";
// import loader from '../../public/loader.gif'
import { fabric } from "fabric";
import axios from "axios";
export default function SideBar(props) {
  const colorCanvasRef = useRef(null);

  const {
    canvas,
    setCanvas,
    rotatecanvas,

    productData,
    fabricData,
    setfabricData,
    fabricSize,
    setfabricSize,
    fabricName,
    setfabricName,
    amount,
    setamount,
    url,
    setdesignSize,
    designSize,
    isFetching,
    setIsFetching,

    /***** State for pattern *****/

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
    overLay,
    setOverlay,
    overLayImg,
    setOverlayImg,
    setPrevImg,
    file,
    setFile,
    overflowCss,
    setOverflowCss,
    cwidth,
    setCwidth,
    cheight,
    setCheight,
    fabricSizeName,
    setFabricSizeName,
    fabricId,
    setfabricId,
    divRef,
    oldDesignSize,
    setOldDesignSize,
    fabricSizeSelected,
    setSelectedFabricSize,
    originalDpi,
    setOriginalDpi,
    imgDpi,
    setimgDpi,
    originalImagWidth,
    setOriginalImageWidth,
    termUrl,
  } = props;
  const [qty, setqty] = useState(1);

  const [pattern, setPattern] = useState(null);

  const [term, setTerm] = useState(null);
  const [termCss, settermCss] = useState("none");
  const [amountCss, setamountCss] = useState("none");
  const [dpiColor, setDpiColor] = useState(null);

  const [svgColor, setsvgColor] = useState([]);
  const [alpha, setalpha] = useState(false);
  /**********Image DPI ***********/

  useEffect(() => {
    if (imgDpi > 150) {
      setDpiColor("green");
    } else {
      setDpiColor("red");
    }
  }, [imgDpi]);

  /****************useEffect for terms validation **************/
  useEffect(() => {
    if (term == false) {
      settermCss("block");
    } else {
      settermCss("none");
    }
  }, [term]);

  /**************************** Useeffect for initail run ********/

  useEffect(() => {
    if (file != null && designSize != null) {
      handleBasicpattern();
      setPrevImg(file);
    }
  }, []);

  /********************** Useeffect for file change ********/

  useEffect(() => {
    if (file != null && designSize != null) {
      handleBasicpattern();
      setPrevImg(file);
    }
  }, [file]);
  
  /********** Use effect for rotate *******/

  useEffect(() => {
    if (basic) {
      handleBasicpattern();
    } else if (halfBrick) {
      handleHalfBrick();
    } else if (halfDrop) {
      handleHalfdrop();
    } else if (mirror) {
      handleMirror();
    } else if (center) {
      handleCenter();
    } else {
    }
  }, [angle]);

  /********** Use effect for size *******/

  useEffect(() => {
    if (basic) {
      handleBasicpattern();
    } else if (halfBrick) {
      handleHalfBrick();
    } else if (halfDrop) {
      handleHalfdrop();
    } else if (mirror) {
      handleMirror();
    } else if (center) {
      handleCenter();
    } else {
    }
  }, [designSize]);

  function handleChange(e) {
    //    setIsFetching(true);

    //       axios.post(url, { source: "overlay_image", overlay: e.target.files[0] },
    //             { headers: { "Content-Type": "multipart/form-data" } }
    //         )
    //             .then(res => {

    //                 if (res?.data) {

    //                     // setinputValue(res?.data?.image_url)
    //                  setOriginalImageWidth(res.data?.width);

    //                     setFile(res?.data?.image_url);
    //                     if(res?.data?.image_url!=null){
    //                         setIsFetching(false);
    //                     }
    //                     setPrevImg(res?.data?.image_url);
    //                     setimgDpi(res?.data?.image_dpi[0]);
    //                 }

    //             })

    setOriginalImageWidth(300);

    if (e.target.files[0] != null) {
      setIsFetching(false);
    }
    setFile(URL.createObjectURL(e.target.files[0]));
    setPrevImg(URL.createObjectURL(e.target.files[0]));
    setimgDpi(72);
    setOriginalDpi(72);
    setalpha(!alpha);
  }

  const [show, setShow] = useState(false);

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [isActive, setIsActive] = useState(false);

  const handleClick1 = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  const [isActiveNew, setIsActiveNew] = useState(false);
  const handleClick2 = () => {
    // 👇️ toggle
    setIsActiveNew((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  /********* Code for functionality  ************/
  const [pImg, setpImg] = useState();

  const handleBasicpattern = () => {
    // debugger;
    var img = new fabric.Image.fromURL(file, function (img) {
      // fabric.loadSVGFromURL(file, function (objects) {
      //     var img = new fabric.Group(objects, {
      //       left: 0,
      //       top: 0,

      //     //   selected: true,
      //     });

      /********** Code for image rotate and size ********/
      canvas.getObjects()?.forEach(function (obj) {
        canvas.remove(obj);
      });
   
      var w = img.width; 
      var h = img.height;
      var newWidth = (h / w) * designSize;
      // console.log(
      //   "from handleBasicPattern",
      //   "w",
      //   w,
      //   "h",
      //   h,
      //   "newWidth",
      //   newWidth
      // );

      img.set({
        scaleX: img.scaleX * (designSize / img.width),
        // scaleY: img.scaleY * (newWidth / img.height),
        scaleY: img.scaleY * (designSize / img.width),
        originY: "top",
        originX: "left",
      });
      console.log(" 🥳🥳img.scaleX", img.scaleX, "img.scaleY", img.scaleY);

      if (originalImagWidth == 0) {
        var i = new Image();
        i.src = file;
        i.onload = function () {
          setOriginalImageWidth(i.width);
        };
      }

      if (overLay == false) {
        setimgDpi(((originalDpi * originalImagWidth) / newWidth).toFixed(2));
      }

      var patternSourceCanvas = new fabric.StaticCanvas("s");

      patternSourceCanvas.backgroundColor = "transparent";

      img.crossOrigin = "Anonymous";
      // console.log("img basic pattern patternSourceCanvas", img);
      patternSourceCanvas.add(img);

      patternSourceCanvas.renderAll();

      if (patternSourceCanvas._objects[0]) {
        var patternImgWidth = Math.floor(
          patternSourceCanvas._objects[0].getScaledWidth()
        );
        var patternImgHeight = Math.floor(
          patternSourceCanvas._objects[0].getScaledHeight()
        );
        if (angle == 90 || angle == 270) {
          patternSourceCanvas.setWidth(patternImgHeight);
          patternSourceCanvas.setHeight(patternImgWidth);
        } else {
          patternSourceCanvas.setWidth(patternImgWidth);
          patternSourceCanvas.setHeight(patternImgHeight);
        }
        if (angle > 0) {
          patternSourceCanvas._objects[0].rotate(angle);
          patternSourceCanvas?.viewportCenterObject(
            patternSourceCanvas._objects[0]
          );
        }
        //console.log(img.left , patternSourceCanvas._objects[0].left)

        patternSourceCanvas.renderAll();
        var newImg = patternSourceCanvas.toDataURL({
          format: "png",
          multiplier: 1.0,
          cropY: true,
          cropY: true,
        });
        //console.log(newImg);
        //   var n=URL.createObjectURL(newImg);console.log(n);

        var pWidth = 0;
        if (img.angle == 90 || img.angle == 270) {
          pWidth = patternImgWidth;
          patternImgWidth = patternImgHeight;
          patternImgHeight = pWidth;
        }
      }

      var patternImg = new Image();
      patternImg.src = newImg;
      var pattern;
      patternImg.onload = function () {
        patternSourceCanvas.clear();

        pattern = new fabric.Pattern({
          source: patternImg,

          repeat: "repeat",
          // offsetX: -10, // Shift the pattern 10px to the left
          // offsetY: -10 ,// Shift the pattern 10px to the top
          patternTransform: [1, 0, 0, 1, 0, 0],
        });

        setpImg(newImg);

        if (patternImg.src == "") {
          setTimeout(10000);
          //console.log(patternImg);
        }

        var canvas_row = Math.ceil(canvas.width / patternImgWidth);

        patternImgHeight = Math.floor(patternImgHeight);
        var row_width = 0;
        var newImage = [];
        console.log("canvas_row",canvas_row, "pattern",pattern , "patternImgHeight",patternImgHeight , "");

        for (var i = 0; i < canvas_row; i++) {
          // console.log("😂😂 patternImgWidth " ,patternImgWidth , "height: canvas.height,",canvas.height , "fill ",pattern); 
          // console.log("i",i, "canvas.height",canvas.height);
          var rect = new fabric.Rect({
            id: "pattern1",
            width: patternImgWidth,
            height: canvas.height,
            //height:patternImgHeight*Math.ceil(canvas.height / patternImgHeight),
            fill: pattern,
            // left: i!=0?row_width-6:row_width,
            left: row_width,
            top: 0,

            // offsetX:0,
            // offsetY:0,
            objectCaching: false,
            // originY: "top",
            angle: 0,
          });
console.log("i",i,"rect",rect);
          newImage.push(rect);

          row_width = row_width + patternImgWidth - 1;
          //console.log(row_width);
        }

        console.log("newImage",newImage);

        // const rect=new fabric.Rect({
        //       width: canvas.width,
        //       height: canvas.height,
        //       fill:pattern,
        //       offsetX:0,
        //       offsetY:-10,
        //       objectCaching:false,
        //       //originY:-10
        // })

        //    const rect=new fabric.Rect({
        //            width:patternImgWidth,
        //            height:patternImgHeight,
        //            fill:pattern,
        //            left:0,
        //            top:0
        //    })

        /********** Code end for image pattern********/
        // canvas.setBackgroundColor(pattern, function() {

        //     canvas.renderAll();
        //   });
        //  canvas?.add(rect);
        canvas?.add.apply(canvas, newImage);
        canvas.spacing = 0;
        canvas?.requestRenderAll(); 
        setPattern("Basic");
        sethalfBrick(false);
        sethalfDrop(false);
        setCenter(false);
        setmirror(false);
        setBasic(true);

        console.log("canvas from basicPattern ", canvas);
      };

      /********** Code end for image rotate and size ********/
      /********** Code for image pattern********/
    });
  };

  const handleHalfdrop = () => {

    if (colorCanvasRef.current._objects[0]._objects) {
      setsvgColor(colorCanvasRef.current._objects[0]._objects);
    } else {
      setsvgColor(colorCanvasRef.current._objects);
    }
     
    var img = new fabric.Image.fromURL(file, function (img) {
      var mirrorImg = fabric.util.object.clone(img);

      /********** Code for image rotate and size ********/
      canvas.getObjects()?.forEach(function (obj) {
        canvas.remove(obj);
      });

      var w = img.width;
      var h = img.height;
      var newWidth = (h / w) * designSize;
      img.set({
        angle: angle,
        scaleX: img.scaleX * (designSize / img.width),
        scaleY: img.scaleY * (newWidth / img.height),
      });

      if (originalImagWidth == 0) {
        var i = new Image();
        i.src = file;
        i.onload = function () {
          setOriginalImageWidth(i.width);
        };
      }
      if (overLay == false) {
        setimgDpi(((originalDpi * originalImagWidth) / newWidth).toFixed(2));
      }
      var patternSourceCanvas = new fabric.StaticCanvas("s");
      patternSourceCanvas.backgroundColor = "tranprent";
      patternSourceCanvas.renderAll();
      patternSourceCanvas.add(img);

      if (patternSourceCanvas._objects[0]) {
        var patternImgWidth = patternSourceCanvas._objects[0].getScaledWidth();
        var patternImgHeight =
          patternSourceCanvas._objects[0].getScaledHeight();
        if (angle == 90 || angle == 270) {
          patternSourceCanvas.setWidth(patternImgHeight);
          patternSourceCanvas.setHeight(patternImgWidth);
        } else {
          patternSourceCanvas.setWidth(patternImgWidth);
          patternSourceCanvas.setHeight(patternImgHeight);
        }
        if (angle > 0) {
          patternSourceCanvas._objects[0].rotate(angle);
          patternSourceCanvas?.viewportCenterObject(
            patternSourceCanvas._objects[0]
          );
          patternSourceCanvas?.requestRenderAll();
        }

        var newImg = patternSourceCanvas.toDataURL({ format: "png" });
      }

      if (img.angle == 90 || img.angle == 270) {
        var pwidth = patternImgWidth;
        patternImgWidth = patternImgHeight;
      }

      var patternImg = new Image();
      patternImg.src = newImg;
      var pattern;

      if (patternImg.src == "") {
        setTimeout(2000);
        //console.log(patternImg);
      }

      /********** Code end for image rotate and size ********/
      patternImg.onload = function () {
        var pattern1 = new fabric.Pattern({
          source: patternImg,
          offsetX: 0,
          offsetY: 0,
          repeat: "repeat",
        });

        if (angle == 90 || angle == 270) {
          var pHeight = patternImgHeight;
          patternImgHeight = pwidth;
        }

        var pattern2 = new fabric.Pattern({
          source: patternImg,
          offsetX: 0,
          offsetY: patternImgHeight / 2,

          repeat: "repeat",
        });

        //console.log(pattern1, pattern2);
        var canvas_row = Math.ceil(canvas.width / patternImgWidth);
        var row_width = 0;
        var newImage = [];

        for (var i = 0; i < canvas_row; i++) {
          var rect1 = new fabric.Rect({
            id: "pattern1",
            width: patternImgWidth + 5,
            height: canvas.height,
            fill: pattern1,
            left: i == 0 ? 0 : row_width - 5,
            top: 0,
            objectCaching: true,
          });

          newImage.push(rect1);

          row_width = row_width + patternImgWidth;
          var rect2 = new fabric.Rect({
            id: "pattern2",
            width: patternImgWidth + 5,
            height: canvas.height,
            fill: pattern2,
            left: row_width - 5,
            top: 0,
            objectCaching: true,
          });
          newImage.push(rect2);
          row_width = row_width + patternImgWidth;
        }

        canvas?.add.apply(canvas, newImage);
        canvas?.requestRenderAll();
        setPattern("Halfdrop");
        sethalfBrick(false);
        setCenter(false);
        setmirror(false);
        setBasic(false);
        sethalfDrop(true);
      };
    });
  };

  const handleHalfBrick = () => {
    var img = new fabric.Image.fromURL(file, function (img) {
      // fabric.loadSVGFromURL(file, function (objects) {
      //     var img = new fabric.Group(objects, {
      //       left: 0,
      //       top: 0,

      //     //   selected: true,
      //     });
      var mirrorImg = fabric.util.object.clone(img);

      /********** Code for image rotate and size ********/
      canvas.getObjects()?.forEach(function (obj) {
        canvas.remove(obj);
      });

      var w = img.width;
      var h = img.height;
      var newWidth = (h / w) * designSize;

      img.set({
        angle: angle,
        scaleX: img.scaleX * (designSize / img.width),
        scaleY: img.scaleY * (newWidth / img.height),
      });

      if (originalImagWidth == 0) {
        var i = new Image();
        i.src = file;
        i.onload = function () {
          setOriginalImageWidth(i.width);
        };
      }

      if (overLay == false) {
        setimgDpi(((originalDpi * originalImagWidth) / newWidth).toFixed(2));
      }
      var patternSourceCanvas = new fabric.StaticCanvas("s");
      patternSourceCanvas.backgroundColor = "tranprent";
      patternSourceCanvas.renderAll();
      patternSourceCanvas.add(img);

      if (patternSourceCanvas._objects[0]) {
        var patternImgWidth = patternSourceCanvas._objects[0].getScaledWidth();
        var patternImgHeight =
          patternSourceCanvas._objects[0].getScaledHeight();
        if (angle == 90 || angle == 270) {
          patternSourceCanvas.setWidth(patternImgHeight);
          patternSourceCanvas.setHeight(patternImgWidth);
        } else {
          patternSourceCanvas.setWidth(patternImgWidth);
          patternSourceCanvas.setHeight(patternImgHeight);
        }
        if (angle > 0) {
          patternSourceCanvas._objects[0].rotate(angle);
          patternSourceCanvas?.viewportCenterObject(
            patternSourceCanvas._objects[0]
          );
          patternSourceCanvas?.requestRenderAll();
        }
        var newImg = patternSourceCanvas.toDataURL({ format: "png" });
      }

      if (img.angle == 90 || img.angle == 270) {
        var pwidth = patternImgWidth;
        patternImgWidth = patternImgHeight;
      }

      var patternImg = new Image();

      patternImg.src = newImg;

      patternImg.onload = function () {
        if (patternImg.src == "") {
          setTimeout(2000);
          //console.log(patternImg);
        }
        /********** Code end for image rotate and size ********/
        var pattern1 = new fabric.Pattern({
          source: patternImg,
          offsetX: 0,
          offsetY: 0,
          repeat: "repeat-x",
        });

        var pattern2 = new fabric.Pattern({
          source: patternImg,
          offsetX: patternImgWidth / 2,
          offsetY: 0,

          repeat: "repeat-x",
        });

        var canvas_row = Math.ceil(canvas.height / patternImgHeight);
        // console.log(canvas_row , 'no of rows in canvas')
        var row_width = 0;
        var newImage = [];

        if (img.angle == 90 || img.angle == 270) {
          var pheight = patternImgHeight;

          // console.log('in halfbrick  if angle 90 and 270')
          patternImgHeight = pwidth;
        }

        for (var i = 0; i < canvas_row; i++) {
          var rect1 = new fabric.Rect({
            id: "pattern1",
            width: canvas.width,
            height: patternImgHeight,
            fill: pattern1,
            left: 0,
            top: i == 0 ? 0 : row_width,
            objectCaching: true,
          });

          newImage.push(rect1);

          row_width = row_width + patternImgHeight - 5;
          var rect2 = new fabric.Rect({
            id: "pattern2",
            width: canvas.width,
            height: patternImgHeight,
            fill: pattern2,
            left: 0,
            top: row_width,
            objectCaching: true,
          });
          newImage.push(rect2);
          row_width = row_width + patternImgHeight - 5;
        }

        canvas?.add.apply(canvas, newImage);
        canvas?.requestRenderAll();
        setPattern("Halfbrick");
        setCenter(false);
        setmirror(false);
        setBasic(false);
        sethalfDrop(false);
        sethalfBrick(true);
      };
    });
  };

  const handleMirror = () => {
    var img = new fabric.Image.fromURL(file, function (img) {
      // fabric.loadSVGFromURL(file, function (objects) {
      //     var img = new fabric.Group(objects, {
      //       left: 0,
      //       top: 0,

      //     //   selected: true,
      //     });
      var mirrorImg = fabric.util.object.clone(img);

      /********** Code for image rotate and size ********/
      canvas.getObjects()?.forEach(function (obj) {
        canvas.remove(obj);
      });
      var w = img.width;
      var h = img.height;
      var newWidth = (h / w) * designSize;
      img.set({
        angle: angle,
        scaleX: img.scaleX * (designSize / img.width),
        scaleY: img.scaleY * (newWidth / img.height),
      });

      if (originalImagWidth == 0) {
        var i = new Image();
        i.src = file;
        i.onload = function () {
          setOriginalImageWidth(i.width);
        };
      }

      if (overLay == false) {
        setimgDpi(((originalDpi * originalImagWidth) / newWidth).toFixed(2));
      }
      var patternSourceCanvas = new fabric.StaticCanvas("s");
      patternSourceCanvas.backgroundColor = "tranprent";
      patternSourceCanvas.renderAll();
      patternSourceCanvas.add(img);

      if (patternSourceCanvas._objects[0]) {
        var patternImgWidth = patternSourceCanvas._objects[0].getScaledWidth();
        var patternImgHeight =
          patternSourceCanvas._objects[0].getScaledHeight();
        if (angle == 90 || angle == 270) {
          patternSourceCanvas.setWidth(patternImgHeight);
          patternSourceCanvas.setHeight(patternImgWidth);
        } else {
          patternSourceCanvas.setWidth(patternImgWidth);
          patternSourceCanvas.setHeight(patternImgHeight);
        }
        if (angle > 0) {
          patternSourceCanvas._objects[0].rotate(angle);
          patternSourceCanvas?.viewportCenterObject(
            patternSourceCanvas._objects[0]
          );
          patternSourceCanvas?.requestRenderAll();
        }
        var newImg = patternSourceCanvas.toDataURL({ format: "png" });
      }

      if (img.angle == 90 || img.angle == 270) {
        patternImgWidth = patternImgHeight;
      }

      var patternImg = new Image();
      patternImg.src = newImg;
      patternImg.onload = function () {
        if (patternImg.src == "") {
          setTimeout(2000);
          //console.log(patternImg);
        }
        /********** Code end for image rotate and size ********/
        var pattern1 = new fabric.Pattern({
          source: patternImg,
          offsetX: 0,
          offsetY: 0,
          repeat: "repeat-x",
        });

        var pattern2 = new fabric.Pattern({
          source: patternImg,
          offsetX: 0,
          offsetY: 0,

          repeat: "repeat-x",
        });

        if (overLay) {
          var canvas_row = Math.ceil(canvas.width / 2 / patternImgWidth);
          var canvas_col = Math.ceil(canvas.height / 2 / patternImgHeight);
        } else {
          var canvas_row = Math.ceil(canvas.width / patternImgWidth);
          var canvas_col = Math.ceil(canvas.height / patternImgHeight);
        }

        // console.log(canvas_row,canvas_col);

        var newImage = [];
        var col_width = 0;

        // for (var i = 0; i < canvas_row; i++) {

        //     var rect1 = new fabric.Rect({
        //         id: 'pattern1',
        //         width: patternImgWidth,
        //         height: canvas.height,
        //         fill: pattern1,
        //         left: i == 0 ? 0 : row_width,
        //         top: 0,
        //         objectCaching: true
        //     })

        //     newImage.push(rect1);

        //     row_width = row_width + patternImgWidth
        //     var rect2 = new fabric.Rect({
        //         id: 'pattern2',
        //         width: patternImgWidth,
        //         height: canvas.height,
        //         fill: pattern2,
        //         left: row_width,
        //         top: 0,
        //         flipX: true,
        //         objectCaching: true
        //     })
        //     newImage.push(rect2);
        //     row_width = row_width + patternImgWidth

        // }

        // for (var i = 0; i < canvas_row; i++) {
        //     var row_width = 0;
        //    for(var j=0 ; j< canvas_col;j++){
        //         var rect1 = new fabric.Rect({
        //             id: 'pattern1',
        //             width: patternImgWidth,
        //             height: patternImgHeight,
        //             fill: pattern1,
        //             left: j == 0 ? 0 : row_width,
        //             top: i==0?0:col_width,
        //             objectCaching: true,
        //             flipY:i%2!=0?true:false

        //         })

        //         newImage.push(rect1);

        //         row_width = row_width + patternImgWidth-5
        //         var rect2 = new fabric.Rect({
        //             id: 'pattern2',
        //             width: patternImgWidth,
        //             height:patternImgHeight,
        //             fill: pattern2,
        //             left: row_width,
        //             top: i==0?0:col_width,
        //             flipX: true,
        //             objectCaching: true,
        //             flipY:i%2!=0?true:false
        //         })
        //         newImage.push(rect2);
        //         row_width = row_width + patternImgWidth-5

        //     }

        //     col_width=col_width+patternImgHeight-5;
        // }

        // var status=true;
        // for (var i = 0; i < canvas_row; i++) {
        //     var row_width = 0;
        //    for(var j=0 ; j< canvas_col;j++){
        //         var rect1 = new fabric.Rect({
        //             id: 'pattern1',
        //             width: patternImgWidth,
        //             height: patternImgHeight,
        //             fill: pattern1,
        //             left: j == 0 ? 0 : row_width,
        //             top: i==0?0:col_width,
        //             objectCaching: true,
        //             flipX:j%2!=0?status:!status,
        //             flipY:i%2!=0?true:false

        //         })

        //         newImage.push(rect1);
        //         row_width = row_width + patternImgWidth-5

        //     }

        //     col_width=col_width+patternImgHeight-5;
        // }

        var status = true;
        for (var i = 0; i < canvas_row; i++) {
          var row_width = 0;
          for (var j = 0; j < canvas_col; j++) {
            var rect1 = new fabric.Rect({
              id: "pattern1",
              width: patternImgWidth,
              height: patternImgHeight,
              fill: pattern1,
              left: j == 0 ? 0 : row_width,
              top: i == 0 ? 0 : col_width,
              objectCaching: true,
              flipX: j % 2 != 0 ? status : !status,
              flipY: i % 2 != 0 ? true : false,
            });

            newImage.push(rect1);
            row_width = row_width + patternImgWidth - 5;
          }

          col_width = col_width + patternImgHeight - 5;
        }

        canvas?.add.apply(canvas, newImage);
        canvas?.requestRenderAll();
        setPattern("Mirror");
        setCenter(false);
        setBasic(false);
        sethalfDrop(false);
        sethalfBrick(false);
        setmirror(true);
      };
    });
  };

  const handleFabricSizename = (e) => {
    // console.log(e);
  };

  const handleCenter = () => {
    var img = new fabric.Image.fromURL(file, function (img) {
      canvas.getObjects()?.forEach(function (obj) {
        canvas.remove(obj);
      });

      var w = img.width;
      var h = img.height;
      var newWidth = (h / w) * designSize;
      img.set({
        angle: angle,
        scaleX: img.scaleX * (designSize / img.width),
        scaleY: img.scaleY * (newWidth / img.height),
      });

      if (overLay == false) {
        setimgDpi(((originalDpi * originalImagWidth) / newWidth).toFixed(2));
      }
      var patternSourceCanvas = new fabric.StaticCanvas();
      patternSourceCanvas.add(img);

      if (patternSourceCanvas._objects[0]) {
        var patternImgWidth = patternSourceCanvas._objects[0].getScaledWidth();
        var patternImgHeight =
          patternSourceCanvas._objects[0].getScaledHeight();
        var newImg = patternSourceCanvas._objects[0].toDataURL({
          format: "png",
        });
      }

      if (img.angle == 90 || img.angle == 270) {
        var pwidth = patternImgWidth;
        patternImgWidth = patternImgHeight;
      }

      var patternImg = new Image();
      patternImg.src = newImg;
      patternImg.onload = function () {
        if (patternImg.src == "") {
          setTimeout(2000);
          //console.log(patternImg);
        }

        /********** Code end for image rotate and size ********/
        /********** Code for image pattern********/
        var pattern = new fabric.Pattern({
          source: patternImg,

          //repeat: 'repeat-none'
        });

        if (img.angle == 90 || img.angle == 270) {
          var pheight = patternImgHeight;
          patternImgHeight = pwidth;
        }

        var rect = new fabric.Rect({
          width: patternImgWidth,
          height: patternImgHeight,
          fill: pattern,

          // left: canvas.width/2,
          // top: canvas.height/2
        });
        canvas.viewportCenterObject(rect);
        canvas.add(rect);
        canvas.requestRenderAll();
        setPattern("Center");
        setmirror(false);
        setBasic(false);
        sethalfDrop(false);
        sethalfBrick(false);
        setCenter(true);
      };
    });
  };

  const handleaAddtoCart = () => {
    if (term) {
      settermCss("none");

      if (amount == 0) {
        setamountCss("block");
      } else {
        setIsFetching(true);

        setamountCss("none");

        canvas.setOverlayImage(null, canvas?.renderAll.bind(canvas));

        var canvasImg = canvas.toDataURL({ format: "png", quality: 4 });

        canvas.setWidth(cwidth);
        canvas.setHeight(cheight);
        setOverflowCss("auto");

        var product_id = document
          .querySelector("meta[name='product_id']")
          .getAttribute("content");
        //console.log('prooduct_id' ,product_id , 'file',file ,'pattern',pattern ,'fabric_id',fabricId ,'fabricSizeName',fabricSizeName , 'fabricName',fabricName ,'amount', amount ,'qty', qty ,'fabricSizeSelected',fabricSizeSelected ,'canvasImg', canvasImg);
        axios
          .post(url, {
            source: "addToCart",
            product_id: product_id,
            raw_image: file,
            pattern_type: pattern,
            fabric_id: fabricId,
            fabric_size: fabricSizeName,
            fabricName: fabricName,
            amount: amount,
            quantity: qty,
            design_size: fabricSizeSelected,
            canvas_img: canvasImg,
          })
          .then((res) => {
            // if (res?.data) { setIsFetching(false) }
            setTimeout(function () {
              setIsFetching(false);
            }, 4000);
            window.location.replace(res?.data?.redirect);
          });
      }
    } else {
      settermCss("block");
    }
  };

  const handleDesignSize = (e, dkey) => {
    setSelectedFabricSize(dkey);

    // console.log("overLay from handleDesignSize",overLay  );
    if (overLay) {
      setOldDesignSize(e);
      setdesignSize(e / 8);
    } else {
      setdesignSize(e);
    }
  };

  const handleAngle = (e) => {
    if (angle >= 360) {
      setangle(0);
    } else {
      setangle(e);
    }
  };
 
  useLayoutEffect(() => {
    const colorCanvas = new fabric.Canvas("colorCanvas");
 
    colorCanvasRef.current = colorCanvas;
    colorCanvasRef.current.remove();

    if (file && colorCanvasRef.current) {
      // debugger
      fabric.loadSVGFromURL(file, function (objects, options) {
        var svg = fabric.util.groupSVGElements(objects, options);

        // console.log("objects",objects , "svg",svg);
        const canvasWidth = colorCanvasRef.current.width;
        const canvasHeight = colorCanvasRef.current.height;

        const scaleFactor = Math.min(
          canvasWidth / svg.width,
          canvasHeight / svg.height
        );

        const scaledWidth = svg.width * scaleFactor;
        const scaledHeight = svg.height * scaleFactor;

        svg.scaleToWidth(scaledWidth);
        svg.scaleToHeight(scaledHeight);

        colorCanvasRef.current.add(svg);
        colorCanvasRef.current.setActiveObject(svg);

        colorCanvasRef.current.renderAll();

        // console.log(
        //   "colorCanvasRef.current 🎉🎉",
        //   colorCanvasRef.current._objects[0].fill
        // );
        if (colorCanvasRef.current._objects[0]._objects) {
          setsvgColor(colorCanvasRef.current._objects[0]._objects);
        } else {
          setsvgColor(colorCanvasRef.current._objects);
        }
      });
    }

    return () => {
      colorCanvasRef.current.dispose();
    };
  }, [alpha]);

  const handleImageChangeColor = (targetcolor, i) => {
    //console.log(targetcolor , id);
    // debugger
    if (colorCanvasRef.current.getActiveObject()._objects) {
      colorCanvasRef.current
        .getActiveObject()
        ._objects[i].set("fill", targetcolor);
      colorCanvasRef.current.requestRenderAll();
    } else {
      colorCanvasRef.current.getActiveObject().set("fill", targetcolor);
      colorCanvasRef.current.requestRenderAll();
    }

    // Export the canvas as an SVG image using toDataURL()
    const svgData = colorCanvasRef.current.toDataURL({
      format: "png",
      multiplier: 1.0,
      cropY: true,
      cropY: true,
    });
    setFile(svgData);
    // setFile(URL.createObjectURL(e.target.files[0]));
    // setPrevImg(svgData);
    // setimgDpi(72);
    // setOriginalDpi(72);
  };

  return (
    <>
      <Col xs={12} lg={4} className="mainRightSection">
        {isFetching == true ? (
          <div
            className=""
            style={{
              position: "fixed",
              top: 0,
              textAlign: "center",
              zIndex: 10000,
              opacity: 0.8,
              backgroundColor: "white",
              height: "100%",
              width: "100%",
              left: 0,
            }}
          >
            <div className="loaderFoR_allSec">
              <div className="Ineer_loaerSec">
                <img
                  src={window.location.origin + "/img/loader.gif"}
                  alt="loading..."
                  className="loader_img"
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div>
          <h4>{productData?.product_name}</h4>
          {/* <h2>Add Image:</h2>
                    <input type="file" className="btnFinalUp" onChange={handleChange} /> */}

          <div className="selectuploade_sec">
            {productData?.CFD_upload_design_enable == "1" ? (
              <div className="col-sm-6 designUploadSec" style={{ padding: 0 }}>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img src={upload} alt="" />
                  <span> Upload Design</span>
                </label>
                {/* <input id="file-upload" type="file" className='upload_sec'  onChange={handleChange} /> */}
                <input
                  id="file-upload"
                  type="file"
                  className="upload_sec"
                  accept="image/svg+xml"
                  onChange={handleChange}
                />
              </div>
            ) : (
              <></>
            )}
            {productData?.CFD_select_design == "1" ? (
              <div
                className="select_btn col-sm-6 designSelctSec"
                style={{ padding: "0px 0 0 10px" }}
              >
                <Button href={productData?.select_design_url}>
                  <img src={touchscreen} alt="" />
                  <span> Select Design</span>{" "}
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>

          <span> {productData?.short_description}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {productData?.CFD_display_thumblime_enable == "1" ? (
              <img src={file} className="prieveiwImg_sec" />
            ) : (
              <></>
            )}
            {/* <div style={{
                            display: 'flex', border: `solid 3px ${dpiColor}`, width: '200px', flexDirection: 'column',
                            alignItems: 'center', color: dpiColor
                        }}>
                            <h3 style={{
                                color: dpiColor, marginBottom: 0, fontSize: 28,
                                fontWeight: 700
                            }}>DPI  :{Math.floor(imgDpi)}</h3>
                            <span style={{
                                fontSize: 16,
                                margin: 0,
                                textAlign: 'center'
                            }}>Print File Resolution</span>
                        </div> */}
          </div>
          <br />
          <div className="row">
            {svgColor?.map((item, i) => {
              {
                /* console.log("i", i, "item", item.fill); */
              }
              return (
                <div
                  className=" card col-2 p-2 mx-3 my-1"
                  style={{ backgroundColor: `${item?.fill}` }}
                >
                  {" "}
                  <input
                    type="color"
                    key={i}
                    value={`${item?.fill}`}
                    style={{ backgroundColor: `${item?.fill}` }}
                    onChange={(e) => {
                      handleImageChangeColor(e.target.value, i);
                    }}
                  />{" "}
                </div>
              );
            })}
          </div>
          <div className="designSize_Main Sec">
            <h4 className="designSize_textValue">Design Size</h4>
            <div className="sizeDesign_option">
              {productData?.cfd__pf_deisgn_size.map((d, i) => {
                {
                  /* console.log("d.key", d.key); */
                  {/* {console.log(d.key + " " + productData?.cfd_unit)} */}
                }
                return (
                  <input
                    type="button"
                    value={d.key + " " + productData?.cfd_unit}
                    style={{
                      border:
                        fabricSizeSelected == d?.key ? "solid 2px black" : "",
                      fontWeight: fabricSizeSelected == d?.key ? "bold" : "",
                    }}
                    onClick={() => {
                      handleDesignSize(d.value, d.key);
                    }}
                    key={i}
                  />
                );
              })}
            </div>
          </div>

          <div className="Pattern_MainSec">
            <h4 className="designSize_text">Arrangment</h4>

            <Row>
              <Col sm={6}>
                <button
                  className="rotate_newText"
                  style={{
                    backgroundColor: isActiveNew ? "#d1c3c329" : "",
                  }}
                  onClick={() => {
                    handleAngle(angle + 90);
                  }}
                >
                  <img
                    style={{
                      width: 23,
                      marginRight: 5,
                    }}
                    src={rotate}
                  />
                  Rotate Pattern
                </button>
              </Col>
              <Col sm={6}>
                <button
                  className="pattern_newText"
                  onClick={() => {
                    handleClick();
                    handleClick1();
                  }}
                >
                  Pattern Type
                  <img
                    style={{
                      width: 15,
                      marginLeft: 5,
                      height: 15,
                    }}
                    src={arrow}
                  />
                </button>
              </Col>
              <Col sm={12}>
                {/* 👇️ show elements on click */}
                {isShown &&
                  (productData?.CFD_pattern_type_enable == 1 ? (
                    <ul className="PatternType_outer">
                      {productData?.CFD_pattern_basic_enable == 1 ? (
                        <li className="">
                          <a
                            rel="fg_img_repeat"
                            layout="tile"
                            onClick={() => {
                              handleBasicpattern();
                            }}
                          >
                            <img
                              src="https://www.texindiamart.com/fabric-generator/layout_repeat.png"
                              alt=""
                              style={{
                                border:
                                  pattern == "Basic" ? "1px solid black" : "",
                              }}
                            />
                          </a>
                          <h6>Basic</h6>
                        </li>
                      ) : (
                        <></>
                      )}
                      {productData?.CFD_pattern_halfdrop_enable == 1 ? (
                        <li className="">
                          <a
                            rel="fg_img_repeat"
                            layout="tile"
                            onClick={() => {
                              handleHalfdrop();
                            }}
                          >
                            <img
                              src=" https://www.texindiamart.com/fabric-generator/layout_vert.png"
                              alt=""
                              style={{
                                border:
                                  pattern == "Halfdrop"
                                    ? "1px solid black"
                                    : "",
                              }}
                            />
                          </a>
                          <h6>Half-drop</h6>
                        </li>
                      ) : (
                        <></>
                      )}
                      {productData?.CFD_pattern_halfbrick_enable == 1 ? (
                        <li className="">
                          <a
                            rel="fg_img_repeat"
                            layout="tile"
                            onClick={() => {
                              handleHalfBrick();
                            }}
                          >
                            <img
                              src=" https://www.texindiamart.com/fabric-generator/layout_brick.png "
                              alt=""
                              style={{
                                border:
                                  pattern == "Halfbrick"
                                    ? "1px solid black"
                                    : "",
                              }}
                            />
                          </a>
                          <h6>Half-brick</h6>
                        </li>
                      ) : (
                        <></>
                      )}
                      {productData?.CFD_pattern_center_enable == 1 ? (
                        <li className="">
                          <a
                            rel="fg_img_repeat"
                            layout="tile"
                            onClick={() => {
                              handleCenter();
                            }}
                          >
                            <img
                              src="  https://www.texindiamart.com/fabric-generator/layout_center.png"
                              alt=""
                              style={{
                                border:
                                  pattern == "Center" ? "1px solid black" : "",
                              }}
                            />
                          </a>
                          <h6>Center</h6>
                        </li>
                      ) : (
                        <></>
                      )}
                      {productData?.CFD_pattern_mirror_enable == 1 ? (
                        <li className="">
                          <a
                            href="#"
                            rel="fg_img_repeat"
                            layout="tile"
                            onClick={() => {
                              handleMirror();
                            }}
                          >
                            <img
                              src={mirrorImg}
                              alt=""
                              style={{
                                border:
                                  pattern == "Mirror" ? "1px solid black" : "",
                              }}
                            />
                          </a>
                          <h6>Mirror</h6>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  ) : (
                    <></>
                  ))}
              </Col>
            </Row>

            {/* <Tab.Container id="left-tabs-example" defaultActiveKey="">
                            <Row>
                                <Col sm={12}>
                                    <Nav variant="pills" className="flex-row"
                                        style={{ columnGap: 10 }}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="first"
                                                className='rotate_newText'
                                                // onClick={handleClick2}
                                                style={{
                                                    backgroundColor: isActiveNew ? '#d1c3c329' : '',
                                                }} onClick={() => { handleAngle(angle + 90) }}>
                                                <img
                                                    style={{
                                                        width: 23,
                                                        marginRight: 5
                                                    }} src={rotate} />
                                                Rotate
                                                Pattern
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second"

                                                // style={{
                                                //     backgroundColor: isActive ? '#d1c3c329' : '',

                                                //     borderRadius: isActive ? '10px 10px 0px 0px' : '',
                                                //     padding: isActive ? 11 : '',
                                                //     margin: isActive ? 0 : '',
                                                //     border: isActive ? 0 : '',
                                                //     boxShadow: isActive ? '0 0px 0px 0 rgb(34 34 34 / 15%)' : '',
                                                // }}
                                                // onClick={handleClick}
                                                onClick={() => { handleClick(); handleClick1(); }}
                                            >
                                                Pattern Type
                                                <img
                                                    style={{
                                                        width: 15,
                                                        marginLeft: 5,
                                                        height: 15
                                                    }} src={arrow} />
                                            </Nav.Link>

                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={12}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            
                                            {isShown && (
                                                productData?.CFD_pattern_type_enable == 1 ?
                                                    <ul className='PatternType_outer'>
                                                        {productData?.CFD_pattern_basic_enable == 1 ?
                                                            <li class="">
                                                                <a rel="fg_img_repeat" layout="tile" onClick={() => { handleBasicpattern() }}>
                                                                    <img src="https://www.texindiamart.com/fabric-generator/layout_repeat.png" alt=""
                                                                        style={{ border: pattern == 'Basic' ? '1px solid black' : '' }} />
                                                                </a>
                                                                <h6>Basic</h6>
                                                            </li> : <></>}
                                                        {productData?.CFD_pattern_halfdrop_enable == 1 ?
                                                            <li class="">
                                                                <a rel="fg_img_repeat" layout="tile" onClick={() => { handleHalfdrop() }}>
                                                                    <img src=" https://www.texindiamart.com/fabric-generator/layout_vert.png" alt=""
                                                                        style={{ border: pattern == 'Halfdrop' ? '1px solid black' : '' }}
                                                                    />
                                                                </a>
                                                                <h6>Half-drop</h6>
                                                            </li> : <></>}
                                                        {productData?.CFD_pattern_halfbrick_enable == 1 ?
                                                            <li class="">
                                                                <a rel="fg_img_repeat" layout="tile" onClick={() => { handleHalfBrick() }}>
                                                                    <img src=" https://www.texindiamart.com/fabric-generator/layout_brick.png " alt=""
                                                                        style={{ border: pattern == 'Halfbrick' ? '1px solid black' : '' }}
                                                                    />
                                                                </a>
                                                                <h6>Half-brick</h6>
                                                            </li> : <></>}
                                                        {productData?.CFD_pattern_center_enable == 1 ?
                                                            <li class="">
                                                                <a rel="fg_img_repeat" layout="tile" onClick={() => { handleCenter() }}>
                                                                    <img src="  https://www.texindiamart.com/fabric-generator/layout_center.png" alt=""
                                                                        style={{ border: pattern == 'Center' ? '1px solid black' : '' }}
                                                                    />
                                                                </a>
                                                                <h6>Center</h6>
                                                            </li> : <></>}
                                                        {productData?.CFD_pattern_mirror_enable == 1 ?
                                                            <li class="">
                                                                <a href="#" rel="fg_img_repeat" layout="tile" onClick={() => { handleMirror() }}>
                                                                    <img src={mirrorImg} alt=""
                                                                        style={{ border: pattern == 'Mirror' ? '1px solid black' : '' }}
                                                                    />
                                                                </a>
                                                                <h6>Mirror</h6>
                                                            </li> : <></>}
                                                    </ul> : <></>)}

                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container> */}

            {/* <div className="mainSize">
                        <div className='col-sm-6'>
                            <button className='show_btnNext' onClick={handleClick}>Click</button>

                        </div>
                        <div className='col-sm-6'>
                            <button className='show_btnNext' onClick={handleClick}>Click</button>

                           
                            {isShown && (
                                <div>
                                    <h2>Some content here</h2>
                                </div>
                            )}

                       
                            {isShown && <CanvasTest />
                            }
                        </div>

                        </div> */}

            {/* <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className=""
                        >
                            <Tab eventKey="home" title="Rotate The Pattern " >

                            </Tab>
                            <Tab eventKey="profile" title=" Pattern Type">
                                <ul className='PatternType_outer'>
                                    <li class="">
                                        <a href="#" rel="fg_img_repeat" layout="tile">
                                            <img src="https://www.texindiamart.com/fabric-generator/layout_center.png" alt="" />
                                        </a>
                                        <h6>Basic</h6>
                                    </li>

                                    <li class="">
                                        <a href="#" rel="fg_img_repeat" layout="tile">
                                            <img src="https://www.texindiamart.com/fabric-generator/layout_repeat.png" alt="" />
                                        </a>
                                        <h6>Half-drop</h6>
                                    </li>
                                    <li class="">
                                        <a href="#" rel="fg_img_repeat" layout="tile">
                                            <img src="https://www.texindiamart.com/fabric-generator/layout_vert.png" alt="" />
                                        </a>
                                        <h6>Half-brick</h6>
                                    </li>
                                    <li class="">
                                        <a href="#" rel="fg_img_repeat" layout="tile">
                                            <img src="https://www.texindiamart.com/fabric-generator/layout_brick.png" alt="" />
                                        </a>
                                        <h6>Center</h6>
                                    </li>
                                    <li class="">
                                        <a href="#" rel="fg_img_repeat" layout="tile">
                                            <img src="https://www.texindiamart.com/fabric-generator/layout_repeat.png" alt="" />
                                        </a>
                                        <h6>Mirror</h6>
                                    </li>
                                </ul>
                            </Tab>
                        </Tabs> */}
          </div>

          <div className="designSize_MainSec">
            <h4 className="designSize_text">Choose a fabric</h4>
            {/* <Form.Select aria-label="Default select example">
                            <option>Select a Fabric</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>

                        </Form.Select> */}
            <Button
              className="PopUp_rightBtn"
              variant="primary"
              onClick={() => setShow(true)}
            >
              {fabricName}
            </Button>
          </div>

          <div className="FabricSize_MainSec">
            <h4 className="designSize_text">Select Size and Amount</h4>
            <div className="selectSize_section">
              {/* <input type="text" value='2' disabled /> */}
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setamount(e.target.value);
                  setFabricSizeName(e.target.selectedOptions[0].text);
                }}
              >
                <option>Select a Fabric</option>
                {fabricSize.map((c, i) => {
                  return (
                    <option
                      value={c?.price}
                      selected={i == 0 ? true : false}
                      name={c?.title}
                      key={i}
                    >
                      {c?.title}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
          <div className="prce_mainSec">
            <div className="col-sm-6 qty_sec">
              <h6>Qty</h6>
              {/* <input type="number" value='1' /> */}
              <input
                type="number"
                min={1}
                className="form-control"
                value={qty}
                onChange={(e) => setqty(e.target.value)}
              />
            </div>
            <div className="col-sm-6 price_sec">
              <span>$ {amount * qty}</span>
            </div>
            {/* <div>
                            <img src={pImg}/>
                        </div> */}
          </div>
          <p
            style={{
              fontSize: 14,
              color: "red",
              display: amountCss,
              textAlign: "center",
            }}
          >
            Amount can not be a 0
          </p>
          <div className="checFinalBtn_sec">
            <Form.Group
              className="mb-3 "
              style={{ display: "flex" }}
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label=""
                onClick={(e) => {
                  setTerm(e.target.checked);
                }}
              />
              <p>
                I have understood the{" "}
                <a href={termUrl + "/terms-and-conditions"}>
                  Terms & Conditions
                </a>
              </p>
            </Form.Group>
            <p style={{ fontSize: 14, color: "red", display: termCss }}>
              Accept our terms and conditions first
            </p>
          </div>

          <div className="AddCart_btnSec">
            <button
              variant="outline-primary"
              onClick={() => {
                handleaAddtoCart();
              }}
            >
              <span>Add To Cart</span>
              <img src={cart} alt="" />
            </button>{" "}
          </div>

          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Select Fabric
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {productData?.cfd__pf_febric.map((fabric, i) => {
                return (
                  <FabricOptions
                    fabric={fabric}
                    setfabricData={setfabricData}
                    setfabricSize={setfabricSize}
                    setfabricName={setfabricName}
                    setamount={setamount}
                    setShow={setShow}
                    url={url}
                    fabricId={fabricId}
                    setfabricId={setfabricId}
                    key={i}
                  />
                );
              })}
            </Modal.Body>
          </Modal>
        </div>
      </Col>

      <hr />
      <canvas
        id="colorCanvas"
        height={400}
        width={400}
        style={{ border: "4px dashed green", display: "none" }}
      ></canvas>
    </>
  );
}
