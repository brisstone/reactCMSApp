import React, {useState} from 'react';
import index from './index.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

export default function Register(props) {


  const baseUrl = 'https://pythocmsapi.herokuapp.com'

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

   
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
		  setError('Password and confirm password are not match');
		} else {
                   //   dispatch(register(name, email, password));\
        axios.post(`${baseUrl}/register`, { email: email, password: password}).then(response => {
            
          setLoading(false);
            setUserSession(response.token, response.email);
            props.history.push('/login');
            // if(response.token){
            //     props.history.push('/login');
            // }else{
            //   props.history.push('/login');
            // }

        }).catch(error => {
          setLoading(false);
      
          if (error.status === 401) setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
          // error.push(error)
        });
    }  
};

    
    
    return (
        <div>
      <form className="form" onSubmit={submitHandler}>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <div>
          <h1>Create Account</h1>
        </div>
         {/* {loading && <LoadingBox></LoadingBox>} */}
          {error} 
        <div>
          <label htmlFor="name">Name</label>
          <div>
             <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
          </div>
         
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <div>
             <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          </div>
         
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
              <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          </div>
        
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div>
             <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          </div>
         
        </div>
        <div className="submitBtn">
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/login`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
    );
}
