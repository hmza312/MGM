import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Table,
} from "reactstrap";

import { UseLoadingHook } from "../hooks";
import { getRequest } from "../services/apiClient";
import { mytrans } from "../api/Users";

const TransferTables = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);

  const handleWithdraw = async () => {
    enableLoading();
    const withJWT = true;
    try {
      const data = await getRequest(mytrans(), withJWT);
      console.log(data.data.data);
      setData(data.data.data);

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

    const title = "My Transfer Report";
    const headers = [["Date", "Amount", "User"]];

    const tableData = data.map((elt) => [elt.createdAt, elt.amount, "Machine"]);

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
          <CardTitle tag="h5">Transfer History</CardTitle>
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
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr>
                  <th>{moment(item.createdAt).toISOString()}</th>
                  <th>{item.amount}</th>
                  <td>Machine</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TransferTables;
