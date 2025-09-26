import {create} from "zustand";


const useMyStore = create((set)=>({
    imageLink:null,
    setImageLink:(imageLink:string)=>set({imageLink}),
    transformedImageLink:null,
    setTransformedImageLink:(transformedImageLink:string)=>set({transformedImageLink}),
    transFormationInstructions:null,
    setTransFormationInstructions:(transFormationInstructions:string)=>set({transFormationInstructions}),
    isTransforming:false,
    setIsTransforming:(isTransforming:boolean)=>set({isTransforming}),
    isUploading:false,
    setIsUploading:(isUploading:boolean)=>set({isUploading}),
    isDownloading:false,
    setIsDownloading:(isDownloading:boolean)=>set({isDownloading}),
}))
export default useMyStore;