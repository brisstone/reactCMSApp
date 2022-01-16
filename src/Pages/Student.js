import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

export default function Student(props) {

  // const [sudoemail, setsudoEmail] = useState('')


  useEffect(() => {

    



    const email = sessionStorage.getItem('token') || null;

    getStudent(email)

  
  }, [])


  const getStudent = async(email)=>{

    const data = await Axios.post('http://localhost:8000/getstudentinfo', {email: email})
    console.log(data, 'uuuujjjjjjjjj')

  }
  
  // console.log(email1, 'kkkkkkkkkkkkkk')

    // const email = getUser();
    // console.log(email, 'brisssss')

     // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }


    return (
        <div>
            Welcome Student !<br /><br />
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    )
}
