import React from 'react'
import {useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from "react-bootstrap"
// import AddForm from './AddForm';
import axios from 'axios';



const App = () => {

  const [form, setform] = useState([])
  const [formEdit, setformEdit] = useState([])
  // const [form, setform] = useState({
  //   name: '',
  //   dob: '',
  //   salary: '',
  //   doj: '',
  //   dor: '',
  //   number: '',
  //   status: '',
  // })
  const [a, seta] = useState([]);
  const handleChnage = (e) =>{
    e.preventDefault();
    // console.log("Testi");

    console.log(e.target.value)
    let key = e.target.name;
    let value = e.target.value;
    setform({ ...form, [key]: value });
    // console.log("Resss",setform);
  }
 
  const Insert = () =>{
    setShow(false);
    axios.post("https://reacttask-9b243-default-rtdb.firebaseio.com/userData.json",form)
    .then(res=>res.data)
    .then(d=>{
        console.log("After Insert Data",d.name)
        let id = d.name;
        seta([...a, {...form,id}])
    })
    
    .catch(e=>console.log("After insert error",e))
   }

   
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [shows, setShows] = useState(false);
  const handleCloseEdit = () => setShows(false);
  const edit = (x) =>{
    setShows(true);
    setformEdit(x);
  }
  
  const del = x =>{
    // console.log("Delete Id is",x);
    // console.log(URL+"/"+x.id);
    axios.delete('https://reacttask-9b243-default-rtdb.firebaseio.com/userData'+ "/" + x.id +".json")
    .then(res=>res.data)
    .then(d=>{
        // console.log("Delete Succss",d)
        seta(a.filter(y=>y.id !==x.id))
    })
    .catch(e=>console.log("delete failed",e))
  }
   
   
   const boot = () =>{
    axios.get("https://reacttask-9b243-default-rtdb.firebaseio.com/userData.json")
    .then(res=>res.data)
    .then(d=>d || [] )
    .then(d=>{ 
        console.log(d)
        let temp = []
        let x = Object.keys(d);
        let y = Object.values(d);
        for(let i=0;i<x.length;i++){
            temp.push({id:x[i],...y[i]})
        }
        seta(temp)
    })
    .catch(e=>{
        console.log("erro in loading time");
    })
   }
   useEffect(boot,[]);


  return (
    <>
    



    <div className="table-title">
        <div className="row">
            <div className="col-sm-6">
                <Button onClick={handleShow}  className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>					
            </div>
        </div>
    </div>

    {/* <Alert variant="success">
        Emlployee List Updated Succefully!
    </Alert> */}

    <table  className="table table-striped table-hover" >
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>DOB</th>
        <th>Salary</th>
        <th>Date of Joining</th>
        <th>Relieving Date</th>
        <th>Contact Number</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody>
        {a.map((x)=><tr key={x.id}>
          <td>{x.id}</td>
          <td>{x.name}</td>
          <td>{x.dob}</td>
          <td>{x.salary}</td>
          <td>{x.doj}</td>
          <td>{x.dor}</td>
          <td>{x.number}</td>
          <td>{x.status}</td>
          <td><button className='btn btn-primary'  onClick={() => edit(x)}>Edit</button></td>
          <td><button className='btn btn-danger' onClick={() => del(x) } >Delete</button></td>
          
        </tr>)}
      </tbody>
    </table>

    <Modal  show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>
                Add Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        <Form.Select name="status" onChange={(e)=>handleChnage(e)}  >
            <option >Disabled select</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
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


        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary"  onClick={handleClose} >
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>




{/* Edit From */}

    <Modal  show={shows} onHide={handleCloseEdit} >
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Employee From
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>



        <Form.Group>
          <Form.Control
           value={formEdit.name}
           type="text"
           onChange={(e)=>handleChnage(e)}
           name="name"
           placeholder="Enter Name" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={formEdit.dob}
           type="date"
           onChange={(e)=>handleChnage(e)}
           name="dob"
           placeholder="Enter DOB" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={formEdit.salary}
           type="number"
           onChange={(e)=>handleChnage(e)}
           name="salary"
           placeholder="Enter Salary" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={formEdit.doj}
           type="date"
           onChange={(e)=>handleChnage(e)}
           name="doj"
           placeholder="Enter JoinDate" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={formEdit.dor}
           type="date"
           onChange={(e)=>handleChnage(e)}
           name="dor"
           placeholder="Enter Relieving Date" 
           required
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
           value={formEdit.number}
           type="number"
           onChange={(e)=>handleChnage(e)}
           name="number"
           placeholder="Enter ContactNumber " 
           required
         />
        </Form.Group>
        <Form.Group>
        <Form.Select name="status" onChange={(e)=>handleChnage(e)}  >
            <option >Disabled select</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
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


        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary"  onClick={handleCloseEdit} >
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default App