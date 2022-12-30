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
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import ComponentCard from "../components/ComponentCard";
import { UseLoadingHook } from "../hooks";
import { withdraw } from "../api/Blog";
import { postRequest } from "../services/apiClient";
let total = 0;
let limits = {
  5000: 100,
  1000: 100,
  500: 100,
  100: 100,
  50: 100,
  20: 100,
  10: 100,
};
const ExchangeMoney = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [count10, setCount10] = useState(0);
  const [count20, setCount20] = useState(0);
  const [count50, setCount50] = useState(0);
  const [count100, setCount100] = useState(0);
  const [count500, setCount500] = useState(0);
  const [count1000, setCount1000] = useState(0);
  const [count5000, setCount5000] = useState(0);
  const [amount, setAmount] = useState("");
  const [possibleOptions, setPossibleOptions] = useState({});
  const [changed, setHasChanged] = useState(false);
  const getMoney = () => {
    let recur = (amount, nominals) => {
      if (amount == 0) return {}; // success
      if (!nominals.length) return; // failure
      let nominal = nominals[0];
      let count = Math.min(limits[nominal], Math.floor(amount / nominal));
      for (let i = count; i >= 0; i--) {
        let result = recur(amount - i * nominal, nominals.slice(1));
        if (result) return i ? { [nominal]: i, ...result } : result;
      }
    };
    const data = recur(
      amount,
      Object.keys(limits)
        .map(Number)
        .sort((a, b) => b - a)
    );
    setPossibleOptions(data);
  };

  const handlePrice = (value) => {
    if (total < amount) {
      if (value === 10) {
        setCount10(count10 + 1);
        total = total + 10;
      }
      if (value === 20) {
        setCount20(count20 + 1);
        total = total + 20;
      }
      if (value === 50) {
        setCount50(count50 + 1);
        total = total + 50;
      }
      if (value === 100) {
        setCount100(count100 + 1);
        total = total + 100;
      }
      if (value === 500) {
        setCount500(count500 + 1);
        total = total + 500;
      }

      if (value === 1000) {
        setCount1000(count1000 + 1);
        total = total + 1000;
      }

      if (value === 5000) {
        setCount5000(count5000 + 1);
        total = total + 5000;
      }
    } else {
      setHasChanged(true);
    }
  };
  const handleWithdraw = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const values = {
      amount: parseInt(amount),
      count10: count10,
      count20: count20,
      count50: count50,
      count100: count100,
      count500: count500,
      count1000: count1000,
      count5000: count5000,
      _id: user._id,
    };
    enableLoading();
    const withJWT = true;
    try {
      const {
        data: { message },
      } = await postRequest(withdraw(), values, withJWT);

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
      <Col md={1}></Col>
      <Col md={10}>
        <ComponentCard title="Exchange Money">
          <Row>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Enter Amount to be Exchanged</Label>
                <Input
                  id="exampleEmail"
                  name="amount"
                  onChange={(event) => setAmount(event.target.value)}
                  // placeholder="Username Here"
                  type="number"
                />
              </FormGroup>
              <Button
                className="btn"
                color="primary"
                type="button"
                onClick={getMoney}
              >
                Check Options{" "}
              </Button>
              <br />
              <Label for="exampleEmail">Possible Options for Transaction</Label>
              {Object.entries(possibleOptions).length === 0 ? (
                ""
              ) : (
                <>
                  <br />
                  <br />
                  <span>
                    {Object.keys(possibleOptions) // get keys as an array
                      .map((key) => {
                        return (
                          <span
                            style={{
                              padding: " 1rem",
                              border: "1px solid black",
                              margin: "1rem",
                            }}
                          >
                            {key}:{"  "}
                            {possibleOptions[key]}
                          </span>
                        ); // convert to integer number
                      })}
                  </span>
                  <br />
                  <br />
                </>
              )}

              <Label for="exampleEmail">Choose Amount Type</Label>
              <Row className="mb-2">
                <Col>
                  {" "}
                  {amount >= 10 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(10)}
                      disabled={changed === true ? true : false}
                    >
                      10 Rupees
                    </Button>
                  )}
                </Col>
                <Col>
                  {" "}
                  {amount >= 20 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(20)}
                      disabled={changed === true ? true : false}
                    >
                      20 Rupees
                    </Button>
                  )}
                </Col>
                <Col>
                  {" "}
                  {amount >= 50 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(50)}
                      disabled={changed === true ? true : false}
                    >
                      50 Rupees
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  {" "}
                  {amount >= 100 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(100)}
                      disabled={changed === true ? true : false}
                    >
                      100 Rupees
                    </Button>
                  )}
                </Col>
                <Col>
                  {" "}
                  {amount >= 500 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(500)}
                      disabled={changed === true ? true : false}
                    >
                      500 Rupees
                    </Button>
                  )}
                </Col>
                <Col>
                  {" "}
                  {amount >= 1000 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(1000)}
                      disabled={changed === true ? true : false}
                    >
                      1000 Rupees
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  {" "}
                  {amount >= 5000 && (
                    <Button
                      className="btn"
                      color="success"
                      onClick={() => handlePrice(5000)}
                      disabled={changed === true ? true : false}
                    >
                      5000 Rupees
                    </Button>
                  )}
                </Col>
              </Row>
              <FormGroup>
                <Label for="exampleEmail">Total Amount Selected</Label>
                <Input
                  value={total}
                  // placeholder="Username Here"
                  type="number"
                />
              </FormGroup>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Count of 10's</th>
                    <th>Count of 20's</th>
                    <th>Count of 50's</th>
                    <th>Count of 100's</th>
                    <th>Count of 500's</th>
                    <th>Count of 1000's</th>
                    <th>Count of 5000's</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{count10 === 0 ? "-" : count10}</td>
                    <td>{count20 === 0 ? "-" : count20}</td>
                    <td>{count50 === 0 ? "-" : count50}</td>
                    <td>{count100 === 0 ? "-" : count100}</td>
                    <td>{count500 === 0 ? "-" : count500}</td>
                    <td>{count1000 === 0 ? "-" : count1000}</td>
                    <td>{count5000 === 0 ? "-" : count5000}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className="btn"
                color="primary"
                type="button"
                onClick={handleWithdraw}
              >
                Exchange{" "}
                {isLoading && (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Button>
            </Form>
          </Row>
        </ComponentCard>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
};

export default ExchangeMoney;
