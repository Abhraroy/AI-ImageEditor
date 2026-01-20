import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMyStore from "@/zustandStore/zustandStore";
import { handleTransform } from "@/utilityFunctions/imageTransformation";
import { useEffect, useRef } from "react";

export default function AiTransformationEditBar() {
  const {
    imageLink,
    setImageLink,
    transformedImageLink,
    setTransformedImageLink,
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
    removeBackground,
    setRemoveBackground,
    generativeFill,
    setGenerativeFill,
    editUsingAI,
    setEditUsingAI,
    changeBackground,
    setChangeBackground,
    
   
  } = useMyStore() as any;

  const objectAwareCroppingRef = useRef<HTMLInputElement>(null);
  const changeBackgroundRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const generativeFillRefPrompt = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef<boolean>(true);

  const handleEditUsingAI = () => {
    handleTransform(imageLink, setImageLink);
  }

  const handleObjectAwareCropping = () => {
    setImageFocus(`fo-${objectAwareCroppingRef.current?.value}`)
  }
  const handleChangeBackground = () => {
    console.log(`e-changebg-prompte-${changeBackgroundRef.current?.value}`)
    setChangeBackground(`e-changebg-prompte-${changeBackgroundRef.current?.value}`)
  }

  const handleGenerativeFill = () => {
    if(!generativeFill){
      setGenerativeFill(`bg-genfill`)
    }
    handleTransform(imageLink, setImageLink);
  }

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }

    
   
    handleTransform(imageLink, setImageLink);
  }, [width, height,cropMode,imageFocus,removeBackground,changeBackground, editUsingAI]);

  return (
    <>
      <div className="w-[100%] h-[100%]  flex flex-col items-center justify-around p-4 text-white gap-[1rem] ">
        <Accordion type="single" collapsible className="w-full  ">
          <AccordionItem
            value="item-1"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Background Transformation</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <span>Remove Background</span>
                <select
                  name="removeBackground"
                  id="removeBackground"
                  className=" p-2 rounded text-white bg-gray-800 outline-none "
                  onChange={(e) => setRemoveBackground(`${e.target.value}`)}
                >
                  <option>Selct Method</option>
                  <option value="e-bgremove">Remove Background</option>
                  <option value="e-removedotbg">Remove Background Pro</option>
                </select>
                <span>Change Background</span>
                <input
                  type="text"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter Prompt"
                  ref={changeBackgroundRef}
                />
                <button className="bg-gray-800 rounded-md p-2 outline-none "
                onClick={() => {
                  handleChangeBackground();
                }}
                >
                  Change Background
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Generative Fill</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
                <div className="flex flex-row items-center gap-[1rem]  ">
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none "
                    placeholder="Width"
                    ref={widthRef}
                  />
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none"
                    placeholder="Height"
                    ref={heightRef}
                  />
                </div>
                <select
                  name="cropMode"
                  id="cropMode"
                  className=" p-2 rounded text-white bg-gray-800 outline-none "
                  onChange={(e) => setCropMode(`${e.target.value}`)}
                >
                  <option>Select Crop Method</option>
                  <option value="cm-pad_resize">Pad & Resize</option>
                  <option value="cm-extract">Extract</option>
                </select>
                <input
                  type="text"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter Prompt (optional)"
                  ref={generativeFillRefPrompt}
                  // value="bg-genfill"
                  onChange={(e) =>
                    setGenerativeFill(`bg-genfill-prompt-${e.target.value}`)
                  }
                />
                <button className="bg-gray-800 rounded-md p-2 outline-none "
                onClick={() => {
                  handleGenerativeFill();
                }}
                >
                  Add Generative Fill
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Edit Using AI</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
              <input
                  type="text"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter Prompt"
                  onChange={(e) =>
                    setEditUsingAI(`e-edit-prompt-${e.target.value}`)
                  }
                />
                <button className="bg-gray-800 rounded-md p-2 outline-none "
                onClick={() => {
                  handleEditUsingAI();
                }}
                >
                  Edit Image
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Object Aware Cropping</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start gap-[1rem]  ">
              <input
                  type="text"
                  className="w-full text-white bg-gray-800 rounded-md p-2 outline-none "
                  placeholder="Enter Object Name"
                  ref={objectAwareCroppingRef}
                />
                <button className="bg-gray-800 rounded-md p-2 outline-none "
                onClick={() => {
                  handleObjectAwareCropping();
                }}
                >
                  Crop Image
                </button>
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
