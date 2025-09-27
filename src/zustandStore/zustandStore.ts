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

    aspectRatio:"",
    setAspectRatio:(aspectRatio:string)=>set({aspectRatio}),
    width:"",
    setWidth:(width:string)=>set({width}),
    height:"",
    setHeight:(height:string)=>set({height}),
    imageFocus:"",
    setImageFocus:(imageFocus:string)=>set({imageFocus}),
    cropMode:"",
    setCropMode:(cropMode:string)=>set({cropMode}),
    zoom:"",
    setZoom:(zoom:string)=>set({zoom}),
    dpr:"dpr-auto",
    setDpr:(dpr:string)=>set({dpr}),
    EditBarNo:1,
    setEditBarNo:(EditBarNo:number)=>set({EditBarNo}),
   
}))
export default useMyStore;