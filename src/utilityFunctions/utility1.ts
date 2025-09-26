import useMyStore from "@/zustandStore/zustandStore";
const { transFormationInstructions } = useMyStore.getState();

const handleTransform = (imageLink:string, setImageLink:any,t:string) => {
    console.log("Transform");
    console.log(imageLink);
    console.log(imageLink.split("/"));
    let parts = imageLink.split("/");
    let index = parts.indexOf("khskk8qsz");
    console.log("transFormationInstructions:", t);
    if (index !== -1) {
      parts.splice(index + 1, 0, `tr:${t}`);
    }
    let newUrl = parts.join("/");
    console.log("New URL:", newUrl);
    setImageLink(newUrl);
  };

export default handleTransform;