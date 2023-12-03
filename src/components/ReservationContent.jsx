import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Diskusi from "../assets/images/diskusi.jpeg";
import Rapat from "../assets/images/rapat.jpg";
import Seminar from "../assets/images/seminar.jpg";

export default function ReservationContent({ data, onDelete, onEdit }) {
  return (
    <Card>
      <Card.Body>
        <Row className="w-100">
          <Col md={3}>
            <img
              src={
                data?.room === "Diskusi"
                  ? Diskusi
                  : data?.room === "Rapat"
                  ? Rapat
                  : Seminar
              }
              className="rounded img-fluid"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col>
            <h3>Ruang {data?.room}</h3>
            <p className="my-0 fs-5">Untuk Keperluan:</p>
            <p>{data?.purpose}</p>
            <hr />
            <p>
              Tanggal Penggunaan: <strong className="fs-5">{data?.date}</strong>
              . Harga:
              <strong className="fs-5"> RP {data?.price}</strong>
            </p>
            <div className="d-flex">
              <Button
                variant="danger"
                className="d-flex align-items-center me-2"
                onClick={onDelete}
              >
                <FaTrashAlt className="me-2" />
                Hapus Ruangan
              </Button>
              <Button
                variant="primary"
                className="d-flex align-items-center me-2"
                onClick={onEdit}
              >
                <FaEdit className="me-2" />
                Edit Ruangan
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
