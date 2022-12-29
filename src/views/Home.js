/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import Blog from "../components/dashboard/Blog";

const BlogData = [
  {
    image: bg1,
    title: "Login to your Account",
    // subtitle: "2 comments, 1 Like",
    description:
      "It takes just a few minutes, and all you need is an email address.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Add Debit Card Details",
    // subtitle: "2 comments, 1 Like",
    description: "Enter User Account Number and Card Details",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: " Confirm and send",
    // subtitle: "2 comments, 1 Like",
    description: "Check amount are correct, send your money transfer",
    btnbg: "primary",
  },
  // {
  //   image: bg4,
  //   title: "Simple is beautiful",
  //   subtitle: "2 comments, 1 Like",
  //   description:
  //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
  //   btnbg: "primary",
  // },
];

const Home = () => {
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col md={6} xs={12}>
          <div
            style={{
              padding: "3rem",
              textAlign: "justify",
              fontSize: "large",
              fontFamily: "auto",
            }}
          >
            <h4> MONEY EXCHANGE ---------</h4>
            <p>
              Foreign exchange rates impact the global trade volume throughout
              the world, and are traded as currency pairs and currency funds by
              online forex traders. These rates effect how business gets done
              between the countries of the world, and will effect both travelers
              and traders. These rates are determined by a lot of simultaneous
              factors that can impact how much your vacation will cost you if
              you’re a traveler. If you are travelling overseas to visit a
              country for a vacation, you will have an entirely different set of
              needs that if you are a forex trader looking to hedge your
              international investments, but we can help you to understand both
              with our currency exchange rates table.
            </p>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <img
            src={
              "https://tourumbrella.com/wp-content/uploads/2021/06/66120-exchange-money-de-foreign-currency-rate-bureau.png"
            }
            className="w-75 h-100"
            alt="Image"
          />
        </Col>
      </Row>
      <h5 className="mb-3 text-center text-primary">How To Do Transfer</h5>
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="4" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Row>
        <h5 className="mb-3 mt-3">Alignment Text</h5>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-warning">Go somewhere</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-danger">Go somewhere</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-end">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-success">Go somewhere</Button>
            </div>
          </Card>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Row>
        <h5 className="mb-3 mt-3">Colored Card</h5>
        <Col md="6" lg="3">
          <Card body color="primary" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="info" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="success" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="danger" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-warning">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-info">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
      </Row> */}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-Group*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <h5 className="mb-3 mt-3 text-center text-primary ">Blogs</h5>
        <Col>
          <CardGroup>
            <Card>
              <CardImg alt="Card image cap" src={bg1} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                {/* <Button>Button</Button> */}
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src={bg2} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </CardText>
                {/* <Button>Button</Button> */}
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src={bg3} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </CardText>
                {/* <Button>Button</Button> */}
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>{" "}
    </div>
  );
};

export default Home;
