import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { BiFontFamily } from "react-icons/bi";
 
export function NotificationDialog() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} className="bg-[#db2777]">Notification</Button>
      <Dialog open={open} handler={handleOpen} className="h-96">
        <DialogBody  className="grid place-items-center gap-4 mt-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#db2777"/>
            <path d="M44.1746 15.0009L41.7617 17.4371C36.3421 22.9207 30.6054 29.1138 25.192 34.6861L17.954 28.6674L15.3286 26.4819L11 31.8017L13.6254 33.9872L23.2762 42.0116L25.6712 44L27.8531 41.779C33.9784 35.5813 40.601 28.3469 46.5872 22.2905L49 19.8543L44.1743 15L44.1746 15.0009Z" fill="white"/>
            </svg>
          {/* <CheckIcon/> */}
          <Typography style={{color: "#db2777",}} variant="h4">
            You have successfully purchased ticket
          </Typography>
          <Typography className="text-center font-normal">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2 lg:mt-10">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button className="text-white bg-pink-700" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}