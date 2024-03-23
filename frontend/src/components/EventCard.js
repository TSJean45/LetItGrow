import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  Input,
  Avatar,
  DialogBody,
  DialogFooter,
  Chip 
} from "@material-tailwind/react";

const EventCard = ({ event, desc, image }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const date = "12 Jan 2023 - 12 Feb 2023";
  return (
    <>
      <Card className="w-full max-w-[48rem] flex-row mt-5">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img src={image} alt="card" className="h-full w-full object-cover" />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h6"
            color="gray"
            className="mb-4 text-sm uppercase"
          >
            {date}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2 text-md">
            {event}
          </Typography>
          <Typography color="gray" className="mb-8 text-sm font-normal">
            {desc}
          </Typography>

          <Button
            variant="text"
            onClick={handleOpen}
            className="flex items-end gap-2"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </CardBody>
      </Card>

      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="max-h-[80vh] overflow-y-auto"
      >
        <DialogBody>
          <img
            alt="nature"
            className="h-[20rem] w-full rounded-lg object-cover object-center"
            src={image}
          />
          <Typography className="font-bold text-2xl text-black mt-5">
            {event}
          </Typography>
          <Typography className="font-medium text-md text-black">
            {desc}
          </Typography>

          <div className="flex items-center gap-16 mt-10">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Uploaded Date
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                2024-10-12
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                People Joined
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                2000
              </Typography>
            </div>
          </div>

          <div className="items-center gap-3 mt-5">
            <Typography className="font-bold text-2xl text-black mt-5">
              100 comments
            </Typography>
            <div className="flex mt-5">
              <Avatar
                size="sm"
                variant="circular"
                alt="tania andrew"
                className="mr-10"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <Input label="Write Something" size="lg" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between">
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Share
          </Button>
          <Button color="green" size="sm">
            Join Event
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EventCard;
