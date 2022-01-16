import axios from 'axios';
import { GET_USER } from './constants';



export const staffData = dispatch => {
    dispatch({ type: TOGGLE_LOADER });
    return axios
      .post('/api/v1/settings/add-staff', staffData)
      .then(result => {
        dispatch({
          type: REGISTER_STAFF,
          payload: result.data.data
        });
        Toast.fire({
          icon: 'success',
          title: result.data.message
        });
        dispatch({ type: TOGGLE_LOADER });
        return result.data.data;
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: TOGGLE_LOADER });
        if (err.response.status === 401) {
          Swal.fire('oops', err.response.data);
        } else
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
      });
  };