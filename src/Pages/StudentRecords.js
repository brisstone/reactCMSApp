import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Card, CardBody, Input, Row } from 'reactstrap'



export default function StudentRecords(props) {


    const [sudoemail, setsudoEmail] = useState('')

    const [searchInput, setSearchInput] = useState('')

    // useEffect(() => {

        
    
    // }, [])



    useEffect(() => {

    
        setsudoEmail(props.match.params.email)
        console.log(sudoemail, 'jjjjjj')
        getStudentRecords()
      
      }, [sudoemail])
    

    const handleSearch = async(e)=>{

        setSearchInput(e.target.value)

        const data = await Axios.post('http://localhost:8000/admsearch', {search: sudoemail})

        console.log(data, 'dayyyyyyyyy')



    }

      


    const getStudentRecords = async() =>{

        console.log(sudoemail, 'jjjjjj')

    const data = await Axios.post('http://localhost:8000/getalluser', {admemail: sudoemail})

    console.log(data, 'dayyyyyyyyy')

    }


    return (
        <div>

            <CardBody>
                <Card>
                    <Row>
                        <Input   className="form-control" onChange={handleSearch} />

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




                    </Row>


                </Card>

            </CardBody>
           
        </div>
    )
}
