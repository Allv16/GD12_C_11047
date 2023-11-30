import { Container, Row, Col, Card } from "react-bootstrap";

import ImageCarouusel from "../components/ImageCarousel";

import imgHotel1 from "../assets/images/hotel1.jpg";
import imgHotel2 from "../assets/images/hotel2.jpg";
import imgHotel3 from "../assets/images/hotel3.jpg";
import imgFeaturette1 from "../assets/images/featurette-1.jpeg";
import imgFeaturette2 from "../assets/images/featurette-2.jpeg";

const images = [
  {
    img: imgHotel1,
    title: "First slide lable",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    img: imgHotel2,
    title: "Second slide lable",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    img: imgHotel3,
    title: "Third slide lable",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
];

const HomePage = () => {
  return (
    <>
      <ImageCarouusel images={images} />
      <Container className="mt-5">
        <Row>
          <Col md={7}>
            <h2 className="fw-normal">
              Hotel pertama dan satu-satunya <strong>yang fiksional</strong>.
            </h2>
            <p className="lead">
              Diciptakan oleh <strong>[[Yohanes Alvian Wijaya Irawan]]</strong>,
              mahasiswa Universitas Atma Jaya Yogyakarta dari program studi
              Informatika.
            </p>
            <p className="lead">
              Nomor Pokok Mahasiswa: <strong>[[210711047]]</strong>.
            </p>
          </Col>
          <Col md={5}>
            <img
              src={imgFeaturette1}
              alt=""
              className="img-fluid mx-auto rounded shadow"
              aria-label="Gambar featurette 1"
            />
          </Col>
        </Row>
        <hr className="mt-5 mb-5" />
        <Row>
          <Col md={7} className="order-md-2">
            <h2 className="fw-normal">
              Your comfort is key,{" "}
              <strong>experience the heartbeat of our hotel</strong>.
            </h2>
            <p className="lead">
              Our modern, sophisticated guest rooms are designed to exceed
              expetation with premium comfort, technology, where you need it,
              and thoughtful attention to detail.
            </p>
          </Col>
          <Col md={5} className="order-md-1">
            <img
              src={imgFeaturette2}
              alt=""
              className="img-fluid mx-auto rounded shadow"
              aria-label="Gambar featurette 2"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
