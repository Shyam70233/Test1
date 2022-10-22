import React from "react";
import { useEffect, useState } from "react";
import { Form, Button, Modal, Alert, Container } from "react-bootstrap";
import axios from "axios";

const App = () => {
  const [form, setform] = useState({});
  const [formEdit, setformEdit] = useState({});
  const [a, seta] = useState([]);
  
  const handleChnage = (e) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;
    setform({ ...form, [key]: value });
    };

  const handleChnageEdit = (e) => {
    let key = e.target.name;
    let value = e.target.value
    setformEdit({ ...formEdit, [key]: value })
  }

  const [op, setop] = useState(-1);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [shows, setShows] = useState(false);
  const handleCloseEdit = () => setShows(false);
  
  const Insert = () => {
    setShow(false);
    axios
      .post(
        "https://reacttask-9b243-default-rtdb.firebaseio.com/userData.json",
        form
      )
      .then((res) => res.data)
      .then((d) => {
        console.log("After Insert Data", d.name);
        let id = d.name;
        seta([...a, { ...form, id }]);
        setop(1);
      })
      .catch((e) => console.log("After insert error", e))
      .finally(() => {
        setform({
          name: "",
          dob: "",
          salary: "",
          doj: "",
          dor: "",
          number: "",
          status: "",
        });
      });
  };

  const edit = (x) => {
    setShows(true);
    setformEdit(x);
  };


  const Update = () => {
    let  { name,dob,salary,doj,dor,number, status ,id} = formEdit
    axios.patch(`https://reacttask-9b243-default-rtdb.firebaseio.com/userData`+"/"+id+".json",{name,dob,salary,doj,dor,number, status})
    .then(res=>res.data)
    .then(d=>{
        seta(a.map(x=>x.id ===formEdit.id ? formEdit:x))
        console.log("Response Success Insert",d)
    })
    .catch(e=>{
        console.log("Response Failled",e)
    })
    setop(2);
    setShows(false);
  };

  const del = (x) => {
    axios
      .delete(
        "https://reacttask-9b243-default-rtdb.firebaseio.com/userData" +
          "/" +
          x.id +
          ".json"
      )
      .then((res) => res.data)
      .then((d) => {
        seta(a.filter((y) => y.id !== x.id));
        setop(3);
      })
      .catch((e) => console.log("Response Failed Delete", e));
  };

  const boot = () => {
    axios
      .get("https://reacttask-9b243-default-rtdb.firebaseio.com/userData.json")
      .then((res) => res.data)
      .then((d) => d || [])
      .then((d) => {
        // console.log(d);
        let temp = [];
        let x = Object.keys(d);
        let y = Object.values(d);
        for (let i = 0; i < x.length; i++) {
          temp.push({ id: x[i], ...y[i] });
        }
        seta(temp);
      })
      .catch((e) => {
        console.log("Response Failed");
      });
  };
  useEffect(boot, []);

  return (
    <>
      <Container>
        {op === 1 && (
          <Alert variant="success">New record Added successfully</Alert>
        )}

        {op === 2 && <Alert variant="warning">Updated Successfully</Alert>}

        {op === 3 && <Alert variant="danger">Deleted Successfully</Alert>}
      </Container>
      <Container>
        <Button
          onClick={handleShow}
          className="btn btn-success"
          data-toggle="modal"
        >
          <i className="material-icons">&#xE147;</i>{" "}
          <span>Add New Employee</span>
        </Button>

        <br />
        <br />
        <table className="table table-striped table-hover">
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
            {a.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.dob}</td>
                <td>{x.salary}</td>
                <td>{x.doj}</td>
                <td>{x.dor}</td>
                <td>{x.number}</td>
                <td>{x.status}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => edit(x)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => del(x)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

 {/* Start Add Employee Records in Modal   */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
              <Form.Label>Name</Form.Label>
                <Form.Control
                  value={form.name}
                  type="text"
                  onChange={(e) => handleChnage(e)}
                  name="name"
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  value={form.dob}
                  type="date"
                  onChange={(e) => handleChnage(e)}
                  name="dob"
                  placeholder="Enter DOB"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Salary</Form.Label>
                <Form.Control
                  value={form.salary}
                  type="number"
                  onChange={(e) => handleChnage(e)}
                  name="salary"
                  placeholder="Enter Salary"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  value={form.doj}
                  type="date"
                  onChange={(e) => handleChnage(e)}
                  name="doj"
                  placeholder="Enter JoinDate"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Date of Relieving </Form.Label>
                <Form.Control
                  value={form.dor}
                  type="date"
                  onChange={(e) => handleChnage(e)}
                  name="dor"
                  placeholder="Enter Relieving Date"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  value={form.number}
                  type="number"
                  onChange={(e) => handleChnage(e)}
                  name="number"
                  placeholder="Enter ContactNumber "
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Status</Form.Label>
                <Form.Select name="status" onChange={(e) => handleChnage(e)}>
                  <option>Select Status</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </Form.Select>
              </Form.Group>
              <Button variant="success" onClick={Insert}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
 {/* End Add Employee Records in Modal   */}

 {/* Start Edit Employee Records in Modal   */}
        <Modal show={shows} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee From</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
              <Form.Label>Name</Form.Label>
                <Form.Control
                  value={formEdit.name}
                  type="text"
                  onChange={(e) => handleChnageEdit(e)}
                  name="name"
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  value={formEdit.dob}
                  type="date"
                  onChange={(e) => handleChnageEdit(e)}
                  name="dob"
                  placeholder="Enter DOB"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Salary</Form.Label>
                <Form.Control
                  value={formEdit.salary}
                  type="number"
                  onChange={(e) => handleChnageEdit(e)}
                  name="salary"
                  placeholder="Enter Salary"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  value={formEdit.doj}
                  type="date"
                  onChange={(e) => handleChnageEdit(e)}
                  name="doj"
                  placeholder="Enter JoinDate"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Date of Relieving</Form.Label>
                <Form.Control
                  value={formEdit.dor}
                  type="date"
                  onChange={(e) => handleChnageEdit(e)}
                  name="dor"
                  placeholder="Enter Relieving Date"
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  value={formEdit.number}
                  type="number"
                  onChange={(e) => handleChnageEdit(e)}
                  name="number"
                  placeholder="Enter Contact Number "
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Select Status</Form.Label>
                <Form.Select
                  value={formEdit.status}
                  name="status"
                  onChange={(e) => handleChnageEdit(e)}
                >
                  <option value="">Disabled select</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </Form.Select>
              </Form.Group>
              <Button variant="success" onClick={Update}>
                Update
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
     {/* End Edit Employee Records in Modal   */}    
      </Container>
    </>
  );
};

export default App;
