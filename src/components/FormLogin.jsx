import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";

const FormLogin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.username === "" || user.password === "") {
      toast.error("Username dan Password Tidak Boleh Kosong!");
      return;
    } else {
      const newUser = {
        ...user,
        loginAt: new Date(),
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Login Berhasil!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
      <Alert variant="info">
        <strong>Info!</strong> Username dan password bebas, yang penting tidak
        diisi.
      </Alert>
      <FloatingLabel
        controlId="floatingInput"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="username"
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
        />
      </FloatingLabel>
      <Button className="mt-3 w-100" variant="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
