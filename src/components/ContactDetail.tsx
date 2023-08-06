import React from "react";


interface ContactDetailProps {
    title: string
    info: string
}


export const ContactDetail: React.FunctionComponent<ContactDetailProps> = (props: ContactDetailProps) => {
    const { title, info} = props;
    return (
        <div className="flex flex-row mb-5">
        <p className="w-48 text-white font-bold text-2xl font-poppins">{title}</p>
        <p className="ml-10 text-white font-bold text-2xl font-DancingScript">:</p>
        <p className="ml-10 text-white font-bold text-2xl font-poppins">{info}</p>
      </div>
    );
}

