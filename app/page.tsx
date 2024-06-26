"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookSquare, FaInstagram, FaGithubSquare, FaLinkedin } from "react-icons/fa";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Reset error state

    if (!file) {
      setError('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(`Error uploading file: ${errorData.message}`);
        return;
      }

      const data = await res.json();
      setFileUrl(data.fileUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Request failed: ${errorMessage}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="border w-[440px] h-[440px] bg-white rounded-lg shadow-xl">
        <div className="space-y-3 pt-5 mx-5">
          <div>
            <h1 className="font-sans font-bold">Weee Shareee</h1>
            <span className="text-sm text-slate-400 font-sans">Hellooo!!!!!</span>
          </div>
          

          {/* UPLOADING SECTION */}
          <form onSubmit={handleUpload} className="space-y-3">

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col group items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed hover:border-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300 rounded-lg cursor-pointer bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 group-hover:text-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 group-hover:text-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 group-hover:text-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300">SVG, PNG, JPG, GIF, PDF, DOCS, MP3, ETC. </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
                </label>
            </div> 

            {/* URL copying url */}
            <div className="flex items-center space-x-1">
              {
                fileUrl &&
                <input type="text" className="w-64 text-sm font-serif outline-none cursor-default py-1" readOnly placeholder="dsa" value={fileUrl}/>
              }
              {
                error && (
                  <div className="w-64 text-red-400 text-sm font-serif outline-none cursor-default py-1">
                    <p>{error}</p>
                  </div>
                )
              }
              <button className="text-sm border px-8 py-1 rounded-md hover:text-orange-700 hover:bg-orange-400 hover:transition hover:delay-75 hover:ease-in-out hover:duration-300">
                COPY URL
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-xs">Help Center</h1>
              </div>
              <div className="flex space-x-1">
                <button className="text-sm border px-8 py-1 rounded-md">Cancel</button>
                <button type="submit" className="text-sm border px-8 py-1 rounded-md hover:text-orange-700 hover:bg-orange-400 hover:transition hover:delay-75 hover:ease-in-out hover:duration-300">Upload</button>
              </div>
            </div>
          </form>
          {/* FaFacebookSquare, FaInstagram, FaGithubSquare, FaLinkedin */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xs">💖 ace_kun</h1>
            <span className="text-lg"><FaFacebookSquare /></span>
            <span className="text-lg"><FaInstagram/></span>
            <span className="text-lg"><Link href='https://github.com/axlduke'><FaGithubSquare/></Link></span>
            <span className="text-lg"><FaLinkedin/></span>
          </div>

        </div>
      </div>
    </div>
  );
}
