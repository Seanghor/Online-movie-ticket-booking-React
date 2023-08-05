// import React, { useEffect, useState } from 'react';
// import { Link, Element, scroller } from 'react-scroll';
import { ContactDetail } from "../components/ContactDetail"
import { ContactForm } from "../components/ContactForm"
import ContactUsBgImage from "../assets/images/contactus/contactusBg.png";
import Profilebg from '../assets/Profilebg.png';
import Kimsour from '../assets/images/developer_image/kimsour3.png';
import Seanghor from '../assets/images/developer_image/seanghor2.png';
import Avatar from '../components/AvatarProp';
import { NotificationDialog } from '../components/PopupDialog';
import { useEffect, useState } from "react";
import { getUserInfor } from "../services/auth";
import dialog_icon_status from '../assets/images/dialog/tick.svg'
import the_avatar_cineplex_logo from '../assets/cinema/logo_icon.png'

const ContactUs = () => {
  return (
    <body className="mx-auto md:px-6 bg-gradient-to-r from-red-900 to-purple-900 min-h-screen bg-cover" style={{ backgroundImage: `url(${ContactUsBgImage})` }}>
      <div className="container w-full pt-48 sm:py-16 mx-auto mt-10 items-center">
        {/* Contact Us Section1 */}
        <div className="flex flex-row  items-center min-w-lg p-5 h-screen">
          <div className="flex flex-col justify-start mb-10 w-full shrink-0 grow-0 basis-auto md:mb-20 md:w-6/12 md:px-3 lg:px-6">
            <div className="flex items-center">
              <img src={the_avatar_cineplex_logo} alt="the avatar logo" className="h-48 w-56" />
            </div>
            <div className="">
              <h2 className="mb-6 text-3xl font-bold text-yellow-500 font-DancingScript">Business Development</h2>
              <ContactDetail title={"Opening Hours"} info={"Working Hours"} />
              <ContactDetail title={"Email"} info={"theavatarcineplex@gmail.com"} />
              <ContactDetail title={"Telephone"} info={"099 999 999"} />
            </div>
          </div>

          <div className="flex flex-wrap items-center min-w-lg p-5">
            <ContactForm  />
          </div>

        </div>
        {/* Developer Role */}
        <div className="pb-20 pt-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-full md:px-3 lg:px-6">
          <Avatar imageUrl={Kimsour} userName={'Rith Kimsour'} role={'Frontend Developer'} />
          <Avatar imageUrl={Seanghor} userName={'Hai Seanghor'} role={'Backend Developer'} />
        </div>
        {/* Developer Role */}
      </div>

    </body>

  )
}

export default ContactUs