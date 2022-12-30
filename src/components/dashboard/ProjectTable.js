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
import { allwithdraw } from "../../api/Blog";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { UseLoadingHook } from "../../hooks";
import { getRequest } from "../../services/apiClient";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LineChart from "../../views/Chart";
import moment from "moment/moment";
import { mytrans } from "../../api/Users";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const ProjectTables = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const handleData = (event) => {
    const name = event.target.value;
    const singleData = data.filter((item) => item.amount === parseInt(name));
    console.log(singleData);
    const dataSingle = [
      singleData[0].countOfTen,
      singleData[0].countOfTwenty,
      singleData[0].countOfFifty,
      singleData[0].countOfHundrend,
      singleData[0].countOfFiveHundrend,
      singleData[0].countOfThousand,
      singleData[0].countOfFiveThousand,
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
        data: { allTransactions },
      } = await getRequest(mytrans(), withJWT);
      setData(allTransactions);
      const singleData = allTransactions[0];

      const dataSingle = [
        singleData.countOfTen,
        singleData.countOfTwenty,
        singleData.countOfFifty,
        singleData.countOfHundrend,
        singleData.countOfFiveHundrend,
        singleData.countOfThousand,
        singleData.countOfFiveThousand,
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
      elt.countOfTen,
      elt.countOfTwenty,
      elt.countOfFifty,
      elt.countOfHundrend,
      elt.countOfFiveHundrend,
      elt.countOfThousand,
      elt.countOfFiveThousand,
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
              {data.map((item) => (
                <tr>
                  <th>{moment(item.createdAt).toISOString()}</th>
                  <th>{item.amountToBeProcessed}</th>
                  <td>{item.countOfTen === 0 ? "-" : item.countOfTen}</td>
                  <td>{item.countOfTwenty === 0 ? "-" : item.countOfTwenty}</td>
                  <td>{item.countOfFifty === 0 ? "-" : item.countOfFifty}</td>
                  <td>
                    {item.countOfHundrend === 0 ? "-" : item.countOfHundrend}
                  </td>
                  <td>
                    {item.countOfFiveHundrend === 0
                      ? "-"
                      : item.countOfFiveHundrend}
                  </td>
                  <td>
                    {item.countOfThousand === 0 ? "-" : item.countOfThousand}
                  </td>
                  <td>
                    {item.countOfFiveThousand === 0
                      ? "-"
                      : item.countOfFiveThousand}
                  </td>
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
            <option value={item.amountToBeProcessed}>
              {item.amountToBeProcessed}
            </option>
          ))}
        </Input>
      </FormGroup>
      <LineChart seriesData={series} />
    </div>
  );
};

export default ProjectTables;
