import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMyStore from "@/zustandStore/zustandStore";
import handleTransform from "@/utilityFunctions/utility1";

export default function EditBar() {

    const {imageLink, setImageLink, transformedImageLink, setTransformedImageLink, transFormationInstructions, setTransFormationInstructions, isTransforming, setIsTransforming, isUploading, setIsUploading, isDownloading, setIsDownloading} = useMyStore();






   const handleAspectRatioChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    let aspectRatio = e.target.value;
    aspectRatio = aspectRatio.replace(":","-");
    console.log(aspectRatio);
    setTransFormationInstructions(`ar-${aspectRatio}`);
    const t = `ar-${aspectRatio}`
    handleTransform(imageLink, setImageLink,t);
   }







  return (
    <>
      <div className="w-[100%] h-[100%]  flex flex-row items-center p-4 text-white gap-[1rem] ">
        
            <span className="text-white font-bold " >{transFormationInstructions}</span>
        
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
                  />
                  <input
                    type="number"
                    className="w-full bg-gray-800 rounded-md p-2  outline-none"
                    placeholder="Height"
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
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Focus & Zoom</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-b-1  border-gray-800 "
          >
            <AccordionTrigger>Pixel Ratio</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
