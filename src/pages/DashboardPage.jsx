import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaPlusSquare, FaSave } from "react-icons/fa";
import ReservationContent from "../components/ReservationContent";
import { toast } from "sonner";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  //Modal Handler
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Tambah Ruangan");

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setTitleModal("Tambah Ruangan");
    setEditState(false);
    setEditIndex(null);
    setForm({
      date: "",
      room: "",
      price: "",
      purpose: "",
    });
  };

  //Data
  const [rooms, setRooms] = useState([]);

  //Form Handler
  const [form, setForm] = useState({
    date: "",
    room: "",
    price: "",
    purpose: "",
  });
  const [editState, setEditState] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const onSubmit = () => {
    if (!form.date || !form.room || !form.price || !form.purpose) {
      toast.error("Semua form harus diisi!");
      return;
    } else {
      const data = {
        date: form.date,
        room: form.room,
        price: form.price,
        purpose: form.purpose,
      };
      if (editState) {
        setRooms(rooms.map((room, idx) => (idx === editIndex ? data : room)));
        setEditState(false);
        setEditIndex(null);
        setTitleModal("Tambah Ruangan");
        toast.success("Berhasil Update Data Ruang Rapat!");
      } else {
        setRooms([...rooms, data]);
        toast.success("Berhasil Update Data Ruang Rapat!");
      }
      setForm({
        date: "",
        room: "",
        price: "",
        purpose: "",
      });
      handleClose();
    }
  };

  const deleteRoom = (index) => {
    setRooms(rooms.filter((room, idx) => idx !== index));
    toast.success("Berhasil Menghapus Data Ruang Rapat!");
  };

  const onEditRoom = (index) => {
    setForm({
      date: rooms[index].date,
      room: rooms[index].room,
      price: rooms[index].price,
      purpose: rooms[index].purpose,
    });
    setEditIndex(index);
    setEditState(true);
    setTitleModal("Edit Ruangan");
    handleShow();
  };

  return (
    <>
      <Container className="mt=5">
        <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
        <Row className="mb-4">
          <Col md={10}>
            <Card className="h-100 justify-content-center">
              <Card.Body>
                <h4>Selamat datang,</h4>
                <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                <p className="mb-0">Kamu usdah login sejak:</p>
                <p className="mb-0 lead fw-bold">{formatDate(user?.loginAt)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Body>
                <p>Bukti sedang ngantor:</p>
                <img
                  src="https://via.placeholder.com/150"
                  className="img-fluid rounded"
                  alt="Tidak Ada Gambar"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h1 className="mb-3 border-bottom fw-bold">Daftar Reservasi Ruangan</h1>
        <p className="mt-2">
          Saat ini terdapat <span className="fw-bold">0</span> reservasi yang
          akan mendatang
        </p>
        <Button
          variant="success"
          className="d-flex align-items-center mb-3"
          onClick={handleShow}
        >
          <FaPlusSquare className="me-2" /> Tambah Ruangan
        </Button>
        {rooms.length > 0
          ? rooms.map((room, key) => (
              <ReservationContent
                data={room}
                key={key}
                onDelete={() => deleteRoom(key)}
                onEdit={() => onEditRoom(key)}
              />
            ))
          : null}
      </Container>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="fw-bold">{titleModal}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Tanggal pemesanan</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="room" className="mb-3">
              <Form.Label>Ruangan Yang Dipesan</Form.Label>
              <Form.Select
                aria-label="room selection"
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                value={form.room}
              >
                <option>Pilih Ruangan</option>
                <option value="Rapat">Ruangan Rapat</option>
                <option value="Seminar">Ruangan Seminar</option>
                <option value="Diskusi">Ruangan Diskusi</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Biaya Pemesanan</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="purpose" className="mb-3">
              <Form.Label>Tujuan Penggunaan</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            className="d-flex align-items-center"
          >
            <FaSave className="me-2" /> Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardPage;
