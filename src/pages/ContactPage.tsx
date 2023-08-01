import React, { useEffect, useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import { ContactDetail } from "../components/ContactDetail"
import { ContactForm } from "../components/ContactForm"

const ContactUs = () => {

  return (
    <body className="mx-auto md:px-6 bg-gradient-to-r from-red-900 to-purple-900  min-h-screen">
      <div className="container w-full pt-48 sm:py-16 mx-auto mt-10 items-center">
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
      </div>
    </body>

  )
}

export default ContactUs