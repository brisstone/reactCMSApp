import Axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { Button, Card, CardBody, Input, Row } from "reactstrap";
import BackButton from "../components/Button/BackButton";
import EditableRow from "../components/tableDisplay/EditableRow";
import ReadOnlyRow from "../components/tableDisplay/ReadOnlyRow";
import { removeUserSession } from "../Utils/Common";
import Spinner from "../components/spinner/Spinner";
import { Select, Spin } from "antd";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import {Api} from "../Utils/Api";
const { Option } = Select;

const dataCLone = [
  {
    id: 1,
    Email: "teyo@gmail.com",
    Password: "9876",
    Adm: 1,
    FullName: "Ezekiel Man",
    DateOfBirth: "1997-11-06",
    Picture: "empty",
    SchoolStartYear: "2011",
    MajorFieldOfStudy: "Science",
    MinorFieldOfStudy: "Physics",
    Courses: "Physics1,Physics2,Physics3",
    AdCourses: "Poet1,Law3",
    Average: null,
    Comments: null,
    Suspended: 0,
    Remark: "empty",
    Degree: "BA",
  },
];

export default function AllStudentsForm(props) {
  const history = useHistory();

  const columns = [
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "FullName",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "SchoolStartYear",
      dataIndex: "SchoolStartYear",
      key: "SchoolStartYear",
    },
    {
      title: "MajorFieldOfStudy",
      dataIndex: "MajorFieldOfStudy",
      key: "MajorFieldOfStudy",
    },
    {
      title: "MinorFieldOfStudy",
      dataIndex: "MinorFieldOfStudy",
      key: "MinorFieldOfStudy",
    },
    {
      title: "Degree",
      key: "Degree",
      dataIndex: "Degree",
    },
    {
      title: "DateOfBirth",
      key: "DateOfBirth",
      dataIndex: "DateOfBirth",
    },
    {
      title: "Edit",
      key: "id",
      dataIndex: "id",
      render: (text, record) => (
        <Space size="middle">
          {/* <a>
            Invite {text} {record.id}
          </a>
          <a>Delete</a> */}
          <Button
            onClick={() =>
              history.push({
                pathname: `/student-form/${record.id}`,
                student: record,
              })
            }
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  
  const baseUrl = Api;
  

  const [teacherEmail, setTeacherEmail] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [editStudentID, seteditStudentID] = useState(null);
  const [updateData, setUpdateData] = useState([]);
  const [message, setMessage] = useState("");
  const [searchMajorFieldIn, setsearchMajorFieldIn] = useState("");
  const [rawData, setrawData] = useState([]);
  const [loading, setloading] = useState(false);
  const [sourceData, setsourceData] = useState();
  const [checkSession, setcheckSession] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  // const [teacherEmail, setteacherEmail] = useState('')

  const [editFormData, setEditFormData] = useState({
    Email: "",
    FullName: "",
    DateOfBirth: "",
    MajorFieldOfStudy: "",
    MinorFieldOfStudy: "",
    Courses: "",
    AdCourses: "",
    Degree: "",
  });

  var email;

  useEffect(() => {
    email = sessionStorage.getItem("token") || null;
    getStudentRecords(email);

    setTeacherEmail(email);
  }, [teacherEmail, checkSession]);

  const handleSearchText = async (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async (e) => {
    setshowLoader(true);

    var currentDisplayedStu = JSON.parse(sessionStorage.students);

    var storeRecords =
      currentDisplayedStu &&
      currentDisplayedStu.filter((s) =>
        s.Email.toLowerCase().includes(searchInput.toLowerCase())
      );

    sessionStorage.setItem("students", JSON.stringify(storeRecords));

    var getCurrentDisplayedStu = JSON.parse(sessionStorage.students);

    setData(getCurrentDisplayedStu);
    setshowLoader(false);
  };

  const handleMajorFieldSearch = async (value) => {
    setloading(true);

    setsearchMajorFieldIn(value);

    if (data.length !== 0) {
      if (value === "All") {
        setloading(true);

        setData(rawData);
        setloading(false);
      } else {
        setData(
          rawData &&
            data.filter((s) =>
              s.MajorFieldOfStudy.toLowerCase().includes(value.toLowerCase())
            )
        );
        setloading(false);
      }
    } else {
      setData(rawData);
      if (value === "All") {
        setloading(true);

        setData(rawData);
        setloading(false);
      } else {
        setData(
          rawData &&
            rawData.filter((s) =>
              s.MajorFieldOfStudy.toLowerCase().includes(value.toLowerCase())
            )
        );
        setloading(false);
      }
    }
  };

  useEffect(() => {}, [data, rawData]);

  const getStudentRecords = async () => {
    setshowLoader(true);
    const data = await Axios.post(`${baseUrl}/getalluser`, {
      admemail: email || teacherEmail,
    });

    setrawData(data.data.userinfo);

    var getSessionState = await sessionStorage.checksession;

    var studentsRecords = sessionStorage.students;

    if (getSessionState === "false") {
      sessionStorage.setItem("students", JSON.stringify(data.data.userinfo));
      var studentsRecords = await JSON.parse(sessionStorage.students);

      setData(studentsRecords.filter((e) => e.Adm !== 1));

      setsourceData(data.data.userinfo);
      await sessionStorage.setItem("checksession", true);
      var updatedSessionState = await sessionStorage.checksession;

      setcheckSession(true);
    } else {
      var studentsRecords = JSON.parse(sessionStorage.students);
      setData(studentsRecords.filter((e) => e.Adm !== 1));
    }

    setshowLoader(false);
  };

  useEffect(() => {}, [data, rawData]);

  //when the edit button is clicked on the immutable table
  const handleEditClick = (event, student) => {
    event.preventDefault();
    seteditStudentID(student.id); //opens the edit section

    const formValues = {
      Email: student.Email,
      FullName: student.FullName,
      DateOfBirth: student.DateOfBirth,
      MajorFieldOfStudy: student.MajorFieldOfStudy,
      MinorFieldOfStudy: student.MinorFieldOfStudy,
      Courses: student.Courses,
      AdCourses: student.AdCourses,
      Degree: student.Degree,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    seteditStudentID(null);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    var Courses;
    if (editFormData.Courses) {
      if (editFormData.Courses.length) {
        Courses = editFormData.Courses.split(",");
        Courses = [...Courses];
      } else Courses = editFormData.Courses;
    } else {
      AdCourses = "";
    }

    var AdCourses;

    if (editFormData.Courses) {
      if (editFormData.Courses.length) {
        AdCourses = editFormData.AdCourses.split(",");
        AdCourses = [...AdCourses];
      } else AdCourses = editFormData.AdCourses;
    } else {
      AdCourses = "";
    }

    // To be sent to the server
    const editedStudent = {
      id: editStudentID,
      Email: editFormData.Email || data.Email,
      FullName: editFormData.FullName,
      DateOfBirth: editFormData.DateOfBirth,
      MajorFieldOfStudy: editFormData.MajorFieldOfStudy,
      MinorFieldOfStudy: editFormData.MinorFieldOfStudy,
      Courses: Courses,
      AdCourses: AdCourses,
      Degree: editFormData.Degree,
      admemail: teacherEmail,
    };

    /// to be Updated back to the UI
    const editedStudentUI = {
      id: editStudentID,
      Email: editFormData.Email || data.Email,
      FullName: editFormData.FullName,
      DateOfBirth: editFormData.DateOfBirth,
      MajorFieldOfStudy: editFormData.MajorFieldOfStudy,
      MinorFieldOfStudy: editFormData.MinorFieldOfStudy,
      Courses: editFormData.Courses,
      AdCourses: editFormData.AdCourses,
      Degree: editFormData.Degree,
      admemail: teacherEmail,
    };

    //update student record
    updateStudentRecord(editedStudent, teacherEmail);

    const newData = [...data];

    const index = data.findIndex((student) => student.id === editStudentID);

    newData[index] = editedStudentUI;

    setData(newData);

    seteditStudentID(null);
  };

  const updateStudentRecord = async (editedStudent, email) => {
    // const data = [editedStudent, email]

    setUpdateData([...updateData, editedStudent, email]);
    try {
      const update = await Axios.post(
        `${baseUrl}/updatestudentinfo`,
        editedStudent
      );

      if (update.data[0].Success === "done") {
        setMessage("Sucessfully Uploaded..");
      } else {
        setMessage("error uploading");
      }
    } catch (err) {
      setMessage(err.response);
      console.log(err);
    }
  };

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const clearSession = async () => {
    await sessionStorage.removeItem("students");
    sessionStorage.setItem("checksession", false);
    setcheckSession(false);
    await getStudentRecords();
  };
  if (!loading) {
    if (data && data) {
      return (
        <div className="student-record" style={{ position: "relative" }}>
          {showLoader && (
            // <div>LOADING..........</div>
            <Box className="" sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          <div className="log-out">
            <BackButton style={{ backgroundColor: "green" }} />
            <input
              className="log-out-btn"
              type="button"
              onClick={handleLogout}
              value="Logout"
            />
          </div>

          <div></div>
          <div>{message}</div>

          <form onSubmit={handleEditFormSubmit}>
            <CardBody>
              <Card>
                <Row>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Input
                      placeholder="email search..."
                      style={{ height: "2rem", width: "15rem" }}
                      className="form-control"
                      onChange={handleSearchText}
                    />
                    <div>
                      <Button className="form-control" onClick={handleSearch}>
                        Search..
                      </Button>
                    </div>

                    <div>
                      <Button className="form-control" onClick={clearSession}>
                        RESET Search
                      </Button>
                    </div>
                    <div>
                      {" "}
                      {/* <div>Major Courses</div> */}
                      <div>
                        {" "}
                        <Select
                          style={{ height: "2.4rem", width: "15rem" }}
                          className="form-control"
                          onChange={handleMajorFieldSearch}
                        >
                          <Option value="All">Select</Option>
                          <Option value="All">All</Option>
                          <Option value="Science">Science</Option>
                          <Option value="Art">Art</Option>
                          <Option value="Commercial">Commercial</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Row>

                <Table
                  // scroll={{ x: true }}
                  // scroll={{ x: 400 }}
                  scroll={{ x: 400 }}
                  columns={columns}
                  dataSource={data}
                />

                {/* <Table
                  className="styled-table"
                  striped
                  bordered
                  hover
                  size="sm"
                >
                  <thead>
                    <tr className="active-row">
                      <th>Email</th>
                      <th>FullName</th>
                      <th>Date of Birth</th>
                      <th> Major Field of Study</th>
                      <th>Minor Field of Study</th>
                      <th>Courses</th>
                      <th>Additional Courses</th>
                      <th>Degree</th>

                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data
                        .filter((e) => e.Adm !== 1)
                        .map((student) => (
                          <>
                            <tr>
                              <td>{student.Email}</td>

                              <td>{student.FullName}</td>
                              <td>{student.DateOfBirth}</td>
                              <td>{student.MajorFieldOfStudy}</td>
                              <td>{student.MinorFieldOfStudy}</td>
                              <td>{student.Courses}</td>
                              <td>{student.AdCourses}</td>
                              <td>{student.Degree}</td>
                              <td>
                                <Button
                                  onClick={() =>
                                    props.history.push({
                                      pathname: "/student-form",
                                      student: student,
                                    })
                                  }
                                >
                                  Edit
                                </Button>{" "}
                              </td>
                            </tr>
                          </>
                        ))}
                  </tbody>
                </Table> */}
              </Card>
            </CardBody>
          </form>
        </div>
      );
    } else {
      return (
        <Box className="centered" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
  } else {
    return (
      <Box className="centered" sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  // if (data.length === 0) {
  //   return <div>

  //     <div onClick={()=> setData(rawData)} >Back</div>
  //     No Record
  //   </div>;
  // }
}
