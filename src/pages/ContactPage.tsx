import React from 'react';
import { Link, Element, scroller } from 'react-scroll';
import { ContactDetail } from "../components/ContactDetail"
import { ContactForm } from "../components/ContactForm"

const ContactUs = () => {
  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  return (

    <div className="mx-auto md:px-6 bg-gradient-to-r from-red-900 to-purple-900  min-h-screen">
      <body className="container w-full pt-48 sm:py-16 mx-auto mt-10 items-center">
        <div className="flex flex-wrap items-center min-w-lg p-5">

          <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
            <h2 className="mb-6 text-3xl font-bold text-yellow-500">Business Development</h2>
            <ContactDetail title={"Opening Hours"} info={"Working Hours"} />
            <ContactDetail title={"Email"} info={"haiseanghor@gmail.com"} />
            <ContactDetail title={"Telephone"} info={"099 999 999"} />
          </div>

          <div className="shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6 pt-36">
            <ContactForm />
          </div>
        </div>
      </body>
    </div>
    // ----------------------------
    // <div className="flex min-h-screen items-center justify-center bg-neutral-800">
    //   <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
    //     {/* 1 */}
    //     <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
    //       <div className="h-96 w-72">
    //         <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
    //       </div>
    //       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
    //       <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
    //         <h1 className="font-dmserif text-3xl font-bold text-white">Beauty</h1>
    //         <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
    //         <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
    //       </div>
    //     </div>

    //     {/* 2 */}
    //     <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
    //       <div className="h-96 w-72">
    //         <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
    //       </div>
    //       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
    //       <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
    //         <h1 className="font-dmserif text-3xl font-bold text-white">Beyond Builder</h1>
    //         <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
    //         <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
    //       </div>
    //     </div>

    //     {/* 3 */}
    //     <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
    //       <div className="h-96 w-72">
    //         <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
    //       </div>
    //       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
    //       <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
    //         <h1 className="font-dmserif text-3xl font-bold text-white">Shooting Star</h1>
    //         <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
    //         <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* footer */}
    //   <div className="fixed bottom-16">
    //     <p className="font-com text-2xl font-semibold text-white">All Images are from <a href="https://unsplash.com" className="text-blue-500">Unsplash.com</a></p>
    //   </div>
    // </div>




  )
}

export default ContactUs