import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMyStore from "@/zustandStore/zustandStore";
import { handleTransform } from "@/utilityFunctions/imageTransformation";
import { useEffect, useRef } from "react";

export default function EffectsEnhancementsEditBar() {
  const isFirstRender = useRef<boolean>(true);
  const {
    imageLink,
    setImageLink,
    undoTransFormedImage,
    setTransformedImageLink,
    blur,
    sharpen,
    contrast,
    grayscale,
    setBlur,
    setSharpen,
    setContrast,
    setGrayscale,
  } = useMyStore() as any;

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }
    console.log("Undo Image Link",undoTransFormedImage);
    handleTransform(imageLink, setImageLink);
  }, [blur, sharpen, contrast, grayscale]);

  return (
    <>
      <div className="w-[100%] h-[100%]  flex flex-col items-center justify-around p-4 text-white gap-[1rem] ">
        <Accordion type="single" collapsible className="w-full  ">
          <AccordionItem
            value="item-1"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Blur</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none "
                    placeholder="Blur Amount"
                    onChange={(e) => setBlur(`bl-${e.target.value}`)}
                  />
                </div>
              </div>
            </AccordionContent>
            </AccordionItem>
            <AccordionItem
            value="item-2"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Sharpen</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none "
                    placeholder="Sharpen Amount"
                    onChange={(e) => setSharpen(`e-sharpen-${e.target.value}`)}
                  />
                </div>
                
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Contrast</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-gray-800 rounded-md outline-none cursor-pointer"
                    checked={!!contrast}
                    onChange={(e) => setContrast(e.target.checked ? "e-contrast" : "")}
                  />
                  <label className="text-white">Enable Contrast</label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Grayscale</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-gray-800 rounded-md outline-none cursor-pointer"
                    checked={!!grayscale}
                    onChange={(e) => setGrayscale(e.target.checked ? "e-grayscale" : "")}
                  />
                  <label className="text-white">Enable Grayscale</label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full flex flex-row items-center justify-center gap-[2rem] ">
          <button className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
          
          onClick={()=>{
            setTransformedImageLink(imageLink);
          }}
          >
            Reset
          </button>
          <button className="bg-gray-800 rounded-md pt-2 pb-2 px-6 outline-none "
          
          onClick={()=>{
            console.log("Undoing transformation");
            console.log("Undo Image Link",undoTransFormedImage);
            setTransformedImageLink(undoTransFormedImage);
          }}
          >
            Undo 
          </button>
        </div>
      </div>
    </>
  );
}
