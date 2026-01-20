import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMyStore from "@/zustandStore/zustandStore";
import { handleTransform } from "@/utilityFunctions/imageTransformation";
import { ChangeEvent, ReactEventHandler, useEffect, useRef } from "react";

export default function OverlayEditBar() {
  const isFirstRender = useRef<boolean>(true);
  const {
    imageLink,
    setImageLink,
    layer,
    setLayer,
    color,
    setColor,
    solidColor,
    setSolidColor,
    
  } = useMyStore() as any;

  const textRef = useRef<HTMLInputElement>(null);
  const textFontRef = useRef<HTMLSpanElement>(null);
  const LayerPosXRef = useRef<HTMLSpanElement>(null);
  const LayerPosYRef = useRef<HTMLSpanElement>(null);

  const handleTextAdd = (c: string = "black") => {
    console.log(textRef.current!.value==="")
    if (!layer || layer.includes("l-image")) {
      setLayer(
        `l-text,i-${textRef.current?.value},co-${c},fs-20,lx-20,ly-20,l-end`
      );
      return;
    }
    if(textRef.current!.value===""){
      setLayer("")
    }
    if (textRef.current!.value !== "") {
      let newTextLayer = layer.replace(
        /i-[^,]*/,
        `i-${textRef.current?.value}`
      );
      setLayer(newTextLayer);
      console.log("text:", newTextLayer);
      return;
    } 
  };

  const handleTextFont = (e:React.ChangeEvent<HTMLInputElement>)=>{
    textFontRef.current!.textContent=e.target.value
    if(!layer){
      return;
    }
    let newTextLayer = layer.replace(
      /fs-[^,]*/,
      `fs-${e.target?.value}`
    );
    setLayer(newTextLayer)
  }

  const handleTextColor = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    if(!layer){
      return;
    }
    let newTextLayer = layer.replace(
      /co-[^,]*/,
      `co-${e.target?.value}`
    );
    setLayer(newTextLayer)
  }







  const handleBlockAdd = (c: string = "000000") => {
    if(!layer || layer.includes("l-text")){
      setLayer(
        `l-image,i-ik_canvas,bg-${c},w-100,h-100,lx-20,ly-20,l-end`
      );
      return;
    }
    
      let newBlockLayer = layer.replace(/bg-[^,]*/,`bg-${c}`)
      setLayer(newBlockLayer)
    }
    
  const handleBlockWidth = (c:string="100")=>{
    if(!layer){
      return;
    }
    if(!c)c="100";
    let newLayer = layer.replace(/w-[^,]*/,`w-${c}`)
    setLayer(newLayer);
  }
  const handleBlockHeight = (c:string="100")=>{
    if(!layer){
      return;
    }
    if(!c)c="100";
    let newLayer = layer.replace(/h-[^,]*/,`h-${c}`)
    setLayer(newLayer);
  }
    
  
  const handleLayerPositionX = (c: string = layer) => {
    LayerPosXRef.current!.textContent=c
    if(!layer){
      return;
    }
   
    let newLayer = layer.replace(
      /lx-[^,]*/,`lx-${c}`
    )
    setLayer(newLayer)
    
  };
  const handleLayerPositionY = (c: string = layer) => {
    LayerPosYRef.current!.textContent=c
    if(!layer){
      return;
    }
    let newLayer = layer.replace(
      /ly-[^,]*/,`ly-${c}`
    )
    setLayer(newLayer)
    
  };
  
  

  useEffect(() => {
    console.log(layer)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    handleTransform(imageLink, setImageLink);
  }, [layer]);

  return (
    <>
      <div className="w-[100%] h-[100%]  flex flex-col items-center justify-around p-4 text-white gap-[1rem] ">
        <Accordion type="single" collapsible className="w-full  ">
          {/* <AccordionItem
            value="item-1"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Add Image</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  "></div>
            </AccordionContent>
          </AccordionItem> */}
          <AccordionItem
            value="item-2"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Add Text</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <input
                  type="text"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter text"
                  ref={textRef}
                  onChange={() => {
                    handleTextAdd();
                  }}
                />
                <div className="w-full flex flex-nowrap flex-row items-center gap-[0.5rem] ">
                  <label
                    htmlFor="fontSize"
                    className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-1 outline-none "
                  >
                    Font Size:
                  </label>
                  <input
                    type="range"
                    className="w-full text-white bg-gray-800 rounded-md  outline-none "
                    min={10}
                    max={100}
                    defaultValue={10}
                    step={1}
                    onChange={(e) => {
                      handleTextFont(e);

                    }}
                    
                  />
                  <span ref={textFontRef} className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-2 outline-none ">
                    20
                  </span>
                </div>

                <label
                  htmlFor="colorSelect"
                  className="text-white flex flex-row items-center gap-[1rem] "
                >
                  Choose a color:
                </label>
                <div className="flex flex-row items-center gap-[1rem] ">
                  <select
                    id="colorSelect"
                    name="color"
                    className=" p-2 rounded text-white bg-gray-800 outline-none flex flex-row items-center gap-[1rem] "
                    onChange={(e) => {
                      setColor(e.target.value);
                      handleTextColor(e);
                    }}
                  >
                    <option value="000000">Select Color</option>
                    <option value="FF0000">Red</option>
                    <option value="FFA500">Orange</option>
                    <option value="FFFF00">Yellow</option>
                    <option value="008000">Green</option>
                    <option value="0000FF">Blue</option>
                    <option value="4B0082">Indigo</option>
                    <option value="EE82EE">Violet</option>
                    <option value="000000">Black</option>
                    <option value="FFFFFF">White</option>
                  </select>

                  <div
                    className="w-[50px] h-[50px] rounded-md p-2 outline-1"
                    style={{ backgroundColor: `#${color}` }}
                  ></div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Add Solid Color Blocks </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem] ">
                  <select
                    id="BlockcolorSelect"
                    name="Blockcolor"
                    className=" p-2 rounded text-white bg-gray-800 outline-none flex flex-row items-center gap-[1rem] "
                    onChange={(e) => {
                      setSolidColor(e.target.value);
                      handleBlockAdd(e.target.value);
                    }}
                  >
                    <option value="000000">Select Color</option>
                    <option value="FF0000">Red</option>
                    <option value="FFA500">Orange</option>
                    <option value="FFFF00">Yellow</option>
                    <option value="008000">Green</option>
                    <option value="0000FF">Blue</option>
                    <option value="4B0082">Indigo</option>
                    <option value="EE82EE">Violet</option>
                    <option value="000000">Black</option>
                    <option value="FFFFFF">White</option>
                  </select>

                  <div
                    className="w-[50px] h-[50px] rounded-md p-2 outline-3 box-border "
                    style={{ backgroundColor: `#${solidColor}` }}
                  ></div>
                </div>
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none "
                    placeholder="Width"
                    onChange={(e) => {
                      handleBlockWidth(e.target.value)
                    }}
                  />
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none"
                    placeholder="Height"
                    onChange={(e) => {
                      handleBlockHeight(e.target.value)
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full flex flex-col items-start gap-[1rem] ">
          <div className="w-full flex flex-nowrap flex-row items-center gap-[0.5rem] ">
            <label
              htmlFor="pos-x"
              className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-1 outline-none "
            >
              Position X:
            </label>
            <input
              type="range"
              className="w-full text-white bg-gray-800 rounded-md  outline-none "
              min={0}
              max={2000}
              defaultValue={0}
              step={1}
              onChange={(e) => {
                handleLayerPositionX(e.target.value)
              }}
            />
            <span ref={LayerPosXRef} className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-2 outline-none ">
              20
            </span>
          </div>
          <div className="w-full flex flex-nowrap flex-row items-center gap-[0.5rem] ">
            <label
              htmlFor="fontSize"
              className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-1 outline-none "
            >
              Position Y:
            </label>
            <input
              type="range"
              className="w-full text-white bg-gray-800 rounded-md  outline-none "
              min={0}
              max={1100}
              defaultValue={0}
              step={1}
              onChange={(e) => {
                handleLayerPositionY(e.target.value)
              }}
            />
            <span ref={LayerPosYRef} className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-2 outline-none ">
              20
            </span>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-[2rem] ">
          <button
            className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
            onClick={() => {
              console.log("layer----",layer)
              setLayer("")
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
