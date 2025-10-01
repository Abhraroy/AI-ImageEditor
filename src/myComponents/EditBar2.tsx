import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMyStore from "@/zustandStore/zustandStore";
import { handleTransform } from "@/utilityFunctions/utility1";
import { useEffect, useRef } from "react";

export default function EditBar2() {
  const isFirstRender = useRef<boolean>(true);
  const {
    imageLink,
    setImageLink,
    transformedImageLink,
    setTransformedImageLink,
    transFormationInstructions,
    setTransFormationInstructions,
    isTransforming,
    setIsTransforming,
    isUploading,
    setIsUploading,
    isDownloading,
    setIsDownloading,
    aspectRatio,
    width,
    height,
    imageFocus,
    setAspectRatio,
    setWidth,
    setHeight,
    setImageFocus,
    cropMode,
    setCropMode,
    zoom,
    setZoom,
    setDpr,
    dpr,
    text,
    setText,
    textFont,
    setTextFont,
    color,
    setColor,
    textPositionX,
    setTextPositionX,
    textPositionY,
    setTextPositionY,
  } = useMyStore() as any;

  const textRef = useRef<HTMLInputElement>(null);

  const handleTextAdd = (c:string="black") => {
    console.log("color:",color)
    // if(color){
    setText(`l-text,i-${textRef.current?.value},co-${c},fs-${textFont},lx-${textPositionX},ly-${textPositionY},l-end`);
    // }else{
    //   setText(`l-text,i-${textRef.current?.value},fs-${textFont},l-end`);
    // }
    console.log("text:",text)
  };

  useEffect(() => {
    // console.log("text:", text);
    // setText(`l-text,i-${text},fs-${textFont},l-end`);
    console.log("color:",color)
    console.log("text:",text)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    handleTransform(imageLink, setImageLink);
  }, [text]);
console.log("color:",color)
  return (
    <>
      <div className="w-[100%] h-[100%]  flex flex-col items-center justify-around p-4 text-white gap-[1rem] ">
        <Accordion type="single" collapsible className="w-full  ">
          <AccordionItem
            value="item-1"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Add Image</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none "
                    placeholder="Width"
                    onChange={(e) => setWidth(`w-${e.target.value}`)}
                  />
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none"
                    placeholder="Height"
                    onChange={(e) => setHeight(`h-${e.target.value}`)}
                  />
                </div>
                <span>Aspect Ratio</span>
                <select
                  name="aspectRatio"
                  id="aspectRatio"
                  className=" p-2 rounded text-white bg-gray-800 outline-none "
                >
                  <option>Custom</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="4:3">4:3 (Standard)</option>
                  <option value="3:2">3:2 (Classic Photo)</option>
                  <option value="16:9">16:9 (Widescreen)</option>
                  <option value="21:9">21:9 (Cinema)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="2.35:1">2.35:1 (Cinematic)</option>
                </select>
                <span>Crop Mode</span>
                <select
                  name="cropMode"
                  id="cropMode"
                  className=" p-2 rounded text-white bg-gray-800 outline-none "
                  onChange={(e) => setCropMode(`${e.target.value}`)}
                >
                  <option>Custom</option>
                  <option value="c-maintain_ratio">Maintain Ratio</option>
                  <option value="cm-pad_resize">Pad & Resize</option>
                  <option value="c-force">Force</option>
                  <option value="c-at_max">At max</option>
                  <option value="c-at_least">At least</option>
                  <option value="cm-extract">Extract</option>
                </select>
              </div>
            </AccordionContent>
          </AccordionItem>
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
                  onChange={()=>handleTextAdd()}
                />
                {/* <button className="bg-gray-800 rounded-md p-2 outline-none ">
                  Add Text
                </button> */}
            
                <div className="w-full flex flex-nowrap flex-row items-center gap-[0.5rem] ">
                  <label htmlFor="fontSize" className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-1 outline-none " >Font Size:</label>
                  <input
                    type="range"
                    className="w-full text-white bg-gray-800 rounded-md  outline-none "
                    min={10}
                    max={100}
                    step={1}
                    onChange={(e) => {
                      setTextFont(parseInt(e.target.value));
                      handleTextAdd();
                    }}
                  />
                    <span className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-2 outline-none " >{textFont}</span>
                </div>
                <div className="w-full flex flex-nowrap flex-row items-center gap-[0.5rem] ">
                  <label htmlFor="pos-x" className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-1 outline-none " >Position X:</label>
                  <input
                    type="range"
                    className="w-full text-white bg-gray-800 rounded-md  outline-none "
                    min={0}
                    max={2000}
                    step={1}
                    onChange={(e) => {
                      setTextPositionX(parseInt(e.target.value));
                      handleTextAdd();
                    }}
                  />
                    <span className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-2 outline-none " >{textPositionX}</span>
                </div>
                <div className="w-full flex flex-nowrap flex-row items-center gap-[0.5rem] ">
                  <label htmlFor="fontSize" className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-1 outline-none " >Position Y:</label>
                  <input
                    type="range"
                    className="w-full text-white bg-gray-800 rounded-md  outline-none "
                    min={0}
                    max={1100}
                    step={1}
                    onChange={(e) => {
                      setTextPositionY(parseInt(e.target.value));
                      handleTextAdd();
                    }}
                  />
                    <span className="text-white whitespace-nowrap font-bold bg-gray-800 rounded-md p-2 outline-none " >{textPositionY}</span>
                </div>
               
                
                
                  <label htmlFor="colorSelect" className="text-white flex flex-row items-center gap-[1rem] " >Choose a color:</label>
                  <div className="flex flex-row items-center gap-[1rem] ">
                  <select
                    id="colorSelect"
                    name="color"
                    className=" p-2 rounded text-white bg-gray-800 outline-none flex flex-row items-center gap-[1rem] "
                    onChange={(e) => {setColor(e.target.value);handleTextAdd(e.target.value)}}
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
                  <div className="w-[50px] h-[50px] rounded-md p-2 outline-1"
                  style={{backgroundColor:`#${color}`}}
                  
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
                <span>Device Pixel Ratio</span>
                <select
                  name="dpr"
                  id="dpr"
                  className=" p-2 rounded text-white bg-gray-800 outline-none "
                  onChange={(e) => setDpr(`${e.target.value}`)}
                >
                  <option value="dpr-auto">Auto</option>
                  <option value="dpr-1">1x(Standard)</option>
                  <option value="dpr-2">2x(Retina)</option>
                </select>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full flex flex-row items-center justify-center gap-[2rem] ">
          <button
            className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
            onClick={() => {
              setImageLink(transformedImageLink);
            }}
          >
            Save
          </button>
          <button
            className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
            onClick={() => {
              setTransformedImageLink(imageLink);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
