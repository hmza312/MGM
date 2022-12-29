import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { mytrans } from "../api/Users";

import { UseLoadingHook } from "../hooks";
import { getRequest } from "../services/apiClient";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LineChart from "../views/Chart";
import moment from "moment/moment";

const WithdrawHistory = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const handleData = (event) => {
    const name = event.target.value;
    const singleData = data.filter((item) => item.amount === parseInt(name));
    console.log(singleData);
    const dataSingle = [
      singleData[0].count10,
      singleData[0].count20,
      singleData[0].count50,
      singleData[0].count100,
      singleData[0].count500,
      singleData[0].count1000,
      singleData[0].count5000,
    ];
    console.log(dataSingle);
    const array = [{ data: dataSingle }];
    setSeries(array);
  };
  const handleWithdraw = async () => {
    enableLoading();
    const withJWT = true;
    try {
      const {
        data: { data },
      } = await getRequest(mytrans(), withJWT);
      setData(data);
      const singleData = data[0];

      const dataSingle = [
        singleData.count10,
        singleData.count20,
        singleData.count50,
        singleData.count100,
        singleData.count500,
        singleData.count1000,
        singleData.count5000,
      ];
      console.log(dataSingle);
      const array = [{ data: dataSingle }];
      setSeries(array);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  console.log("s", series);
  useEffect(() => {
    handleWithdraw();
  }, []);
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Exchange Report";
    const headers = [
      [
        "Date",
        "Amount",
        "Count of 10's",
        "Count of 20's",
        "Count of 50's",
        "Count of 100's",
        "Count of 500's",
        "Count of 1000's",
        "Count of 5000's",
      ],
    ];

    const tableData = data.map((elt) => [
      elt.createdAt,
      elt.amount,
      elt.count10,
      elt.count20,
      elt.count50,
      elt.count100,
      elt.count500,
      elt.count1000,
      elt.count5000,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: tableData,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Project Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <div className="d-flex justify-content-between">
              <div> </div>
              <Button onClick={exportPDF}>Pdf Download</Button>
            </div>
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
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
              {data?.map((item) => (
                <tr>
                  <th>{moment(item.createdAt).toISOString()}</th>
                  <th>{item.amount}</th>
                  <td>{item.count10 === 0 ? "-" : item.count10}</td>
                  <td>{item.count20 === 0 ? "-" : item.count20}</td>
                  <td>{item.count50 === 0 ? "-" : item.count50}</td>
                  <td>{item.count100 === 0 ? "-" : item.count100}</td>
                  <td>{item.count500 === 0 ? "-" : item.count500}</td>
                  <td>{item.count1000 === 0 ? "-" : item.count1000}</td>
                  <td>{item.count5000 === 0 ? "-" : item.count5000}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <FormGroup>
        <Label for="exampleSelectMulti">Select Transaction</Label>
        <Input
          type="select"
          name="selectMulti"
          id="exampleSelectMulti"
          onChange={handleData}
        >
          {data.map((item) => (
            <option value={item.amount}>{item.amount}</option>
          ))}
        </Input>
      </FormGroup>
      <LineChart seriesData={series} />
    </div>
  );
};

export default WithdrawHistory;
