import useMyStore from "@/zustandStore/zustandStore";

export const handleTransform = (imageLink: string, setImageLink: any) => {
  console.log("executing  handleTransform function");
  if (imageLink) {
    const {
      setTransformedImageLink,
      transFormationInstructions,
      aspectRatio,
      width,
      height,
      cropMode,
      imageFocus,
      zoom,
      dpr,
      text,
      removeBackground,
      changeBackground,
      generativeFill,
      editUsingAI,
      layer,
      setIsTransforming,
    } = useMyStore.getState() as any;

    console.log("Transform");
    console.log(imageLink);
    
    console.log("transFormationInstructions:", transFormationInstructions);
    let newUrl =
      imageLink +
      `?tr=${layer},${removeBackground},${changeBackground},${generativeFill},${editUsingAI},${aspectRatio},${width},${height},${cropMode},${imageFocus},${zoom},${dpr}`;
    console.log("New URL:", newUrl);


    if (
      layer ||
      removeBackground ||
      changeBackground ||
      generativeFill ||
      editUsingAI ||
      aspectRatio ||
      width ||
      height ||
      cropMode ||
      imageFocus ||
      zoom ||
      dpr
    ) {
      console.log(!layer ,
        removeBackground ,
        changeBackground ,
        generativeFill ,
        editUsingAI ,
        aspectRatio ,
        width ,
        height ,
        cropMode ,
        imageFocus ,
        zoom ,
        dpr)
        setIsTransforming(true);
      const img = new window.Image();
      img.src = newUrl;
      img.onload = () => {
        setIsTransforming(false);
        setTransformedImageLink(newUrl);
      };

      img.onerror = () => {

        console.error("Failed to load transformed image");
        console.error("New URL:", newUrl);
        setIsTransforming(false);
      };
    }else{
      console.log("No transformation instructions");
    }
  } else {
    console.log("No image link");
  }
};

export const handleOverlay = (imageLink: string, setImageLink: any) => {
  if (imageLink) {
    const {
      setTransformedImageLink,
      transFormationInstructions,
      aspectRatio,
      width,
      height,
      cropMode,
      imageFocus,
      zoom,
      dpr,
      layer,
    } = useMyStore.getState() as any;

    console.log("Overlay");
    console.log(imageLink);
    setTransformedImageLink(imageLink + `?tr=${layer}`);
  }
};
