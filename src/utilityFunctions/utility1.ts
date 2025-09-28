import useMyStore from "@/zustandStore/zustandStore";

export const handleTransform = (imageLink: string, setImageLink: any) => {
  if (imageLink) {
    const { setTransformedImageLink, transFormationInstructions, aspectRatio, width, height, cropMode, imageFocus, zoom, dpr, text } = useMyStore.getState() as any;

    console.log("Transform");
    console.log(imageLink);
    
    console.log("transFormationInstructions:", transFormationInstructions);
    let newUrl = imageLink+`?tr=${text},${aspectRatio},${width},${height},${cropMode},${imageFocus},${zoom},${dpr}`;
    console.log("New URL:", newUrl);
    setTransformedImageLink(newUrl);
  } else {
    console.log("No image link");
  }
};





export const handleOverlay = (imageLink: string, setImageLink: any) => {
  if (imageLink) {
    const { setTransformedImageLink, transFormationInstructions, aspectRatio, width, height, cropMode, imageFocus, zoom, dpr, text } = useMyStore.getState() as any;

    console.log("Overlay");
    console.log(imageLink);
    setTransformedImageLink(imageLink+``);
  }
}