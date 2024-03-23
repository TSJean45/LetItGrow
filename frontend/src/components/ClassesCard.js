import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  const ClassesCard = ({ className, desc, image }) => {
    const date = "March 30, 2024"; // Static date for demonstration
  
    return (
      <Card className="mt-6 w-auto flex flex-col">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={image}
            alt="card"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {className}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 mt-auto flex items-center justify-between">
          <Typography color="blue-gray">{date}</Typography>
          <Button color="green">Learn More</Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default ClassesCard;
  