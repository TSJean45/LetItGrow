import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  Input,
  Avatar,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ClassesCard = ({ className, desc, image }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const date = "March 30, 2024"; // Static date for demonstration

  return (
    <>
      <Card className="mt-6 w-auto flex flex-col">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={image} alt="card" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {className}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 mt-auto flex items-center justify-between">
          <Typography color="blue-gray">{date}</Typography>
          <Button onClick={handleOpen} color="green">
            Learn More
          </Button>
        </CardFooter>
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
            {className}
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
          <Button color="gray" size="sm">
              Free Download
            </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ClassesCard;
