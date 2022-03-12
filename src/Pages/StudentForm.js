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
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "../../node_modules/draft-js/dist/Draft.css";
import "../../src/components/richeditor.css";

// import 'draft-js/dist/Draft.css';
// import '../node_modules/draft-js/dist/Draft.css'

import "../index.css";
import { Base64 } from "js-base64";
import Countdown from "antd/lib/statistic/Countdown";
import Modal from "../components/modal/Modal";
import BackButton from "../components/Button/BackButton";

// import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

export default function StudentForm(props) {
  // const baseUrl = "http://localhost:8000";
  const baseUrl = "https://pythocmsapi.herokuapp.com";

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
  // const [editorState, setEditorState] = React.useState(
  //   () =>
  //     // EditorState.createEmpty()
  //     ""
  // );

  const [editorState, setEditorState] = useState("");
  // setEditorState("empty")
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

  useEffect(() => {
    // setsudoEmail(props.match.params.email)
    // props.location.state;
    setstudent(props.location.student);
    console.log(student, "sjsjsj");
    setStartYear(student && student.SchoolStartYear);
    setComment(student && student.Comments);
    setMinorfieldvalue(student && student.MinorFieldOfStudy);
    setMajorfieldvalue(student && student.MajorFieldOfStudy);

    if (student && student.Suspended == 1) {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  }, []);

  const updateRecord = () => {
    setstudent(props.location.student);
  };

  useEffect(() => {
    // setsudoEmail(props.match.params.email)
    // props.location.state;
    setstudent(props.location.student);
    console.log(student, "sjsjsj");
    setStartYear(student && student.SchoolStartYear);
    setComment(student && student.Comments);
    setMinorfieldvalue(student && student.MinorFieldOfStudy);
    setMajorfieldvalue(student && student.MajorFieldOfStudy);

    if (student && student.Suspended == 1) {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
    // console.log(sudoemail, 'jjjjjj')
    // email = sessionStorage.getItem("token") || null;
    // getStudentRecords(email);
    // console.log(email, "kkstttttttttt");
    // setTeacherEmail(email);
    // console.log(teacherEmail, "rrrrrrrrrrrrrrrrrooooooooooooooorrrrrrrrrrro");
  }, [student]);

  console.log(
    student,
    minorfieldvalue,
    student && student.MinorFieldOfStudy,
    "kkkkkkkkj"
  );

  useEffect(() => {
    // setsudoEmail(props.match.params.email)
    // console.log(sudoemail, 'jjjjjj')
    var emailp = sessionStorage.getItem("token") || null;
    // getStudentRecords(email);
    // console.log(email, "kkstttttttttt");
    setTeacherEmail(emailp);
    console.log(teacherEmail, "rrrrrrrrrrrrrrrrrooooooooooooooorrrrrrrrrrro");
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

  //   const [checkedState, setCheckedState] = useState(
  //     new Array(toppings.length).fill(false)
  // );

  const allCourses = [
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
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  // const newallCourses = type2.forEach((e)=>{
  //   allCourses.filter(course => course !== e)
  // })

  // console.log(type2)
  console.log(newallCourses);

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
    console.log(majorfieldvalue);
    console.log(event.target);
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFullnameOnChange = (e) => {
    var value = e.target.value;
    setFullname(value);
  };

  // const convertToBase64 = (file) => {
  //       return new Promise((resolve, reject) => {
  //         const fileReader = new FileReader();
  //         fileReader.readAsDataURL(file);
  //         fileReader.onload = () => {
  //           resolve(fileReader.result);
  //         };
  //         fileReader.onerror = (error) => {
  //           reject(error);
  //         };
  //       });
  //     };

  const handlePasswordOnChange = async (e) => {
    var value = e.target.value;
    // Encrypt

    // var ciphertext = Base64.stringify(CryptoJS.AES.encrypt(value, 'secret key 123').toString());
    // const nonce = "jay"
    // const hashDigest = SHA256(value);
    // const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

    // var passbase64 = await convertToBase64(value)

    // const encryptedString = cryptr.encrypt(value);

    setPassword(Base64.encode(value));
    // setPassword(encryptedString)

    // setPassword(value)
    console.log(password);
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
    // if (!selectedFile) {
    //   setSelectedFile({ ...selectedFile, myFile: "empty,empty" });
    // }

    setStartYear(value.replace(/[^\d.]/gi, ""));

    // setCourseList(courseList => [...courseList,value] );
  };

  const handleMinorfieldOnChange = (e) => {
    var value = e.target.value;
    setMinorfieldvalue(value);
    // setCourseList(courseList => [...courseList,value] );
  };

  var newallCourses;

  useEffect(() => {
    newallCourses = student && student.Courses;
    //  console.log()
    console.log(newallCourses, student && student.Courses, "kiiiiiiiuu");
  }, [student]);

  console.log(newallCourses, "kkjkuuiuiu");
  const allcoursesField = useCallback(
    (e) => {
      console.log(type2);

      console.log(newallCourses);
      newallCourses = allCourses.filter((el) => !type2.includes(el));
    },
    [type2]
  );

  console.log(cloneType2);

  if (type2) {
    Stor = true;

    console.log(type2);
    cloneType2 = [...new Set(type2)];

    console.log(cloneType2);

    // type2.map(e=>{
    //   cloneType2  =
    // })
    // setCourseList(type2)

    //    type2.map((e)=>{
    //    console.log(e)
    //   cloneType2 = [...cloneType2,e]
    // //   newallCourses = allCourses.filter(course => course !== e)

    //  })

    allcoursesField();
  }

  console.log(cloneType2);

  const handleExtraCourseOnClick = useCallback(
    (e) => {
      var value = e.target.value;
      console.log(e.target.value);

      setExtraCourseList((extraCourseList) => [...extraCourseList, value]);
    },
    [extraCourseList]
  );

  console.log(extraCourseList);

  const handleDeleteExtracourse = (e) => {
    e.preventDefault();
    var value = e.target.value;
    console.log(value);
    setExtraCourseList(extraCourseList.filter((a) => a !== value));
  };

  // const handleAddExtracourse = (e)=>{
  //   e.preventDefault()
  //   var value = e.target.value
  //   console.log(value)
  //   setExtraCourseList(extraCourseList => [...extraCourseList,value] );

  // }

  const handleRadioOnChange = (e) => {
    var value = e.target.value;
    setDegree(value);
  };

  // const onEditorStateChange = useCallback(
  //   (rawcontent) => {
  //     setCheckEditorBox(true);
  //     console.log(rawcontent);
  //     setEditorState(rawcontent.blocks[0].text);
  //   },
  //   [editorState]
  // );

  const onEditorStateChange = (e)=>[
    setEditorState(e.target.value)
  ]

  const handleSuspensionChange = () => {
    setSuspended(!suspended);
  };

  // const handleAvgOnChange = (e)=>{
  //   var value = e.target.value
  //   setAvgGrade(value)
  //   // setCourseList(courseList => [...courseList,value] );

  // }

  //convert file upload to base64
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
      
  //       setImageShow(fileReader.result);
  //         resolve();
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };


    const convertToBase64 = (file) => {
      console.log(file, "djjddj");
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
    console.log('oipi')
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const base64 = await convertToBase64(file);
    setSelectedFile({ ...selectedFile, myFile: base64 });

    console.log(selectedFile, 'lkkkss');
    setIsSelected(true);
  };

  useEffect(() => {}, [selectedFile]);

  const handleOnChange = useCallback(
    (e) => {
      console.log(e.target.checked);
      var value = e.target.value;
      // var checkboxchecked = e.target.checked

      //uncheck the checkbox
      setCheckState(false);

      // setCourseList(cloneType2)

      console.log(e.currentTarget);
      console.log(value);
      console.log(courseList);

      let NewCourses;
      // e.target.checked = "false"
      if (e.target.checked) {
        //remove checked course to collectcourselist, which later gets filtered out on based on cloneType2 button submission click

        NewCourses = collectCourseList.filter((a) => a !== value);
        setCollectCourseList(NewCourses);
        // setCourseList(NewCourses);
        console.log("mik");
      } else if (!e.target.checked) {
        //add unchecked course to collectcourselist, which later gets filtered out on button submission click
        console.log("llllllll", courseList);
        setCollectCourseList((collectCourseList) => [
          ...collectCourseList,
          value,
        ]);
        console.log(collectCourseList);

        console.log("MEEE", value);

        // NewCourses =  courseList.filter((a) => a !== value);
        // setCourseList(NewCourses);
        // var index = cloneType2.indexOf(value);
        // if (index > -1) {
        //   var update = delete cloneType2[index];
        //   // cloneType2 = [update]
        //   cloneType2.splice(index, 1);
        // }
        // console.log(cloneType2)
        // return cloneType2;

        // cloneType2[1] = value

        // const clon =cloneType2.filter(a => {
        //   console.log(a)
        //   return a != value
        // });
        // console.log(cloneType2)
      }
    },
    [cloneType2, collectCourseList]
  );

  console.log(courseList);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(degree);

    console.log(extraCourseList, "lllll");

    //filter to get the unchecked courselist (i.e wanted courses)
    let selectedCourse = cloneType2.filter(
      (e) => !collectCourseList.includes(e)
    );

    var image = {};
    console.log(selectedFile, "mdddd");
    if (selectedFile.myFile === "") {
      console.log("111");
      // setSelectedFile({ ...selectedFile, myFile: "empty,empty" });
      if (student.Picture) {
        console.log("112");
        // setSelectedFile({ ...selectedFile, myFile: student.Picture });
        console.log("117");
        image = {
          ...selectedFile,
          myFile: `data:image/jpeg;base64,${student.Picture}`,
        };
      } else {
        console.log("113");
        //  setSelectedFile({ ...selectedFile, myFile: "empty,empty" });
        image = { ...selectedFile, myFile: "empty,empty" };
        console.log("114");
      }
    }

    if (editorState._immutable) {
      console.log("111");
      setEditorState("empty");
    }

    if (startYear.length < 4) {
      setErrorType(false);
      setIsOpen(true);
      setMessage("Start Year Length is less than 4");
    } else if (!degree) {
      setErrorType(false);
      setIsOpen(true);
      setMessage("Select Degree");
    } else if (minorfieldvalue.length === 0) {
      setErrorType(false);
      setMessage("Select Courses");
    } else if (extraCourseList.length === 0) {
      setErrorType(false);
      setMessage("Select Additional Courses");
    } else {
      // https://pythocmsapi.herokuapp.com

      console.log(suspended, 'jdjjdjd');

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

        Suspended: suspended,
        Remark: editorState || student.Remark,

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
          setMessage("Sucessfully Uploaded..");
          // updateRecord()
        }
      } catch (err) {
        console.log(err, "kssks");
      }
    }
  };

  useEffect(() => {
    console.log(majorfieldvalue);
    console.log(courseList);
    console.log(collectCourseList);
  }, [majorfieldvalue, collectCourseList, cloneType2, editorState]);

  console.log(errorType);
  return (
    <div className="teacher">
      {/* {user.name}! */}
      {/* Welcome Teacher: {user} <br />
      <br /> */}
      {console.log(user)}
      {/* <input
        type="button"
        className="removeBtn"
        onClick={handleViewStudentS}
        value="View Student Records"
      /> */}
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
            <h3>{message}</h3>
          </div>
        ) : (
          <div className="failureMsg">
            <h3>{message}</h3>
          </div>
        )}
      </div>
      <div>Update Students Record</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: "20px",
        }}
      >
        <div> <b>{student ? ` Student Name: ${student.FullName}` : ""}</b> </div>{" "}
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

        <div className="input-container">
          <label className="parameter"> Fullname</label>
          <input
            type="text"
            defaultValue={student && student.FullName}
            // value={student && student.FullName}
            placeholder="full-name"
            onChange={handleFullnameOnChange}
            required
            // readonly="readonly"
          />
          {/* <input /> */}
        </div>

        {/* <div>
          <label className="parameter">Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={handlePasswordOnChange}
            required
          />
        </div> */}

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
          <div>
            <b>Current Degree</b>: {student && student.Degree}
          </div>

          <fieldset
            // defaultValue={student && student.Degree}
            // value="BSc"
            onChange={handleRadioOnChange}
            required
          >
            <legend className="parameter">Degree</legend>
            {/* common name attribute */}
            <label className="degreechk">
              <input name="degree" type="radio" value="BA" />
              BA
            </label>
            <label className="degreechk">
              <input name="degree" type="radio" value="BSc" />
              BSc
            </label>
            <label className="degreechk">
              <input name="degree" type="radio" value="PHD" />
              PHD
            </label>
          </fieldset>
        </div>

        <div className="input-container">
          <label className="parameter">Major Field of Study</label>
          <select
            onChange={majorFieldChangeHandler}
            defaultValue={majorfieldvalue}
            required
          >
            {/* {console.log("fo", e)} */}
            <option value="Science" key="1">
              Science
            </option>
            <option value="Art" key="2">
              Art
            </option>
            <option value="Commercial" key="3">
              Commercial
            </option>
          </select>
        </div>

        <div className="input-container">
          <label className="parameter">Minor Field of Study</label>
          <select
            onChange={handleMinorfieldOnChange}
            defaultValue={minorfieldvalue}
            required
          >
            <option>select</option>
            {options}
          </select>
        </div>

        <div className="showCourses">
          <div className="input-container">
            <label className="parameter"> Course List</label>
            <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              <b> Current COurses</b>
              {/* {console.log(student && student.Courses, "opop")} */}
              {student && student.Courses?.split(",").map((e) => <div>{e}</div>)}
            </div>

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
            {/* <label>Other</label> */}
            <div>
              <label> Other Courses</label>
            </div>

            {/* {student && student.AdCourses.map((e) => <div>e</div>)} */}
            <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              <b>Current Additional COurses</b>
              {student &&
                student.AdCourses?.split(",").map((e) => <div>{e}</div>)}
            </div>
            <select
              onChange={handleExtraCourseOnClick}
              // value={student && student.AdCourses}
            >
              <option value="" key="">
                Select
              </option>

              {newallCourses ? (
                newallCourses.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))
              ) : (
                <div>&nbsp;</div>
              )}
            </select>
            <div className="extraCourselist">
              {extraCourseList.map((e) => (
                <div>
                  {e}
                  <button
                    className="removeBtn"
                    value={e}
                    onClick={handleDeleteExtracourse}
                  >
                    Remove
                  </button>
                  {/* <button value={e} onClick={handleAddExtracourse}>Add</button> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="input-container">
          <label className="parameter">Image</label>
          <input
            type="file"
            onChange={fileSelectorHandler}
          
          />
          {isSelected ? <p>Image selected</p> : <p>Image not yet selected</p>}

          {isSelected && (
            <img style={{ height: "80px", width: "80px" }} src={imageShow} />
          )}
        </div> 

        {/* <div className="input-container">
          <label className="parameter">Image</label>
          <input type="file" onChange={fileSelectorHandler} />
          {isSelected ? <p>Image selected</p> : <p>Image not yet selected</p>}
        </div> */}

        {/* <div className="input-container">
           <label className="parameter" >Average Grade</label>
           <label>
                <input type="text" value={avgGrade} placeholder="average grade" onChange={handleAvgOnChange} required />
             </label>
          
        </div> */}

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
              // value={comment}
              onChange={handleCommentChange}
              placeholder="teachers' comment"
            />
          </div>
        </div>

        {/* <div className="Editor">
          <label>Teacher's REmark</label>
          <Editor
            // defaultValue={student && student.Remark}
            // editorState={editorState}
            onChange={onEditorStateChange}
          />
        </div> */}

        <div className="input-container">
          <label className="parameter">Teacher's REmark</label>
          <div>
            <textarea
              defaultValue={student && student.Remark}
              className="areaText"
              // value={comment}
              onChange={onEditorStateChange}
              placeholder="teachers' Remark"
            />
          </div>
        </div>

        <button className="primary" type="submit">
          Register
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
  );
}
