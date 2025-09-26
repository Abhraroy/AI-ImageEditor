"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import image from "next/image";

import useMyStore from "@/zustandStore/zustandStore";


import { useRef, useState } from "react";
import EditBar from "@/myComponents/EditBar";

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const UploadExample = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const {imageLink, setImageLink, transformedImageLink, setTransformedImageLink, transFormationInstructions, setTransFormationInstructions, isTransforming, setIsTransforming, isUploading, setIsUploading, isDownloading, setIsDownloading} = useMyStore();

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
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      handleUpload(file);
    }
  }

  
  const handleUpload = async (file:File) => {
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

  

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[1rem] w-screen h-screen bg-black " >
        <div className="w-[70%] h-[6vh]  rounded-[1.5rem] flex flex-row items-center gap-[1rem] " >
        <input
          className="bg-gray-300 text-black p-2 rounded-md hidden "
          type="file"
          ref={fileInputRef}
          placeholder="Upload file"
          onChange={handleFileChange}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          type="button"
          onClick={openFileInput}
        >
          Upload file
        </button>
        </div>
        
        <div className="w-[70%] h-[6vh] border-2 border-gray-400 rounded-[1.5rem] flex flex-row items-center p-4  gap-[1rem] " >
          {
            imageLink && isUploading ?<>
            <span className="text-white font-bold "  >{imageLink}</span>
            </> :
            <span className="text-white font-bold "  >No image selected</span>
          }
        </div>
        
        <div className="w-[70%] h-[59vh]  flex flex-row gap-[1rem] " >
          <div className="w-[75%] h-[100%] border-2 border-gray-400 rounded-[1.5rem] flex flex-row items-center justify-center p-4 " >
            {
              imageLink ?<>
              <img src={imageLink} alt="image" className="w-[100%] h-[100%] object-contain" />
              </>:<span className="text-white font-bold "  >No image selected</span>
            }
          </div>
          <div className="flex-1 h-[100%] border-2 border-gray-400 rounded-[1.5rem]" >
            <EditBar />
          </div>
        </div>
        
        
        
        <div className="w-[70%] h-[6vh] border-2 border-gray-400 rounded-[1.5rem]" ></div>
      </div>
    </>
  );
};

export default UploadExample;
