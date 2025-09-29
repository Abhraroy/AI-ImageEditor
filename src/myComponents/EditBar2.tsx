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
  } = useMyStore() as any;

  const textRef = useRef<HTMLInputElement>(null);

  const handleTextAdd = () => {
    setText(`l-text,i-${textRef.current?.value},fs-${textFont},l-end`);
    textRef.current!.value = "";
  };


  useEffect(() => {
    // console.log("text:", text);
    // setText(`l-text,i-${text},fs-${textFont},l-end`);

    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }

    handleTransform(imageLink, setImageLink);
  }, [text]);


  


  return (
    <>
      <div className="w-[100%] h-[100%]  flex flex-col items-center justify-around p-4 text-white gap-[1rem] ">
        <Accordion type="single" collapsible className="w-full  ">
          <AccordionItem
            value="item-1"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Resize & Crop</AccordionTrigger>
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
                <span>Text</span>
                <input
                  type="text"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter text"
                  ref={textRef}
                  onChange={handleTextAdd}
                />
                <button className="bg-gray-800 rounded-md p-2 outline-none ">
                  Add Text
                </button>
                <input
                  type="number"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter text"
                  onChange={(e)=>{
                    setTextFont(parseInt(e.target.value));
                    handleTextAdd();
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Pixel Ratio</AccordionTrigger>
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
