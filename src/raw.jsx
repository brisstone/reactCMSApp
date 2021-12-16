// import React, {useState, useEffect, useCallback} from 'react';
// import ReactDOM from 'react-dom';
// import { getUser, removeUserSession } from './Utils/Common';
// import axios from 'axios';
// import {
//   EditorState, ContentState, RichUtils, 
//   getDefaultKeyBinding, KeyBindingUtil,
//   Entity, convertToRaw, CompositeDecorator
// } from 'draft-js'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// // import {EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import '../node_modules/draft-js/dist/Draft.css'
// import '../src/components/richeditor.css'
// // import RichTextEditor from './components/RichTextEditor';
// import './index.css'
// // import e from 'cors';
// // import EditorJS from '@editorjs/editorjs';
// // import EditorConvertToText from './components/EditorConvertToText';
// // const editor = new EditorJS();
// import htmlToDraft from 'html-to-draftjs';





// export default function Teacher(props) {
//   const user = getUser();


//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [email, setEmail] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState(null);
//   const [selectedFile, setSelectedFile] = useState({
//     myFile: "",
//   });
//   // determines if a file has been picked or not
//   const [isSelected, setIsSelected] = useState(false);
//   const [majorfieldvalue, setMajorfieldvalue] = useState('Science');
//   const [minorfieldvalue, setMinorfieldvalue] = useState('');
//   const [courseList, setCourseList] = useState([])
//   const [extraCourseList, setExtraCourseList] = useState([])
//   const [avgGrade, setAvgGrade] = useState('')
//   const [suspended, setSuspended] = useState(false);
//   const [comment, setComment] = useState('');
//   const [startYear, setStartYear] = useState(null);
//   const [editorState, setEditorState] = React.useState(
//     () => EditorState.createEmpty(),
//   );
//   const [editorValue, setEditorValue] = useState('')
//   const [BA, setBA] = useState("BA")
//   const [BSc, setBSc] = useState("BSc")
//   const [PHD, setPHD] = useState("PHD")
//   const [degree, setDegree] = useState('')
  


//   var remove = false;
//   const html = '<p id="para">asdfsd</p>';
  
  

//   const Science = ["Biology", "Physics", "Chemistry"]
//   const Commercial = ["Account", "Business", "Credit"]
//   const Art = ["Law", "Poet", "Singer"]


// const Biology = ["Biology1", "Biology2", "Biology3"]
// const Physics = ["Physics1", "Physics2", "Physics3"]
// const Chemistry = ["Chemistry1", "Chemistry2", "Chemistry3"]
// const Account = ["Account1", "Account2", "Account3"]
// const Business = ["Business1", "Business2", "Business3"]
// const Credit = ["Credit1", "Credit2", "Credit3"]
// const Law = ["Law1", "Law2", "Law3"]
// const Poet = ["Poet1", "Poet2", "Poet3"]
// const Singer = ["Singer1", "Singer2", "Singer3"]

// //   const [checkedState, setCheckedState] = useState(
// //     new Array(toppings.length).fill(false)
// // );

// const allCourses = ["Biology1", "Biology2", "Biology3", "Physics1", "Physics2", "Physics3", "Chemistry1", "Chemistry2", "Chemistry3", "Account1", 
//                   "Account2", "Account3", "Business1", "Business2", "Business3", "Credit1", "Credit2", "Credit3", "Law1", "Law2", "Law3", "Poet1", 
//                   "Poet2", "Poet3", "Singer1", "Singer2", "Singer3" ]




//   /** Type variable to store different array for different dropdown */
//   let type = null;
//   let type2 = null;
  
//   /** This will be used to create set of options that user will see */
//   let options = null;
//   let checkboxes = true;
  
//   /** Setting Type variable according to dropdown */
//   if (majorfieldvalue === "Science") {
//     type = Science;
//   } else if (majorfieldvalue === "Commercial") {
//     type = Commercial;
//   } else if (majorfieldvalue === "Art") {
//     type = Art;
//   }
//   // set type variables for sub minor dropdown
//   if (minorfieldvalue === "Biology") {
//     type2 = Biology;
//   } else if (minorfieldvalue === "Physics") {
//     type2 = Physics;
//   } else if (minorfieldvalue === "Chemistry") {
//     type2 = Chemistry;
//   }else if (minorfieldvalue === "Account") {
//     type2 = Account;
//   } else if (minorfieldvalue === "Business") {
//     type2 = Business;
//   }else if (minorfieldvalue === "Credit") {
//     type2 = Credit;
//   } else if (minorfieldvalue === "Law") {
//     type2 = Law;
//   }else if (minorfieldvalue === "Poet") {
//     type2 = Poet;
//   } else if (minorfieldvalue === "Singer") {
//     type2 = Singer;
//   }

  

  
//   /** If "Type" is null or undefined then options will be null,
//    * otherwise it will create a options iterable based on our array
//    */
//   if (type) {
//     options = type.map((el) => <option key={el}>{el}</option>);
//   }

  
  
// // const newallCourses = type2.forEach((e)=>{
// //   allCourses.filter(course => course !== e)
// // })

 
//   console.log(type2)
//   console.log(newallCourses)




    

//   // handle click event of logout button
//   const handleLogout = () => {
//     removeUserSession();
//     props.history.push('/login');
//   }

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//   const fileSelectorHandler = async(e) =>{
//     console.log(e.target.files[0])
//     const file = e.target.files[0];
//     const base64 = await convertToBase64(file);
//     setSelectedFile({ ...selectedFile, myFile: base64 });

//     console.log(selectedFile)
//     setIsSelected(true)



    
//   }
//   console.log(selectedFile)

//   function majorFieldChangeHandler(event){
//     setMajorfieldvalue(event.target.value)
//     console.log(majorfieldvalue)
//     console.log(event.target)
//   }

//   const handleSuspensionChange = () => {
//     setSuspended(!suspended);
//   };

//   const handleCommentChange = (e)=>{
//       setComment(e.target.value)
//   }

//   const handleFullnameOnChange = (e)=>{
//     var value = e.target.value
//     setFullname(value) 
//   }

  
//   const handleEmailOnChange = (e)=>{
//     var value = e.target.value
//     setEmail(value) 
//   }



//   const handleDateofbirthOnChange = (e)=>{
//     var value = e.target.value
//     setDateOfBirth(value)
    
//     // setCourseList(courseList => [...courseList,value] );
    
//   }

//   const handleStartyearOnChange = (e)=>{
//     var value = e.target.value
    
//     setStartYear(value)
   
//     // setCourseList(courseList => [...courseList,value] );
    
//   }

//   const handleMinorfieldOnChange = (e)=>{
//     var value = e.target.value
//     setMinorfieldvalue(value)
//     // setCourseList(courseList => [...courseList,value] );
//   }
//   const handleAvgOnChange = (e)=>{
//     var value = e.target.value
//     setAvgGrade(value)
//     // setCourseList(courseList => [...courseList,value] );
    
//   }

//   const handleRadioOnChange = (e)=>{
//       var value = e.target.value;
//      setDegree(value);
//   }
//   console.log(degree)

// //Fetch editor props from child
//  console.log("lllljspro", editorValue)

//   // const contentState = editorState.getCurrentContent();



//   const onEditorStateChange = useCallback((rawcontent)=>{
//     console.log(rawcontent)
//     setEditorState(rawcontent.blocks[0].text)
//     // console.log("jjjjjjjjjjjjjjjjjjjpppppp", convertToRaw(editorState.getCurrentContent()).blocks[0].text)
    

    
//   }, [editorState])

//   console.log(editorState)

//   // useEffect(() => {
 
  
//   // }, [editorState])

//   var newallCourses
//   const allcoursesField = useCallback((e) => {
//     console.log(type2)
//     // if(type2){
//     //    type2.map((e)=>{
//     //   newallCourses = allCourses.filter(course => course !== e)
  
//     //  })
//     // }

//     console.log(newallCourses)
//       newallCourses = allCourses.filter(el=> !type2.includes(el))
  
//   }
// , [type2])


// if(type2){
//   allcoursesField()
// }


   
// const handleExtraCourseOnClick = useCallback((e) => {
//   var value = e.target.value
//   console.log(e.target.checked)

//   if (e.target.checked){
//     //append to array
    
//     setExtraCourseList(extraCourseList => [...extraCourseList,value] );
   
//   } else if (!e.target.checked){
//     //remove from array
   
//     setExtraCourseList(extraCourseList.filter((a) => a !== value));
//  }
// }, [extraCourseList])


//   console.log(extraCourseList)



//   const handleOnClick = useCallback((e) => {
//     var value = e.target.value
//     let NewCourses

//     if (e.target.checked){
//       //append to array
//       setCourseList(courseList => [...courseList,value] );
     
//     } else if(!e.target.checked) {
//       //remove from array

//       console.log("MEEE", e.target)
//       console.log(typeof(value))

//       NewCourses =  courseList.filter((a) => a !== value);
//       setCourseList(NewCourses);

    
//    }
//   }, [courseList])


//   console.log(courseList)

//   const config = {
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// };

//   const submitHandler = (e) =>{
//       e.preventDefault();
    
//       console.log(selectedFile)
//       console.log(selectedFile)
   

//     console.log(editorValue);

//       axios.post('https://pythocmsapi.herokuapp.com/admregister', {Adm: "", email: email,  Picture: selectedFile, FullName: fullname, DateOfBirth: dateOfBirth, SchoolStartYear: startYear, MajorFieldOfStudy: majorfieldvalue, MinorFieldOfStudy: minorfieldvalue, Courses: courseList, AdCourses: extraCourseList, Average: avgGrade, Comments: comment,  Suspended: suspended, Degree: degree, Remark: editorState}).then(response => {
//             setLoading(false);
//             console.log(response)
//             console.log(response.data)
//             // var reply = response.data;
//             // var jsonData = JSON.parse(JSON.stringify(response));
//             // console.log(jsonData)
//             // console.log(typeof(jsonData.data))
//             if(response.status===200){
//               setMessage(response.data)
//             }else{
//               setMessage("ERROR IN STORING")
//             }
            
          
//         }).catch(error => {
//           setLoading(false);
//           console.log(error);
//           if (error.status === 401) setMessage(error.response.data.message);
//           else setMessage("DUPLICATE EMAIL");
          
//         });

           
//   }
  
//     useEffect(() => {
//       console.log(majorfieldvalue)
//       console.log(courseList)
//     }, [majorfieldvalue])

//   return (
//     <div>
//       {/* {user.name}! */}
//       Welcome Teacher: {user} <br /><br />
//       {Error}
//       {console.log(user)}
//       <input type="button" onClick={handleLogout} value="Logout" />

//       <form className="form" onSubmit={submitHandler} >
//           <div>
//             {message? message: error }
//           </div>
//         <div>
//           Register Students
//         </div>

//         <div className="input-container">
//           <label className="parameter"> Email</label>
//         <input type="email" placeholder="email" onChange={handleEmailOnChange} required  />
//         </div>

//         <div className="input-container">
//           <label className="parameter"> Fullname</label>
//         <input type="text" placeholder="full-name" onChange={handleFullnameOnChange} required />
//         </div>
        
//         <div className="input-container">
//           <label className="parameter" >Date of birth</label>
//           <input type="date" id="birthday" name="birthday" onChange={handleDateofbirthOnChange} required/>
//         </div>
        
//         <div className="input-container">
//           <label className="parameter" >Image</label>
//           <input type="file" onChange = {fileSelectorHandler} required/>
//                 {isSelected ? (
//                 <p>Image selected</p>
//             ) : (
//               <p>Image not yet selected</p>
//             )}
//         </div>
        
//         <div className="input-container">
//           <label className="parameter" >School Start Year</label>
//         <input type="date" placeholder="School Start" onChange={handleStartyearOnChange} required/>
//         </div>
        
//         <div className="input-container">
//           <label className="parameter">Major Field of Study</label>
//           <select onChange={majorFieldChangeHandler} value={majorfieldvalue} required>
//             {/* {console.log("fo", e)} */}
//             <option value="Science" key="1">Science</option>
//             <option value="Art" key="2">Art</option>
//             <option value="Commercial" key="3">Commercial</option>
//           </select>
//         </div>

//         <div className="input-container">
//         <label className="parameter">Minor Field of Study</label>
//           <select onChange={handleMinorfieldOnChange} value={minorfieldvalue} required>
//               <option>select</option>
//              {options}
//           </select>
         
//         </div>
        
//         <div className="showCourses" >
//             <div className="input-container" >
//               <label className="parameter"> Course List</label>
//               {
//                 type2? type2.map((el) => (
//                   <div key={el}>
//                     <label htmlFor={el} >{el}
//                       <input type="checkbox" name={el} value={el}   onChange={handleOnClick}/>
//                     </label>
                    
//                   </div>
//                 ) ) : <label>&nbsp;</label>
//               }
            
//             </div>

//             <div>
//             {/* <label>Other</label> */}
//                     <div>
//                       <label > Other Courses</label>
//                     </div>
//               {newallCourses? newallCourses.map(e =>(
//                 <div >              
//                     <label htmlFor={e}>{e}</label>
//                     <label> <input type="checkbox"  key = {e} value={e} onChange={handleExtraCourseOnClick}/></label>
//                 </div>
                
//               )) : <label>&nbsp;</label>}
//             </div>
        
//         </div> 
        
//         <div className="input-container">
//             <label className="parameter" >Average Grade</label>
//             <label>
//                <input type="text" value={avgGrade} placeholder="average grade" onChange={handleAvgOnChange} required />
//             </label>
          
//         </div>
        
//         <div className="input-container">
//           <label className="parameter">Comment</label>
//           <div >
//              <textarea className="areaText" value={comment} onChange={handleCommentChange} required placeholder="teachers' comment" />
//           </div>
       
//         </div>
        
//         <div className="input-container">
//           <label className="parameter">Suspended</label>
//         <input type="checkbox" checked={suspended} onChange={handleSuspensionChange} required/>
//         </div>

//         <div className="input-container">

//           <fieldset onChange={handleRadioOnChange} required>
//             <legend className="parameter">Degree</legend>
//             {/* common name attribute */}
//               <label className="degreechk"><input  name="degree" type="radio" value={BA}  />BA</label>
//               <label className="degreechk"><input   name="degree" type="radio" value={BSc}  />BSc</label>
//               <label className="degreechk" ><input name="degree" type="radio" value={PHD} />PHD</label>
//           </fieldset>
//         </div>
        
//           <div >
//             <label >Teacher's REmark</label>
//             <Editor required
//             // editorState={editorState}
//             onChange={onEditorStateChange}
           
//            />
           
//           </div>
         


//           <button className="primary" type="submit">
//             Register
//           </button>
//           {message}



//       </form>
//     </div>
//   );
// }
