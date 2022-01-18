import React from "react";
import { Button } from "reactstrap";

const ReadOnlyRow2 = ({ student, handleEditClick, handleDeleteClick }) => {
  return (
   
        <tr key={student.id}>
                           
          <td>{student.Email}</td>
          <td>{student.FullName}</td>
          <td>{student.DateOfBirth}</td>
          <td>{student.MajorFieldOfStudy}</td>
          <td>{student.MinorFieldOfStudy}</td>
          <td>{student.Courses}</td>
          <td>{student.AdCourses}</td>
          <td>{student.Degree}</td>
          <td>
          <Button
          color="danger"
          size="sm"
          outline
          onClick={(event) => handleEditClick(event, student)}
          >
          Edit
          </Button>
          </td>
          
      </tr>
  
  );
};

export default ReadOnlyRow2;
