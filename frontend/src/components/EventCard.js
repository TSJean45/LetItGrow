import {
  CardHeader,
  CardBody,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";

const EventCard = ({ event, desc, image }) => {
  const date = "12 Jan 2023 - 12 Feb 2023";
  return (
    <Card className="w-full max-w-[48rem] flex-row mt-5">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={image}
          alt="card"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 text-sm uppercase">
          {date}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2 text-md">
          {event}
        </Typography>
        <Typography color="gray" className="mb-8 text-sm font-normal">
          {desc}
        </Typography>
        <a href="/" className="inline-block">
          <Button variant="text" className="flex items-end gap-2">
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
        </a>
      </CardBody>
    </Card>
  );
};

export default EventCard;
