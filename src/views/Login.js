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
import { signin } from "../api/Auth";
import { postRequest } from "../services/apiClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const About = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const { setAuthToken, storeUser } = UseAuthentication();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/register");
  };
  const handleLogin = async () => {
    const values = {
      username: username,
      password: password,
    };
    enableLoading();
    try {
      const {
        data: {
          data: { token, user },
          message,
        },
      } = await postRequest(signin(), values);
      setAuthToken(token);
      storeUser(user);
      localStorage.setItem("role", user.role);
      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      window.location = "/home";
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
    <Row className="p-5">
      <Col md={3}></Col>
      <Col md={6}>
        <ComponentCard title="Login">
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
              <Button onClick={handleLogin}>
                Login{" "}
                {isLoading && (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Button>
            </Form>
          </Row>
        </ComponentCard>
        <span>Dont Have an Account? </span>
        <Button onClick={handleNavigate}>Register</Button>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
};

export default About;
