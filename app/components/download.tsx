"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { FaFacebookSquare, FaInstagram, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Clipboard from 'clipboard-polyfill'
import { IoCloudDownloadOutline } from "react-icons/io5";
import Main from "./main";

export default function Download() {

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="border w-[440px] h-[410px] bg-white rounded-lg shadow-xl">
        <div className="space-y-3 pt-5 mx-5">
          <div>
            <h1 className="font-sans font-bold">Weee Shareee</h1>
            <span className="text-sm text-slate-400 font-sans">Hellooo!!!!!</span>
          </div>
          

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col group items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed hover:border-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300 rounded-lg cursor-pointer bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <IoCloudDownloadOutline className="text-5xl text-gray-500 group-hover:text-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300"/>
                        <p className="mb-2 text-sm text-gray-500 group-hover:text-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300"><span className="font-semibold">Click to Download</span></p>
                        <p className="text-xs text-gray-500 group-hover:text-orange-500 hover:transition hover:delay-150 hover:ease-in-out hover:duration-300">FILENAME</p>
                    </div>
                    <a id="dropzone-file" className="hidden" href={fileUrl}>Download</a>
                </label>
            </div> 

            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-xs"><Link href="https://m.me/achuuu24">Help Center</Link></h1>
              </div>
              <Link href="/" className="text-sm border px-8 py-1 rounded-md hover:text-orange-700 hover:bg-orange-400 hover:transition hover:delay-75 hover:ease-in-out hover:duration-300">
                Send File
              </Link>
            </div>

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
