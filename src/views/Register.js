/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import ComponentCard from "../components/ComponentCard";
import { UseLoadingHook, UseAuthentication } from "../hooks";
import { signin, signup } from "../api/Auth";
import { postRequest } from "../services/apiClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const { setAuthToken, storeUser } = UseAuthentication();
  const navigate = useNavigate();
  const handleNaviagate = () => {
    navigate("/login");
  };
  const handleConfirmPassword = (event) => {
    if (event.target.value === password) {
      setConfirmPassword(event.target.value);
      setError("");
    } else {
      setError("Password doesnot matched");
    }
  };
  const handleRegister = async () => {
    const values = {
      username: username,
      password: password,
      isAdmin: false,
    };
    enableLoading();
    try {
      const {
        data: { message },
      } = await postRequest(signup(), values);

      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      window.location = "/login";
      disableLoading();
    } catch (e) {
      Swal.fire({
        text: e.response.data.message,
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
    }
  };

  return (
    <Row>
      <Col md={3}></Col>
      <Col md={6}>
        <ComponentCard title="Register">
          <Row>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input
                  id="exampleEmail"
                  name="username"
                  placeholder="Username Here"
                  type="text"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="password "
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Confirm Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Confirm Password "
                  type="password"
                  onChange={handleConfirmPassword}
                />
                {error != "" && <span>{error}</span>}
              </FormGroup>
              <Button onClick={handleRegister}>
                Register{" "}
                {isLoading && (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Button>
            </Form>
          </Row>
        </ComponentCard>
        <span>Do Have an Account? </span>
        <Button onClick={handleNaviagate}>Login</Button>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
};

export default Register;
