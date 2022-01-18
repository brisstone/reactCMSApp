import Axios from 'axios'
import React, {useEffect, useState, Fragment} from 'react'
import { Button, Card, CardBody, Input, Row, Table } from 'reactstrap'
import EditableRow from '../components/tableDisplay/EditableRow'
import ReadOnlyRow from '../components/tableDisplay/ReadOnlyRow'
import { removeUserSession } from '../Utils/Common'



export default function StudentRecords(props) {

  // const baseUrl = 'http://localhost:8000'
  const baseUrl = 'https://pythocmsapi.herokuapp.com'


    const [teacherEmail, setTeacherEmail] = useState('')

    const [searchInput, setSearchInput] = useState('')
    const [data, setData] = useState([])
    const [editStudentID, seteditStudentID] = useState(null);
    const [updateData, setUpdateData] = useState([]);
    const [message, setMessage] = useState('')
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



    // useEffect(() => {

        
    
    // }, [])

    var email

    useEffect(() => {

    
        // setsudoEmail(props.match.params.email)
        // console.log(sudoemail, 'jjjjjj')
        email = sessionStorage.getItem('token') || null;
        getStudentRecords(email)
        console.log(email, 'kkstttttttttt')
        setTeacherEmail(email)
        console.log(teacherEmail, 'rrrrrrrrrrrrrrrrrooooooooooooooorrrrrrrrrrro')
      
      }, [teacherEmail])
    

    const handleSearch = async(e)=>{

        setSearchInput(e.target.value)

        const data = await Axios.post(`${baseUrl}/admsearch`, {search: searchInput})

        // setData(data)
        console.log(data, '1ppppppppppp')

        if(data.data.length !== 0){


          console.log(data.data.userinfo[0].Email, 'ksuyujsys')
           if (data.data.userinfo[0].Email.includes("@")){

               console.log('jqqqqqqqqqqqqqqqqqqqwer')
               setData(data.data.userinfo)
          }


        }

        

      // if (data.data.userinfo.includes("@")){

      //   console.log('jqqqqqqqqqqqqqqqqqqqwer')
      // }
     



    }

      


    const getStudentRecords = async() =>{

    const data = await Axios.post(`${baseUrl}/getalluser`, {admemail: email})


    console.log(data.data.userinfo, '1ppppppppppp')

    setData(data.data.userinfo)
    console.log(data.data.userinfo[0].Email, '1ppppppppppp')
 

    }


    //when the edit button is clicked on the immutable table
    const handleEditClick = (event, student) => {
        event.preventDefault();
        seteditStudentID(student.id);  //opens the edit section
    
        const formValues = {


            Email: student.Email,
            FullName: student.FullName,
            DateOfBirth:  student.DateOfBirth,
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

        
        

        // if(editFormData.Courses.includes(',')){
        //     console.log('naaaaaaaaaaaaaaaadddd')

        // }

        var Courses 
        if(editFormData.Courses){
        
                  
                  console.log(editFormData.Courses, 'jsiuuuuu', typeof(editFormData.Courses))
                  if(editFormData.Courses.length){
                    Courses = editFormData.Courses.split(',')
                  Courses = [...Courses]

                  }else(

                    Courses = editFormData.Courses
                  )
        }else{

          AdCourses = ''
        }



        var AdCourses 

        if(editFormData.Courses){

              if(editFormData.Courses.length){
                AdCourses = editFormData.AdCourses.split(',')
                AdCourses = [...AdCourses]

              }else(

                AdCourses = editFormData.AdCourses
              )

        }else{

          AdCourses = ''

        }

        // To be sent to the server
        const editedStudent = {
          id: editStudentID,
          Email: editFormData.Email || data.Email,
          FullName: editFormData.FullName,
          DateOfBirth:  editFormData.DateOfBirth,
          MajorFieldOfStudy: editFormData.MajorFieldOfStudy,
          MinorFieldOfStudy: editFormData.MinorFieldOfStudy,
          Courses: Courses,
          AdCourses: AdCourses,
          Degree: editFormData.Degree,
          admemail: teacherEmail
        
          
        };

        /// to be Updated back to the UI
        const editedStudentUI = {
          id: editStudentID,
          Email: editFormData.Email || data.Email,
          FullName: editFormData.FullName,
          DateOfBirth:  editFormData.DateOfBirth,
          MajorFieldOfStudy: editFormData.MajorFieldOfStudy,
          MinorFieldOfStudy: editFormData.MinorFieldOfStudy,
          Courses: editFormData.Courses,
          AdCourses: editFormData.AdCourses,
          Degree: editFormData.Degree,
          admemail: teacherEmail
        
          
        };

        // JSON.stringify(AdCourses)
        // JSON.stringify(Courses)

        console.log(editedStudent, 'jjjjjjjjjjjjhhhhhhh')


        //update student record
        updateStudentRecord(editedStudent, teacherEmail)
        
            const newData = [...data];
        
            const index = data.findIndex((student) => student.id === editStudentID);
            console.log(index, 'indexxxxxxx')
        
            newData[index] = editedStudentUI;
        
            setData(newData);
            console.log(data, 'iiiiiiiiii')
            seteditStudentID(null);
      };

      const updateStudentRecord = async(editedStudent, email)=>{

        // const data = [editedStudent, email]

        setUpdateData([...updateData, editedStudent, email])
        try{
          console.log(email, 'kkkkkjuiuiy')
            const update = await Axios.post(`${baseUrl}/updatestudentinfo`, editedStudent)
            console.log(update.data, 'updateddddddd')
            console.log(update.data, 'jsjkjs')
            if(update.data[0].Success=== 'done'){
              setMessage('Sucessfully Uploaded..')
            }else{
              setMessage("error uploading")
            }
        }catch(err){
            setMessage(err.response)
            console.log(err)
        }
      }



      const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
      }


      

      if(data.length !== 0 && data){
    return (
    <div className='student-record'>

        <div className='log-out'>
          <input className='log-out-btn' type="button" onClick={handleLogout} value="Logout" />
        </div>

        <div > <h4 style={{Color: 'red', fontWeight: 'bold'}}>INPUT COURSES AND ADDITIONAL COURSES SEPARATED BY COMMA</h4> </div>
        <div>{message}</div>

            

        <form onSubmit={handleEditFormSubmit}>

            <CardBody>
                <Card>
                    <Row>
                        <Input placeholder='search...' style={{height: '2rem', width: '15rem'}}   className="form-control" onChange={handleSearch} />

                        {/* <Input
                    onChange={this.onChange}
                    value={this.state.email}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="off"
                    className="form-control"
                  /> */}

                  <Table className='styled-table' striped bordered hover size="sm"    > 
                    <thead >
                        <tr className='active-row'>
                            <th >Email</th>
                            <th  >FullName</th>
                            <th >Date of Birth</th>
                            <th  > Major Field of Study</th>
                            <th  >Minor Field of Study</th>
                            <th  >Courses</th>
                            <th  >Additional Courses</th>
                            <th  >Degree</th>
                            <th  >Edit</th>
                        </tr>
                        
                    </thead >
                    <tbody >
                        {data && data.map(student=>(



                <Fragment>
                {editStudentID === student.id ? (
                  <EditableRow
                  key={1}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                 
                  />
                ) : (
                  <ReadOnlyRow
                  key={2}
                    student={student}
                    handleEditClick={handleEditClick}
                    // handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
                        // <tr key={data.id}>
                           
                        //     <td>{datum.Email}</td>
                        //     <td>{datum.FullName}</td>
                        //     <td>{datum.DateOfBirth}</td>
                        //     <td>{datum.MajorFieldOfStudy}</td>
                        //     <td>{datum.MinorFieldOfStudy}</td>
                        //     <td>{datum.Courses}</td>
                        //     <td>{datum.AdCourses}</td>
                        //     <td>{datum.Degree}</td>
                        //     <td>
                        //     <Button
                        //     color="danger"
                        //     size="sm"
                        //     outline
                          
                        //     >
                        //     Edit
                        //     </Button>
                        //     </td>
                            
                        // </tr>
                        ))}
                        

                        


                    </tbody>    

                  </Table>




                    </Row>


                </Card>

            </CardBody>
        </form>
    </div>
    )
    }if(data.length === 0){
        return(
            <div>Loading......</div>

        ) 
    }
}
