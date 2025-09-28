import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useMyStore from "@/zustandStore/zustandStore";
import { FaCropSimple, FaLayerGroup, FaWandMagicSparkles } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";

export default function CustomTooltip() {
    const { setEditBarNo } = useMyStore() as any;
        return <>
    <div className="w-[70%] h-[6vh]  rounded-[1.5rem] flex flex-row items-center justify-center gap-[1rem] text-white ">
          <Tooltip>
            <TooltipTrigger className="text-white p-4 rounded-full bg-gray-900 "
            
            onClick={()=>setEditBarNo(1)}><FaCropSimple /></TooltipTrigger>
            <TooltipContent className="text-white bg-gray-900 ">
              <p>Resize & Crop</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="text-white p-4 rounded-full bg-gray-900 "
            onClick={()=>setEditBarNo(2)}><FaLayerGroup /></TooltipTrigger>
            <TooltipContent className="text-white bg-gray-900 ">
              <p>Overlays</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="text-white p-4 rounded-full bg-gray-900 "
            onClick={()=>setEditBarNo(3)}><FaWandMagicSparkles /></TooltipTrigger>
            <TooltipContent className="text-white bg-gray-900 ">
              <p>AI Transformation</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="text-white p-4 rounded-full bg-gray-900 "
            onClick={()=>setEditBarNo(4)}><IoSparkles /></TooltipTrigger>
            <TooltipContent className="text-white bg-gray-900 ">
              <p>Effects & Enhancements</p>
            </TooltipContent>
          </Tooltip>
          
        </div>
    </>
}