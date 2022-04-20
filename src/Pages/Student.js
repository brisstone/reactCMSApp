// import { Table } from 'antd';
import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, CardBody, Input, Row, Table } from "reactstrap";
import EditableRow2 from "../components/studentForm/EditableRow2";
import ReadOnlyRow2 from "../components/studentForm/ReadOnlyRow2";
import { getUser, removeUserSession } from "../Utils/Common";

export default function Student(props) {
  // const baseUrl = 'http://localhost:8000'
  const baseUrl = "https://pythocmsapi.herokuapp.com";

  // const [sudoemail, setsudoEmail] = useState('')
  const [data, setData] = useState([]);
  const [editStudentID, seteditStudentID] = useState(null);
  const [studentEmail, setstudentEmail] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    const email = sessionStorage.getItem("token") || null;

    setstudentEmail(email);

    //get student record
    getStudent(email);
  }, []);

  const getStudent = async (email) => {
    const data = await Axios.post(`${baseUrl}/getstudentinfo`, {
      email: email,
    });

    setData(data.data.userinfo);
  };

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

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

    var AdCourses;

    if (editFormData.Courses.length !== 0) {
      AdCourses = editFormData.AdCourses.split(",");
      AdCourses = [...AdCourses];
    } else AdCourses = editFormData.AdCourses;

    //to be sent back to the server
    const editedStudent = {
      id: editStudentID,
      Email: editFormData.Email || data.Email,
      FullName: editFormData.FullName,
      DateOfBirth: editFormData.DateOfBirth,
      MajorFieldOfStudy: editFormData.MajorFieldOfStudy,
      MinorFieldOfStudy: editFormData.MinorFieldOfStudy,
      Courses: editFormData.Courses,
      AdCourses: AdCourses,
      Degree: editFormData.Degree,
      // admemail: studentEmail
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
      // admemail: teacherEmail
    };

    updateRecord(editedStudent);
    //update student record
    // updateStudentRecord(editedStudent, teacherEmail)

    const newData = [...data];

    const index = data.findIndex((student) => student.id === editStudentID);

    newData[index] = editedStudentUI;

    setData(newData);

    seteditStudentID(null);
  };

  const updateRecord = async (editedStudent) => {
    try {
      const data = await Axios.post(`${baseUrl}/updteadcourses`, editedStudent);
      if (data.data[0].Success === "done") {
        setMessage("Sucessfully Uploaded..");
      } else {
        setMessage("error uploading");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="student-record">
      <div>
        Welcome Back{" "}
        {data && data.map((student) => <h4>{student.FullName}</h4>)}
      </div>

      <div className="log-out">
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
              <Table className="styled-table" striped bordered hover size="sm">
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
                    data.map((student) => (
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
                                  pathname: "/personal-student-form",
                                  student: student,
                                })
                              }
                            >
                              Edit
                            </Button>{" "}
                          </td>
                        </tr>
                      </>
                      // <Fragment>
                      //   {editStudentID === student.id ? (
                      //     <EditableRow
                      //       key={1}
                      //       editFormData={editFormData}
                      //       handleEditFormChange={handleEditFormChange}
                      //       handleCancelClick={handleCancelClick}
                      //     />
                      //   ) : (
                      //     <ReadOnlyRow
                      //       key={2}
                      //       student={student}
                      //       handleEditClick={handleEditClick}

                      //     />
                      //   )}
                      // </Fragment>
                    ))}
                </tbody>
              </Table>
            </Row>
          </Card>
        </CardBody>
      </form>
    </div>
  );
}
