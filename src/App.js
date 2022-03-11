import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Teacher from './Teacher';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import register from './Register';
import Student from './Pages/Student';
import StudentRecords from './Pages/StudentRecords';
import StudentForm from './Pages/StudentForm';
import AllStudentsForm from './Pages/AllStudentsForm';
import PersonalStudentForm from './Pages/PersonalStudentForm';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
            {/* <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/teacher">Teacher Dashboard</NavLink><small>(Access with token only)</small>
            <NavLink activeClassName="active" to="/register">Register</NavLink><small>(Access without token)</small> */}
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <PublicRoute path="/login" component={Login} />
              <Route path="/student" component={Student} />
              <PublicRoute path="/register" component={register} />
              <PrivateRoute path="/teacher" component={Teacher} />
              <PrivateRoute
                path="/student-records"
                component={StudentRecords}
              />
              <PrivateRoute path="/student-form" component={StudentForm} />
              <PrivateRoute path="/personal-student-form" component={PersonalStudentForm} />

              <PrivateRoute
                path="/all-students-record"
                component={AllStudentsForm}
              />
              {/* <PrivateRoute path="/student" component={Student} /> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
