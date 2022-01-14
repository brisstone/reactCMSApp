import Axios from 'axios'
import React, {useEffect} from 'react'



export default function StudentRecords() {


    useEffect(() => {

        getStudentRecords()
    
    }, [])


    const getStudentRecords = async() =>{

    const data = await Axios.get('http://localhost:8000/admsearch')

    console.log(data, 'dayyyyyyyyy')

    }


    return (
        <div>
            jjj
        </div>
    )
}
