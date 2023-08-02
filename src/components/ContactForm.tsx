import React from "react";
import { NotificationDialog } from "./PopupDialog";

export const ContactForm: React.FunctionComponent = () => {
    return (
        <form className="w-full min-w-lg bg-white bg-opacity-25 p-10 rounded-md">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase font-DancingScript tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
              First Name
            </label>
            <input className="appearance-none font-DancingScript block w-full bg-white bg-opacity-75 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your First Name"></input>
            <p className="text-red-500 text-xs italic font-DancingScript">Please fill out this field.</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase font-DancingScript tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
              Last Name
            </label>
            <input className="appearance-none font-DancingScript block w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Your Last Name"></input>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase font-DancingScript tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
              E-mail
            </label>
            <input className="appearance-none font-DancingScript block w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="example@gmail.com"></input>
            <p className="text-white font-DancingScript text-xs italic">Some tips - as long as needed</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block font-DancingScript uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
              Message
            </label>
            <textarea className="font-DancingScript no-resize appearance-none block w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message" placeholder="Description"></textarea>
            <p className="text-white text-xs italic font-DancingScript">Please let us know more detail</p>
          </div>
        </div>
        
        <button className="mx-3 font-DancingScrip text-white bg-[#db2777] text-white font-semibold hover:text-white py-2 px-10 border border-blue hover:border-transparent rounded uppercase">
          Send
        </button>
        <NotificationDialog/>
           
      </form>
    );
}

