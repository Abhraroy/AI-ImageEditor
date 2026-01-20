"use client"; // This component must be a client component
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { FaCropSimple,FaLayerGroup,FaWandMagicSparkles } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";

import "./globals.css"







import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import image from "next/image";
import { FaRegShareSquare,FaRegImage  } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";

import useMyStore from "@/zustandStore/zustandStore";

import { useRef, useState } from "react";
import ResizeCropEditBar from "@/myComponents/ResizeCropEditBar";
import EditBar2 from "@/myComponents/OverlayEditBar";
import EditBar3 from "@/myComponents/AiTransformationEditBar";
import EditBar4 from "@/myComponents/EffectsEnhancementsEditBar";
import CustomTooltip from "@/myComponents/customtooltip";
import OverlayEditBar from "@/myComponents/OverlayEditBar";
import AiTransformationEditBar from "@/myComponents/AiTransformationEditBar";
import EffectsEnhancementsEditBar from "@/myComponents/EffectsEnhancementsEditBar";

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const UploadExample = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const {
    imageLink,
    setImageLink,
    transformedImageLink,
    isTransforming,
    setIsTransforming,
    isUploading,
    setIsUploading,
    isDownloading,
    setIsDownloading,
    EditBarNo,
    setEditBarNo,
  } = useMyStore() as any;

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */
  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    // Access the file input element using the ref
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      setIsUploading(true);
      console.log("Uploading file:", file);
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
      setImageLink(uploadResponse.url as string);
      setIsUploading(false);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };
  console.log("isTransforming:", isTransforming);

  const handleDownload = async () => {
    if (!imageLink || !transformedImageLink) return;
  
    try {
      const response = await fetch(transformedImageLink, { mode: "cors" });
      const blob = await response.blob();
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
  
      // Optional: extract file extension from original URL
      const extension = transformedImageLink.split(".").pop()?.split("?")[0] || "png";
      a.download = `my-picture.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      window.URL.revokeObjectURL(url); // clean up

      // Save to localStorage
      try {
        const savedEdits = JSON.parse(localStorage.getItem("pixedit-saved-edits") || "[]");
        const newEdit = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          url: transformedImageLink,
          timestamp: Date.now(),
        };
        savedEdits.push(newEdit);
        // Keep only the latest 100 edits
        const trimmed = savedEdits.slice(-100);
        localStorage.setItem("pixedit-saved-edits", JSON.stringify(trimmed));
      } catch (storageError) {
        console.error("Error saving to localStorage:", storageError);
      }
    } catch (err) {
      console.error("Download failed", err);
    }
  };



  return (
    <>
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center gap-[1rem] w-screen h-screen   ">
        <div className="w-[70%] relative h-[6vh]  rounded-[1.5rem] flex flex-row items-center justify-between gap-[1rem] ">
         
            <section className="flex items-center gap-[1rem] " >
              <input
                className="bg-gray-300 text-black p-2 rounded-md hidden shrink-0 "
                type="file"
                ref={fileInputRef}
                placeholder="Upload file"
                onChange={handleFileChange}
              />
              <button
                className="bg-black/70 text-white p-2 rounded-md shrink-0 font-josefin-sans "
                type="button"
                onClick={openFileInput}
              >
                Upload file
              </button>
              {
               progress > 0 && progress < 100 ?
               <progress className="bg-blue-500 w-[15rem]  text-white shrink-0 "
               
               
               value={progress} max={100}></progress>
               :
               <span></span>
              }
            </section>
          {
            !transformedImageLink ?
            <button
            className="bg-black/30 pointer-events-none text-white p-2 rounded-md shrink-0 flex flex-row items-center justify-center gap-[0.5rem] disabled:opacity-50 disabled:cursor-not-allowed "
            type="button"
            disabled={true}
            
          >
            Export Image
            <FaRegShareSquare />
          </button>
          :
          <button
            className="bg-black/70 text-white p-2 rounded-md shrink-0 flex flex-row items-center justify-center gap-[0.5rem] "
            type="button"
            disabled={false}
            onClick={handleDownload}
          >
            Export Image
            <FaRegShareSquare />
          </button>
          }
          
        </div>

        <div className="w-[70%] h-[6vh] bg-black/50 backdrop-blur-4xl rounded-[1.5rem] flex flex-row items-center p-4  gap-[1rem] ">
          {imageLink ? (
            <>
              <span className="text-white font-bold ">{imageLink}</span>
            </>
          ) : (
            <span className="text-white spaceGrotesk ">No image selected</span>
          )}
        </div>

        <div className="w-[70%] h-[59vh]  flex flex-row gap-[1rem] ">
          <div className="w-[75%] h-[100%] relative bg-black/90 backdrop-blur-4xl rounded-[1.5rem] flex flex-row items-center justify-center p-4 ">
            
            
            {
              isTransforming ?(
                <>
                 {/* <span className="text-white font-bold ">Transforming...{isTransforming}</span> */}
                 <div className="w-full h-full bg-black/50 backdrop-blur-4xl rounded-[1.5rem] absolute " ></div>
                 <img
                    src={imageLink}
                    alt="image"
                    className="w-[100%] h-[100%] object-contain"
                  />
                </>
              ):imageLink && !transformedImageLink && !isTransforming ? (
                <>
                  <img
                    src={imageLink}
                    alt="image"
                    className="w-[100%] h-[100%] object-contain"
                  />
                </>
              ) : imageLink && transformedImageLink  ? (
                <img
                  src={transformedImageLink}
                  alt="image"
                  className="w-[100%] h-[100%] object-contain"
                />
              ) : (
               <div className=" relative w-full h-full flex flex-row items-center justify-center gap-[1rem] " > 
               <span className="font-bold text-white" style={{ fontSize: '1rem' }}>No image selected</span>
               <FaFileImage className="text-white text-[12rem] absolute opacity-15 " />
               </div>
              )
              
            }



          </div>
          <div className="flex-1 h-[100%] bg-black/90 pl-2 pr-2 rounded-[1.5rem]">
            {EditBarNo === 1 && (
            <ResizeCropEditBar />
            )}
            {EditBarNo === 2 && (
              <OverlayEditBar />
            )}
            {EditBarNo === 3 && (
              <AiTransformationEditBar />
            )}
            {EditBarNo === 4 && (
              <EffectsEnhancementsEditBar />
            )}
          </div>
        </div>

        <CustomTooltip />
      </div>
      </TooltipProvider>
    </>
  );
};

export default UploadExample;
