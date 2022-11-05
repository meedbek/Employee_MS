import {useState} from 'react';
import { useEffect } from 'react';
import { extractAllEmployees,changeDateFormat } from '../functions/functions';
import {Modal,Button,Form} from 'react-bootstrap'

const handleSubmit = (event) => {
    event.preventDefault();
    let name = document.getElementById("taskName").value;
    let startingDate = changeDateFormat(document.getElementById("taskStartingDate").value);
    let duration = document.getElementById("taskDuration").value;
    let employee = document.getElementById("taskEmployee").value;
    let desc = document.getElementById("description").value;

    const task = {name : name, starting_date : startingDate, duration : duration ,ID_employee : employee, description : desc};

    return task;
}

const AddTask = ({show,onHide,employees,handleClick}) => {

    return ( 
    <div className = 'AddProject'>
        <Modal 
        show = {show}
        onHide = {onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
            <Form.Group className="mb-3" controlId="taskName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskStartingDate">
                <Form.Label>Starting Date</Form.Label>
                <Form.Control type="date"   />
            </Form.Group>

            <Form.Group className="mb-3" controlId="taskDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text" placeholder="duration"  />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="taskEmployee">
                <Form.Label>Employee</Form.Label>
                <Form.Select aria-label="Default select example">
                    {employees && employees.map( (employee) => (<option key={employee.__KEY } value={employee.__KEY}>{employee.lastName} {employee.firstName}</option>))}   
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="description"  />
            </Form.Group>  
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button id="submit" onClick={(e)=>{onHide(); handleClick(handleSubmit(e))}}>Save Task</Button>
        </Modal.Footer>
      </Modal>
    </div> );
}

export default AddTask;