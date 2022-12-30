/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import ComponentCard from "../components/ComponentCard";
import "./index.css";
import { postRequest } from "../services/apiClient";
import { transferMoney } from "../api/Users";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const values = {
      transactionTo: username,
      amountToBeProcessed: parseInt(amount),
    };
    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log("[error]", error);
    } else {
      try {
        const data = await postRequest(transferMoney(), values, true);
      } catch (e) {}
      Swal.fire({
        text: "Payment Transfer Done Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          padding: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <form
          // style={{
          //   display: "block",
          //   width: "100%",
          // }}
          // onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label for="exampleEmail">Enter Username</Label>
              <Input
                id="exampleEmail"
                name="username"
                // placeholder="Username Here"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Enter Amount To Be Transfered </Label>
              <Input
                id="exampleEmail"
                name="amount"
                onChange={(event) => setAmount(event.target.value)}
                // placeholder="Username Here"
                type="number"
              />
            </FormGroup>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <Label for="exampleEmail">Enter Card Details</Label>
              <CardElement
                className="card"
                options={{
                  style: {
                    base: {
                      backgroundColor: "white",
                    },
                  },
                }}
              />
              <button
                className="pay-button"
                onClick={handleSubmit}
                // type="submit"
                // onClick={handleTransfer}
                // disabled={total === 0 ? true : false}
              >
                {"Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button> */}
    </form>
  );
};

const TransferMoney = () => {
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <ComponentCard title="Transfer Money">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </ComponentCard>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default TransferMoney;
