import { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'

const AddForm = () => {
  const [form, setform] = useState([])
  // const [form, setform] = useState({
  //   name: '',
  //   dob: '',
  //   salary: '',
  //   doj: '',
  //   dor: '',
  //   number: '',
  //   status: '',
  // })
  
  const handleChnage = (e) =>{
    e.preventDefault();
    // console.log("Testi");

    // console.log(e.target.value)
    let key = e.target.name;
    let value = e.target.value;
    setform({ ...form, [key]: value });
    // console.log("Resss",setform);
  }
 
  const Insert = () =>{
    axios.post("https://reacttask-9b243-default-rtdb.firebaseio.com/userData.json",form)
    .then(res=>res.data)
    .then(d=>{
        console.log("After Insert Data",d.name)
        // let id = d.name;
        // seta([...a, {...form,id}])
    })
    
    .catch(e=>console.log("After insert error",e))
   }


  return (
    <Form>
        <Form.Group>
          <Form.Control
           value={form.name}
           type="text"
           onChange={(e)=>handleChnage(e)}
           name="name"
           placeholder="Enter Name" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={form.dob}
           type="date"
           onChange={(e)=>handleChnage(e)}
           name="dob"
           placeholder="Enter DOB" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={form.salary}
           type="number"
           onChange={(e)=>handleChnage(e)}
           name="salary"
           placeholder="Enter Salary" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={form.doj}
           type="date"
           onChange={(e)=>handleChnage(e)}
           name="doj"
           placeholder="Enter JoinDate" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={form.dor}
           type="date"
           onChange={(e)=>handleChnage(e)}
           name="dor"
           placeholder="Enter Relieving Date" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={form.number}
           type="number"
           onChange={(e)=>handleChnage(e)}
           name="number"
           placeholder="Enter ContactNumber " 
           required
         />
        </Form.Group>
        <Form.Group>
        <Form.Select name="status" id="disabledSelect" onChange={(e)=>handleChnage(e)}  >
            <option >Disabled select</option>
            <option value={form.status}>active</option>
            <option value={form.status}>inactive</option>
        </Form.Select>

         {/* <Form.Control
           value={form.status}
           type="text"
           onChange={(e)=>handleChnage(e)}
           name="status"
           placeholder="Enter Status" 
           required
         /> */}
        </Form.Group>
        <Button variant="success" onClick={Insert}>Add New Employee</Button>
    </Form>
  )
}

export default AddForm
