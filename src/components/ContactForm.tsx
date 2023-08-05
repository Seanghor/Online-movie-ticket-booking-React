import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import { NotificationDialog } from "./PopupDialog";
import icon from '../assets/images/dialog/tick.svg'
import { useNavigate } from "react-router-dom";
import { getAccessToken, getRefreshToken, getUserInfor } from "../services/auth";
import { createFeedback } from "../services/feedback";
import { CreateFeedbackDto } from "../types/feedback.dto";
import dialog_icon_status from '../assets/images/dialog/thank.png'





const text = "Your feedback is invaluable to us to improve our service. We look forward to continuously exceeding your expectations and providing you with an exceptional movie booking experience."
export const ContactForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  // check token:
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const userInfo = getUserInfor()
  const [isAuth, setIsAuth] = useState(false)
  // const { userId, email, firstname, lastname, feedback, onClick, onChange } = props



  const [createFeedbackDto, setCreateFeedbackDto] = useState<CreateFeedbackDto>(
    {
      userId: "",
      email: "",
      lastname: "",
      firstname: "",
      feedback: ""
    }
  )
  const [disable, setDisable] = useState<boolean>(true)
  const [isPopUp, setIsPopup] = useState<boolean>(false)



  useEffect(() => {
    const getuser = () => {
      if (userInfo && accessToken && refreshToken) {
        setIsAuth(true)
        let user = JSON.parse(userInfo || "")
        setCreateFeedbackDto(prevState => ({ ...prevState, userId: user?.id }))
      }
      return
    }
    getuser()

    const { userId, ...feedbackData } = createFeedbackDto;
    if (Object.values(feedbackData).every(value => value !== "")) {
      return setDisable(false)
    } else {
      return setDisable(true)
    }

  }, [disable, reducerValue, isPopUp, isAuth])
  const handleInputChange = (setItem: keyof CreateFeedbackDto) => {

    return (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      // setCreateFeedbackDto({ ...createFeedbackDto, [setItem]: e.target.value })
      setCreateFeedbackDto(prevState => ({ ...prevState, [setItem]: e.target.value }))
      forceUpdate()
    };

  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!isAuth){
      setTimeout(
        () => navigate('/signup'), 
        1500
      );
    }
    const res = await createFeedback(createFeedbackDto)
    console.log("res:", res);
    if (res.ok) {
      console.log('Feedback created ........................');
      setIsPopup(true)
      setCreateFeedbackDto({
        ...createFeedbackDto,
        email: "",
        lastname: "",
        firstname: "",
        feedback: ""
      })
    }
    return
  }

  if (isPopUp) {
    return (
      <NotificationDialog
        isOpen={true}
        main_title={"Thank You"}
        discription={
          "Your feedback is invaluable to us as we strive to improve our services. We'll carefully consider your input to enhance our offerings. Thank you for taking the time to share your thoughts with us!"
        }
        icon={dialog_icon_status}
        onClick={() => {
          console.log("");

        }}
      />
    )
  }


  console.log("user:", createFeedbackDto);

  return (
    <form className="w-full min-w-lg bg-white bg-opacity-25 p-10 rounded-md" typeof="submit" onSubmit={handleSubmit}>

      <div className="flex flex-wrap -mx-3 mb-6">

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase font-DancingScript  tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
            First Name
          </label>
          <input
            className="appearance-none font-poppins block w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Your First Name"
            value={createFeedbackDto?.firstname}
            onChange={handleInputChange("firstname")}
          // onChange={(e) => setCreateFeedbackDto({ ...createFeedbackDto, lastname: e.target.value })}
          >
          </input>
          <div className="h-5">
            {
              createFeedbackDto.firstname ? (null) : (<p className="text-red-500 text-xs italic font-poppins">Please fill out firstname field.</p>)
            }
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase font-DancingScript tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
            Last Name
          </label>
          <input
            className="appearance-none font-poppinsblock w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Your Last Name"
            value={createFeedbackDto?.lastname}
            onChange={handleInputChange("lastname")}
          // onChange={(e) => setCreateFeedbackDto({ ...createFeedbackDto, lastname: e.target.value })}
          >
          </input>
          <div className="h-5">
            {
              createFeedbackDto.lastname ? (null) : (<p className="text-red-500 text-xs italic font-poppins">Please fill out lastname field.</p>)
            }
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase font-DancingScript tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
            E-mail
          </label>
          <input
            className="appearance-none font-poppins block w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="example@gmail.com"
            value={createFeedbackDto.email}
            // onChange={(e) => setCreateFeedbackDto({ ...createFeedbackDto, email: e.target.value })}
            onChange={handleInputChange("email")}
          >
          </input>
          <div className="h-5">
            {
              createFeedbackDto.email ? (null) : (<p className="text-red-500 text-xs italic font-poppins">Please fill out your email.</p>)
            }
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block font-DancingScript uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
            Message
          </label>
          <textarea
            value={createFeedbackDto.feedback}
            // onChange={(e) => setCreateFeedbackDto({ ...createFeedbackDto, feedback: e.target.value })}
            onChange={handleInputChange("feedback")}
            className="font-serif no-resize appearance-none block w-full bg-white bg-opacity-75 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message" placeholder="Description">
          </textarea>
          <div className="h-5">
            {
              createFeedbackDto.feedback ? (null) : (<p className="text-red-500 text-xs italic font-poppins">Please fill out your feedback here.</p>)
            }
          </div>
        </div>

      </div>

      {/* <NotificationDialog
        isOpen={true}
        main_title={"You have successfully purchased ticket"}
        discription={"A small river named Duden flows by their place and supplies it with the necessary regelialia"}
        icon={icon}
        onClick={() => { setTimeout(() => navigate('/'), 1500) }}
      /> */}
      <div className="">
        <p className="px-3 text-white text-sm italic font-mono">{text}</p>
        <button disabled={disable} className={`mt-10 mx-3 font-DancingScrip text-white ${disable ? "bg-gray-400" : "bg-[#db2777]"} font-semibold hover:text-white py-2 px-10 border border-blue hover:border-transparent rounded uppercase `}>
          Send
        </button>

      </div>


    </form >
  );
}

