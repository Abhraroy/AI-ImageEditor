import {create} from "zustand";


const useMyStore = create((set)=>({
    imageLink:null,
    setImageLink:(imageLink:string)=>set({imageLink}),
    transformedImageLink:null,
    setTransformedImageLink:(transformedImageLink:string)=>set({transformedImageLink}),
    transFormationInstructions:"",
    setTransFormationInstructions:(payload:string)=>set((state:any)=>({
        transFormationInstructions:state.transFormationInstructions + payload
    })),
    isTransforming:false,
    setIsTransforming:(isTransforming:boolean)=>set({isTransforming}),
    isUploading:false,
    setIsUploading:(isUploading:boolean)=>set({isUploading}),
    isDownloading:false,
    setIsDownloading:(isDownloading:boolean)=>set({isDownloading}),
}))
export default useMyStore;