import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5" className="text-primary">
          {props.title}
        </CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text}</CardText>
        {/* <Button color={props.color}>Read More</Button> */}
      </CardBody>
    </Card>
  );
};

export default Blog;
