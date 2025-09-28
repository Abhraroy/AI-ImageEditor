import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMyStore from "@/zustandStore/zustandStore";
import { handleTransform } from "@/utilityFunctions/utility1";
import { useEffect } from "react";

export default function EditBar1() {
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
  } = useMyStore() as any;

  const handleAspectRatioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    let aspectRatio = e.target.value;
    aspectRatio = aspectRatio.replace(":", "-");
    console.log(aspectRatio);
    setTransFormationInstructions(`ar-${aspectRatio}`);
    const t = `ar-${aspectRatio}`;
    setAspectRatio(`ar-${aspectRatio}`);
    // handleTransform(imageLink, setImageLink,t);
  };
  useEffect(() => {
    console.log("transFormationInstructions:", transFormationInstructions);
    handleTransform(imageLink, setImageLink);
  }, [aspectRatio, width, height, imageFocus, cropMode, zoom, dpr]);

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
                  onChange={handleAspectRatioChange}
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
            <AccordionTrigger>Focus & Zoom</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <select
                  name="imageFocus"
                  id="imageFocus"
                  className=" p-2 rounded text-white bg-gray-800 outline-none "
                  onChange={(e) => setImageFocus(`${e.target.value}`)}
                >
                  <option value="fo-top">Top</option>
                  <option value="fo-bottom">Bottom</option>
                  <option value="fo-left">Left</option>
                  <option value="fo-right">Right</option>
                  <option value="fo-center">Center</option>
                  <option value="fo-top_left">Top Left</option>
                  <option value="fo-top_right">Top Right</option>
                  <option value="fo-bottom_left">Bottom Left</option>
                  <option value="fo-bottom_right">Bottom Right</option>
                  <option value="fo-face">Face</option>
                </select>
                <span>Zoom</span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full bg-gray-800 rounded-md outline-none "
                  onChange={(e) => setZoom(`z-${e.target.value}`)}
                />
                <button
                  className="bg-gray-800 rounded-md p-2 outline-none "
                  onClick={() => {
                    setZoom("");
                    setImageFocus("");
                  }}
                >
                  Reset zoom & focus
                </button>
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
          <button className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
          
          onClick={()=>{
            setImageLink(transformedImageLink);
          }}
          >
            Save
          </button>
          <button className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
          
          onClick={()=>{
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
