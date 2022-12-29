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
import { feedBack } from "../api/Blog";
import { postRequest } from "../services/apiClient";
import Swal from "sweetalert2";
const Feedback = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const handleLogin = async () => {
    const values = {
      username: username,
      message: message,
    };
    enableLoading();
    try {
      const {
        data: { message },
      } = await postRequest(feedBack(), values);

      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      // window.location = "/home";
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
        <ComponentCard title="Give Feedback">
          <Row>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  // placeholder="Username Here"
                  onChange={(event) => setUsername(event.target.values)}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Message</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  // multiple
                  // Row={60}
                  // placeholder="password "
                  onChange={(event) => setMessage(event.target.values)}
                  type="textarea"
                />
              </FormGroup>

              <Button onClick={handleLogin}>
                Send Feedback{" "}
                {isLoading && (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Button>
            </Form>
          </Row>
        </ComponentCard>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
};

export default Feedback;
