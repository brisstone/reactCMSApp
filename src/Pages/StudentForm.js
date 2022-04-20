import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { getUser, removeUserSession } from "../Utils/Common";
import axios from "axios";
import {
  EditorState,
  ContentState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Entity,
  convertToRaw,
  CompositeDecorator,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "../../node_modules/draft-js/dist/Draft.css";
import "../../src/components/richeditor.css";
import { Radio, Select } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import 'draft-js/dist/Draft.css';
// import '../node_modules/draft-js/dist/Draft.css'

import "../index.css";
import { Base64 } from "js-base64";
import Countdown from "antd/lib/statistic/Countdown";
import Modal from "../components/modal/Modal";
import BackButton from "../components/Button/BackButton";
import {
  RiCheckboxCircleFill,
  RiEye2Fill,
  RiEye2Line,
  RiEyeCloseLine,
} from "react-icons/ri";
import Spinner from "../components/spinner/Spinner";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../Utils/Api";

// import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const { Option } = Select;


export default function StudentForm(props) {

  const baseUrl = Api;

  const user = getUser();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [password, setPassword] = useState("");

  // determines if a file has been picked or not
  const [isSelected, setIsSelected] = useState(false);
  const [majorfieldvalue, setMajorfieldvalue] = useState("");
  const [minorfieldvalue, setMinorfieldvalue] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [extraCourseList, setExtraCourseList] = useState([]);
  const [errorType, setErrorType] = useState(true);
  const [startYear, setStartYear] = useState(null);
  const [selectedFile, setSelectedFile] = useState({
    myFile: "",
  });
  const [suspended, setSuspended] = useState(false);
  // const [avgGrade, setAvgGrade] = useState('')
  const [comment, setComment] = useState("");

  const [showPassword, setshowPassword] = useState(true);
  const [editorState, setEditorState] = React.useState(
    // () => props.location.student && student.Remark
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(
          `<p>${props.location.student && props.location.student.Remark} </p>`
        )
      )
    )
  );

  const [degree, setDegree] = useState("");

  const [checkState, setCheckState] = useState(true);
  // const [cloneType2, setCloneType2] = useState([])
  const [collectCourseList, setCollectCourseList] = useState([]);
  const [imageShow, setImageShow] = useState();
  var cloneType2 = [];

  // check editorbox, if it's empty
  const [checkEditorBox, setCheckEditorBox] = useState(false);
  //control modal
  const [isOpen, setIsOpen] = useState(false);

  const [sudoemail, setsudoEmail] = useState("");
  const [student, setstudent] = useState();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [data, setData] = useState();
  const [showLoader, setshowLoader] = useState(false);
  // const [loading, setloading] = useState(initialState)

  const param = useParams();
  const { studentid } = param;

  var Temail;

  useEffect(() => {
    // setsudoEmail(props.match.params.email)

    setshowLoader(true);
    Temail = sessionStorage.getItem("token") || null;
    getStudentRecords(Temail);

    // setstudent(props?.location?.student);

    setStartYear(student && student.SchoolStartYear);
    setDegree(student && student.Degree);
    setComment(student && student.Comments);
    setMinorfieldvalue(student && student.MinorFieldOfStudy);
    setMajorfieldvalue(student && student.MajorFieldOfStudy);

    if (student && student.Suspended == 1) {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
    setshowLoader(false);
  }, []);

  const getStudentRecords = async (Temail) => {
    const data = await Axios.post(`${baseUrl}/getalluser`, {
      admemail: Temail,
    });

    setstudent(
      data.data.userinfo.filter((e) => `${e.id}` === `${studentid}`)[0]
    );

    setData(data.data.userinfo);
  };

  useEffect(() => {
    Temail = sessionStorage.getItem("token") || null;
    getStudentRecords(Temail);

    if (allNewCoursesClone.length === 0) {
      setExtraCourseList(student && student.AdCourses.split(",").map((e) => e));
      setStartYear(student && student.SchoolStartYear);
      setComment(student && student.Comments);
      setDegree(student && student.Degree);
      setMinorfieldvalue(student && student.MinorFieldOfStudy);
      setMajorfieldvalue(student && student.MajorFieldOfStudy);
    }

    if (student && student.Suspended == 1) {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  }, [student]);

  useEffect(() => {
    var emailp = sessionStorage.getItem("token") || null;

    setTeacherEmail(emailp);
  }, [teacherEmail]);

  var Stor = false;
  const html = '<p id="para">asdfsd</p>';

  const Science = ["Biology", "Physics", "Chemistry"];
  const Commercial = ["Account", "Business", "Credit"];
  const Art = ["Law", "Poet", "Singer"];

  const Biology = ["Biology1", "Biology2", "Biology3"];
  const Physics = ["Physics1", "Physics2", "Physics3"];
  const Chemistry = ["Chemistry1", "Chemistry2", "Chemistry3"];
  const Account = ["Account1", "Account2", "Account3"];
  const Business = ["Business1", "Business2", "Business3"];
  const Credit = ["Credit1", "Credit2", "Credit3"];
  const Law = ["Law1", "Law2", "Law3"];
  const Poet = ["Poet1", "Poet2", "Poet3"];
  const Singer = ["Singer1", "Singer2", "Singer3"];
  const [allNewCoursesClone, setallNewCoursesClone] = useState([]);

  var allCourses = [
    "Biology1",
    "Biology2",
    "Biology3",
    "Physics1",
    "Physics2",
    "Physics3",
    "Chemistry1",
    "Chemistry2",
    "Chemistry3",
    "Account1",
    "Account2",
    "Account3",
    "Business1",
    "Business2",
    "Business3",
    "Credit1",
    "Credit2",
    "Credit3",
    "Law1",
    "Law2",
    "Law3",
    "Poet1",
    "Poet2",
    "Poet3",
    "Singer1",
    "Singer2",
    "Singer3",
  ];

  /** Type variable to store different array for different dropdown */
  let type = null;
  let type2 = null;

  /** This will be used to create set of options that user will see */
  let options = null;
  let checkboxes = true;

  /** Setting Type variable according to dropdown */
  if (majorfieldvalue === "Science") {
    type = Science;
  } else if (majorfieldvalue === "Commercial") {
    type = Commercial;
  } else if (majorfieldvalue === "Art") {
    type = Art;
  }
  // set type variables for sub minor dropdown
  if (minorfieldvalue === "Biology") {
    type2 = Biology;
  } else if (minorfieldvalue === "Physics") {
    type2 = Physics;
  } else if (minorfieldvalue === "Chemistry") {
    type2 = Chemistry;
  } else if (minorfieldvalue === "Account") {
    type2 = Account;
  } else if (minorfieldvalue === "Business") {
    type2 = Business;
  } else if (minorfieldvalue === "Credit") {
    type2 = Credit;
  } else if (minorfieldvalue === "Law") {
    type2 = Law;
  } else if (minorfieldvalue === "Poet") {
    type2 = Poet;
  } else if (minorfieldvalue === "Singer") {
    type2 = Singer;
  }

  /** If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on our array
   */
  if (type) {
    options = type.map((el) => (
      <option value={el} key={el}>
        {el}
      </option>
    ));
  }

  var color;
  //Modal color
  if (errorType) {
    color = "green";
  } else {
    color = "red";
  }

  useEffect(() => {
    setsudoEmail(props.match.params.email);
  }, []);

  const handleViewStudentS = () => {
    // props.history.push(`/student-records`)

    props.history.push(`/all-students-record;`);
  };

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  function majorFieldChangeHandler(event) {
    setMajorfieldvalue(event.target.value);
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFullnameOnChange = (e) => {
    var value = e.target.value;
    setFullname(value);
  };

  const handlePasswordOnChange = async (e) => {
    var value = e.target.value;
    // Encrypt

    setPassword(Base64.encode(value));
  };

  const handleEmailOnChange = (e) => {
    var value = e.target.value;
    setEmail(value);
  };

  const handleDateofbirthOnChange = (e) => {
    var value = e.target.value;
    setDateOfBirth(value);

    // setCourseList(courseList => [...courseList,value] );
  };

  const handleStartyearOnChange = (e) => {
    var value = e.target.value;

    //inserted to make the editor and image selection empty & prevent catch error of not been filled
    setEditorState("empty");

    setStartYear(value.replace(/[^\d.]/gi, ""));
  };

  function handleMinorfieldOnChange(value) {
    setMinorfieldvalue(value);
  }

  var newallCourses;

  useEffect(() => {
    newallCourses = student && student.Courses;
  }, [student]);

  const allcoursesField = useCallback(
    (e) => {
      newallCourses = allCourses.filter((el) => !type2.includes(el));
    },
    [type2]
  );

  useEffect(() => {
    if (allNewCoursesClone.length === 0) {
      extraCourseList &&
        extraCourseList.map(
          (e) => setallNewCoursesClone(newallCourses.filter((el) => el !== e))
        
        );
    } else {
      extraCourseList &&
        extraCourseList.map(
          (e) =>
            setallNewCoursesClone(allNewCoursesClone.filter((el) => el !== e))
         
        );
    }
  }, [extraCourseList, newallCourses]);


  if (type2) {
    Stor = true;

  
    cloneType2 = [...new Set(type2)];

   

    allcoursesField();
  }



  const handleExtraCourseOnClick = (value) => {
    //  var value = e.target.value;
   

    setExtraCourseList((extraCourseList) => [...extraCourseList, value]);
  };

 

  const handleDeleteExtracourse = (e) => {
    e.preventDefault();
    var value = e.target.value;
   
    setExtraCourseList(extraCourseList.filter((a) => a !== value));
    setallNewCoursesClone((allNewCoursesClone) => [
      ...allNewCoursesClone,
      value,
    ]);
  };

  const handleRadioOnChange = (e) => {
    var value = e.target.value;
    setDegree(value);
  };

  const onRichEditorStateChange = (editorState) => {
    setEditorState(editorState.getCurrentContent().getPlainText());
  };

  const onEditorStateChange = (e) => [setEditorState(e.target.value)];

  const handleSuspensionChange = () => {
    setSuspended(!suspended);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImageShow(fileReader.result);
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    // return btoa(file);
  };

  const fileSelectorHandler = async (e) => {
    const file = e.target.files[0];

    const base64 = await convertToBase64(file);
    setSelectedFile({ ...selectedFile, myFile: base64 });

    setIsSelected(true);
  };

  useEffect(() => {}, [selectedFile]);

  const handleOnChange = useCallback(
    (e) => {
      var value = e.target.value;

      setCheckState(false);

      let NewCourses;

      if (e.target.checked) {
        //remove checked course to collectcourselist, which later gets filtered out on based on cloneType2 button submission click

        NewCourses = collectCourseList.filter((a) => a !== value);
        setCollectCourseList(NewCourses);
        // setCourseList(NewCourses);
      } else if (!e.target.checked) {
        //add unchecked course to collectcourselist, which later gets filtered out on button submission click

        setCollectCourseList((collectCourseList) => [
          ...collectCourseList,
          value,
        ]);
      }
    },
    [cloneType2, collectCourseList]
  );

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setshowLoader(true);

    var editorClone;

    //filter to get the unchecked courselist (i.e wanted courses)
    let selectedCourse = cloneType2.filter(
      (e) => !collectCourseList.includes(e)
    );

    var image = {};

    if (selectedFile.myFile === "") {
      // setSelectedFile({ ...selectedFile, myFile: "empty,empty" });
      if (student.Picture) {
        image = {
          ...selectedFile,
          myFile: `data:image/jpeg;base64,${student.Picture}`,
        };
      } else {
        //  setSelectedFile({ ...selectedFile, myFile: "empty,empty" });
        image = { ...selectedFile, myFile: "empty,empty" };
      }
    }

    if (editorState._immutable) {
      setEditorState("noComment");
      editorClone = student?.Remark;
    }

    if (startYear.length < 4) {
      setshowLoader(false);
      setErrorType(false);
      setIsOpen(true);
      setMessage("Start Year Length is less than 4");
    } else if (!degree) {
      setshowLoader(false);
      setErrorType(false);
      setIsOpen(true);
      setMessage("Select Degree");
    } else if (minorfieldvalue.length === 0) {
      setshowLoader(false);
      setErrorType(false);
      setMessage("Select Courses");
    } else if (extraCourseList.length === 0) {
      setshowLoader(false);
      setErrorType(false);
      setMessage("Select Additional Courses");
    } else {
      const editedStudentUI = {
        id: student.id,
        Email: student.Email,
        FullName: fullname || student.FullName,
        DateOfBirth: dateOfBirth || student.DateOfBirth,
        MajorFieldOfStudy: majorfieldvalue || student.MajorFieldOfStudy,
        MinorFieldOfStudy: minorfieldvalue || student.MinorFieldOfStudy,
        Courses: selectedCourse || student.selectedCourse,
        AdCourses: extraCourseList || student.AdCourses,
        Degree: degree || student.Degree,
        SchoolStartYear: startYear || student.SchoolStartYear,
        Password: password || Base64.encode(student.Password),
        Suspended: suspended,
        Remark: editorClone || editorState || student.Remark,

        Picture:
          (image.myFile && image) ||
          selectedFile ||
          (student && `data:image/jpeg;base64,${student.Picture}`),
        // || student.Picture,
        Comments: comment || student.Comments,

        admemail: teacherEmail,
      };

      try {
        const data = await axios.post(
          `${baseUrl}/updatestudentinfo`,
          editedStudentUI
        );
        if (data.data[0].Success === "done") {
          setshowLoader(false);
          setIsOpen(true);
          //  setIsOpen(true);

          setMessage("Sucessfully Uploaded..");
          // updateRecord()
        }
      } catch (err) {}
    }
  };

  useEffect(() => {

  }, [majorfieldvalue, collectCourseList, cloneType2, editorState]);

  function handleMajorFieldChange(value) {
    setMajorfieldvalue(value);
  }
  return (
    <>
      <div
        className="text-center progress-bar progress-bar-striped progress-bar-animated badge"
        style={{
          backgroundColor: "#009ef7",
          color: "#fff",
          padding: "4px",
          borderRadius: "20px",
        }}
      >
        <RiCheckboxCircleFill style={{ color: "#7367F0" }} />
      </div>

      {showLoader && (
        <Box className="centered" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}

      {/* <Circular */}
      {/* {!loading ? <>jj</> 
    
      
      
      : <Spinner />} */}
      <div className="teacher">
        <BackButton />
        <input
          type="button"
          className="removeBtn"
          onClick={handleLogout}
          value="Logout"
        />
        <div className="errorMsg">
          <div style={{ color: "red" }}> {error}</div>

          {errorType ? (
            <div className="successMsg">
              <h3 style={{ color: "green" }}>{message}</h3>
            </div>
          ) : (
            <div className="failureMsg">
              <h3 style={{ color: "red" }}>{message}</h3>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {" "}
            <h3>
              {" "}
              <b>Update Student's Record</b>
            </h3>{" "}
          </div>{" "}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <div>
            {" "}
            <b>{student ? ` Student Name: ${student.FullName}` : ""}</b>{" "}
          </div>{" "}
          <div>
            {" "}
            <img
              style={{ width: "80px", height: "80px" }}
              src={student && `data:image/jpeg;base64,${student.Picture}`}
            />
          </div>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="input-container">
            <label className="parameter"> FullName</label>
            <input
              type="name"
              value={student && student.FullName}
              placeholder="name"
              onChange={handleFullnameOnChange}
              required
            />
          </div>

          <div className="input-container">
            <label className="parameter"> Email</label>
            <input
              type="email"
              value={student && student.Email}
              placeholder="email"
              onChange={handleEmailOnChange}
              required
              readonly
            />
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label className="parameter">Password</label>
              <div>
                {" "}
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="password"
                  defaultValue={student && student.Password}
                  onChange={handlePasswordOnChange}
                  required
                />
              </div>

              {showPassword ? (
                <div
                  className="form-control"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  <RiEye2Fill style={{ fontSize: "30px" }} />
                </div>
              ) : (
                <div onClick={() => setshowPassword(!showPassword)}>
                  <RiEye2Line style={{ fontSize: "30px" }} />
                </div>
              )}
            </div>
          </div>

          <div className="input-container">
            <label className="parameter">Date of birth</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              defaultValue={student && student.DateOfBirth}
              onChange={handleDateofbirthOnChange}
              required
            />
          </div>

          <div className="input-container">
            <label className="parameter">School Start Year</label>
            <input
              maxLength="4"
              type="text"
              defaultValue={student && student.SchoolStartYear}
              placeholder="School Start"
              onChange={handleStartyearOnChange}
              required
            />
          </div>

          <div className="input-container">
            <legend className="parameter">Degree:</legend>
            <Radio.Group onChange={handleRadioOnChange} value={degree}>
              <Radio value="BA">BA</Radio>
              <Radio value="BSc">BSc</Radio>
              <Radio value="MBA">MBA</Radio>
              <Radio value="PHD">PHD</Radio>
            </Radio.Group>
          </div>

          <div className="input-container">
            <label className="parameter">Major Field of Study</label>

            <Select
              value={majorfieldvalue}
              style={{ width: 120 }}
              onChange={handleMajorFieldChange}
            >
              <Option value="Science">Science</Option>
              <Option value="Art">Art</Option>
              <Option value="Commercial">Commercial</Option>
            </Select>
          </div>

          <div className="input-container">
            <label className="parameter">Minor Field of Study</label>

            <Select
              // defaultValue="select"
              value={minorfieldvalue}
              style={{ width: 120 }}
              onChange={handleMinorfieldOnChange}
            >
              <Option value="select">select</Option>
              {options}
            </Select>
          </div>

          <div className="showCourses">
            <div className="input-container">
              <label className="parameter"> Course List</label>

              {type2 ? (
                type2.map((el) => (
                  <div key={el}>
                    <label htmlFor={el}>
                      {el}

                      <input
                        type="checkbox"
                        defaultChecked={checkState}
                        id="inline"
                        name={el}
                        value={el}
                        onChange={handleOnChange}
                      />
                    </label>
                  </div>
                ))
              ) : (
                <label>&nbsp;</label>
              )}
            </div>

            <div>
              <div>
                <label> Other Courses</label>
              </div>

              <Select
                style={{ width: 120 }}
                onChange={handleExtraCourseOnClick}
                defaultValue="Select"
              >
                <Option value="" key="">
                  Select
                </Option>

                {allNewCoursesClone ? (
                  allNewCoursesClone.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))
                ) : (
                  <div>&nbsp;</div>
                )}
              </Select>
              <div className="extraCourselist">
                {extraCourseList &&
                  extraCourseList.map((e) => (
                    <div>
                      {e}
                      <button
                        className="removeBtn"
                        value={e}
                        onClick={handleDeleteExtracourse}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="input-container">
            <label className="parameter">Image</label>
            <input type="file" onChange={fileSelectorHandler} />
            {isSelected ? <p>Image selected</p> : <p>Image not yet selected</p>}

            {isSelected && (
              <img style={{ height: "80px", width: "80px" }} src={imageShow} />
            )}
          </div>

          <div className="input-container">
            <label className="parameter">Suspended</label>
            <input
              value={student && student.Suspended}
              type="checkbox"
              checked={suspended}
              onChange={handleSuspensionChange}
            />
          </div>

          <div className="input-container">
            <label className="parameter">Comment</label>
            <div>
              <textarea
                defaultValue={student && student.Comments}
                className="areaText"
                onChange={handleCommentChange}
                placeholder="teachers' comment"
              />
            </div>
          </div>

          <div className="Editor">
            <label>Teacher's REmark</label>
            <Editor
              defaultEditorState={editorState}
              onEditorStateChange={onRichEditorStateChange}
            />
          </div>

          <button className="primary" type="submit">
            Update
          </button>
        </form>
        {isOpen && (
          <Modal
            color={color}
            error={error}
            sucesss={message}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </>
  );
}
