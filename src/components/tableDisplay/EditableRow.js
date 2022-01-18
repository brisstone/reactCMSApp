import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {

  // const [inputState, setinputState] = useState(true)
  return (
    <tr >
        <td style={{border: '1px solid white', color: 'white'}}>
        <input
        className="borderInput"
          type="email"
          // required="required"
          placeholder="email..."
          name="Email"
          // value={editFormData.Email}
          defaultValue={editFormData.Email}
          disabled= {true}
          // onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="name..."
          name="FullName"
          value={editFormData.FullName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="DateOfBirth..."
          name="DateOfBirth"
          value={editFormData.DateOfBirth}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="MajorFieldOfStudy..."
          name="MajorFieldOfStudy"
          value={editFormData.MajorFieldOfStudy}
          onChange={handleEditFormChange}
        ></input>
      </td>
      
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="MinorFieldOfStudy..."
          name="MinorFieldOfStudy"
          value={editFormData.MinorFieldOfStudy}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="Courses..."
          name="Courses"
          value={editFormData.Courses}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="AdCourses..."
          name="AdCourses"
          value={editFormData.AdCourses}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
         className="borderInput"
          type="text"
          // required="required"
          placeholder="Degree..."
          name="Degree"
          value={editFormData.Degree}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="save" style={{backgroundColor: 'green', paddingRight: '2px', paddingBottom: '2px'}} type="submit">Save</button>
        <button className="cancel" style={{backgroundColor: 'red'}} type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
