import useMyStore from "@/zustandStore/zustandStore";

const handleTransform = (imageLink: string, setImageLink: any) => {
  if (imageLink) {
    const { setTransformedImageLink, transFormationInstructions, aspectRatio, width, height, cropMode, imageFocus, zoom, dpr } = useMyStore.getState() as any;

    console.log("Transform");
    console.log(imageLink);
    console.log(imageLink.split("/"));
    let parts = imageLink.split("/");
    let index = parts.indexOf("khskk8qsz");
    console.log("transFormationInstructions:", transFormationInstructions);
    if (index !== -1) {
      parts.splice(index + 1, 0, `tr:${aspectRatio},${width},${height},${cropMode},${imageFocus},${zoom},${dpr}`);
    }
    let newUrl = parts.join("/");
    console.log("New URL:", newUrl);
    setTransformedImageLink(newUrl);
  } else {
    console.log("No image link");
  }
};

export default handleTransform;
