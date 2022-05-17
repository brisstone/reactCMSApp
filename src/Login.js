import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import {Api} from './Utils/Api';



function Login(props) {


  const baseUrl = Api

  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState('');
 
  

  var config = {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  }

  

  


  const handleLogin = async (dispatch) => {


    
    setError(null);
    setLoading(true);
    let isMounted = true; 
   


    await axios.post(`${baseUrl}/login`, { email: username.value, password: password.value }).then(response => {
      setLoading(false);
      
      console.log(response.data[0].IncorrectPassword)
      // props.history.push('/teacher');

      
      if(response.data[0].NoUserFound === "Email Does not exist"){
        if (isMounted) setError('Email does not exist')
        console.log('eee')
      }
      else if(response.data[0].IncorrectPassword === "Incorrect Password"){
        if (isMounted) setError('Incorrect Password')
        console.log('ppp')
      }else{
          setUserSession(response.data[2].Info.split(", ")[1].replace(/^'(.*)'$/, '$1'));
        console.log(response.data[2].Info.split(", "), 'iiiiiiii')
        console.log(response.data[2].Info.split(", ")[1], 'iiiiiiii')
        //remove approstrophe using regex
        console.log(response.data[2].Info.split(", ")[1].replace(/^'(.*)'$/, '$1'), 'uuuuuuu')
        // console.log(response.data[2].Info[1])
        if(response.data[0].Adm == 1){
          console.log(username, 'jjjjjjjj')
         

            props.history.push(`/teacher`);
        }else{

          
          // props.history.push(`/student`);

          props.history.push(`/personal-student-form`);
          console.log(" student");
      }
     
     
      }
      
      return isMounted= false

      // setUserSession(response.data.token, response.data.adm);
      // console.log(response.data)
      // // console.log(response.data[2].Info.split(", ")[1].replace(/^'(.*)'$/, '$1'))
      // // console.log(response.data[2].Info[1])
      // if(response.data.adm === true){
      //     props.history.push('/teacher');
      // }else{
      //   props.history.push('/student');
      //    console.log(" student");
      // }
     
    }).catch(error => {
      setLoading(false);
        console.log(error);
        if (error.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      
    });
   
  }

  return (
    <div>
    <b>LOGIN</b>  <br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
     
     

      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;