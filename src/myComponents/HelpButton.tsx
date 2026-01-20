"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function HelpButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-white font-bold bg-gray-900 rounded-md pt-2 pb-2 pl-4 pr-4 cursor-help hover:bg-gray-800 transition-colors" style={{ fontSize: '1rem' }}>
          ?
        </span>
      </TooltipTrigger>
      <TooltipContent 
        side="bottom" 
        className="max-w-md p-4 text-white bg-gray-900 border border-gray-700"
        sideOffset={8}
      >
        <div className="space-y-2">
          <h3 className="font-bold mb-2" style={{ fontSize: '1rem' }}>How to Use PIXEDIT</h3>
          <ul className="space-y-1 list-disc list-inside" style={{ fontSize: '1rem' }}>
            <li>Upload an image using the "Upload file" button</li>
            <li>Use the editing tools on the right to transform your image</li>
            <li>Click "Resize & Crop" to adjust image dimensions</li>
            <li>Add overlays, apply AI transformations, or enhance effects</li>
            <li>Export your edited image when you're done</li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
