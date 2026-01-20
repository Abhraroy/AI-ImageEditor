"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaRegCopy, FaCheck } from "react-icons/fa";

interface SavedEdit {
  id: string;
  url: string;
  timestamp: number;
}

export default function MyEditsPage() {
  const [savedEdits, setSavedEdits] = useState<SavedEdit[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Load saved edits from localStorage
    const loadSavedEdits = () => {
      try {
        const saved = localStorage.getItem("pixedit-saved-edits");
        if (saved) {
          const parsed = JSON.parse(saved);
          // Sort by timestamp (newest first)
          const sorted = parsed.sort((a: SavedEdit, b: SavedEdit) => b.timestamp - a.timestamp);
          setSavedEdits(sorted);
        }
      } catch (error) {
        console.error("Error loading saved edits:", error);
      }
    };

    loadSavedEdits();

    // Listen for storage changes (in case another tab updates localStorage)
    const handleStorageChange = () => {
      loadSavedEdits();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also check on focus in case same tab updated
    window.addEventListener("focus", loadSavedEdits);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", loadSavedEdits);
    };
  }, []);

  const deleteEdit = (id: string) => {
    try {
      const updated = savedEdits.filter((edit) => edit.id !== id);
      localStorage.setItem("pixedit-saved-edits", JSON.stringify(updated));
      setSavedEdits(updated);
    } catch (error) {
      console.error("Error deleting edit:", error);
    }
  };

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-24 pb-12 px-4">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-white font-bold hover:text-gray-300 transition-colors inline-block mb-4"
            style={{ fontSize: '1rem' }}
          >
            ← Back to Editor
          </Link>
          <h1 className="text-white font-bold mb-2" style={{ fontSize: '1rem' }}>My Edits</h1>
          <p className="text-gray-300" style={{ fontSize: '1rem' }}>
            View and manage your exported image links
          </p>
        </div>

        {savedEdits.length === 0 ? (
          <div className="bg-black/50 backdrop-blur-4xl rounded-[1.5rem] p-12 flex flex-col items-center justify-center gap-4">
            <p className="text-white text-center" style={{ fontSize: '1rem' }}>
              No saved edits yet.
            </p>
            <p className="text-gray-400 text-center">
              Export an image from the editor to save it here.
            </p>
            <Link
              href="/"
              className="bg-black/70 text-white p-3 rounded-md hover:bg-black/90 transition-colors mt-4"
            >
              Go to Editor
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedEdits.map((edit) => (
              <div
                key={edit.id}
                className="bg-black/50 backdrop-blur-4xl rounded-[1.5rem] p-4 flex flex-col gap-3 hover:bg-black/70 transition-colors"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={edit.url}
                    alt="Saved edit"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-gray-400">
                            <p>Image not available</p>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400" style={{ fontSize: '1rem' }}>
                    {formatDate(edit.timestamp)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(edit.url, edit.id)}
                      className="flex-1 bg-black/70 text-white p-2 rounded-md hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                      style={{ fontSize: '1rem' }}
                      title="Copy link"
                    >
                      {copiedId === edit.id ? (
                        <>
                          <FaCheck className="text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaRegCopy />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => deleteEdit(edit.id)}
                      className="bg-red-900/50 text-white p-2 rounded-md hover:bg-red-900/70 transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <a
                    href={edit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 truncate"
                    style={{ fontSize: '1rem' }}
                  >
                    View Original
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
