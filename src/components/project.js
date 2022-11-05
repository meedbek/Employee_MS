import {useState} from 'react';
import {useEffect} from 'react';
import { extractTasks,extractAllClients,extractAllEmployees,changeDateFormat,modifyProject,addTask,deleteTasks } from '../functions/functions';
import {Modal,Form,Button,Table} from 'react-bootstrap'
import AddTask from './AddTask'

/*const  handleSubmit = async (key,e,prop_tasks,setProject) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const startingDate = changeDateFormat(document.getElementById("startingDate").value);
    const duration = document.getElementById("duration").value;
    const budget = document.getElementById("budget").value;
    const client = document.getElementById("client").value;
    const manager = document.getElementById("manager").value;
    const tasks = prop_tasks;
    
    var project;

    await modifyProject(key,name,startingDate , duration,  budget,  client , manager)
        .then((result)=>{setProject(result);})
        .then(()=>{deleteTasks(key)})
        .then(()=>{
            let data = [];
            tasks && tasks.forEach((task) => data.push({...task,ID_project : key}) );
            addTask(data).catch((error) => {
                console.error('Error:', error);
                })
        })
        .catch((error) => {
            console.error('Error:', error);
            })

};*/

const Project = ({projectProp,show,onHide,handleModifyProject,clients,employees}) => {


    const [tasks, setTasks] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [project,setProject] = useState(null);

    

    useEffect(() => { extractTasks(projectProp.__KEY)
        .then(data => {
            console.log(data);
            const TASKS = (data.__ENTITIES).map((task)=>({name : task.name, starting_date : task.starting_date, duration : task.duration ,ID_employee : task.ID_employee, description : task.description}));
            setTasks(TASKS);} )
        .catch((error) => {
            console.error('Error:', error);
            })
    },[show]);

    useEffect(() => {
        handleModifyProject(project);
    },[project]);
    
    return (
        <Modal
        show={show}
        onHide={onHide}
        fullscreen = {true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Project
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" defaultValue={projectProp.name} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="startingDate">
                <Form.Label>StartingDate</Form.Label>
                <Form.Control type="text" defaultValue={projectProp.starting_date && projectProp.starting_date.replace(/!/g, "-")} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="duration" >
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text" placeholder="duration" defaultValue={projectProp.duration} readOnly />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="budget">
                <Form.Label>Budget</Form.Label>
                <Form.Control type="text" placeholder="budget" defaultValue={projectProp.budget} readOnly />
            </Form.Group>
            
            
            <Form.Group className="mb-3" controlId="client">
                <Form.Label>Client</Form.Label>
                <Form.Select aria-label="Default select example"  defaultValue={projectProp.ID_client} >
                    {clients && console.log("i am here")} 
                    {clients && clients.map( (client) => (projectProp.ID_client == client.__KEY && <option key={client.__KEY} value={client.__KEY}>{client.name}</option>))}
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="manager">
                <Form.Label>manager</Form.Label>
                <Form.Select aria-label="Default select example" defaultValue={projectProp.ID_projectManager} >
                    {employees &&  employees.map( (employee) => (projectProp.ID_projectManager == employee.__KEY && <option key={employee.__KEY } value={employee.__KEY}>{employee.lastName} {employee.firstName}</option>))}   
                </Form.Select>
            </Form.Group>

            <div className="tasks container" id="tasks">
            <h3>Tasks</h3>

            {/*<Button variant="primary" onClick={() => setModalShow(true)}>
                Add Task
            </Button>
                <AddTask employees={employees} handleClick={(body) => {tasks ? setTasks([...tasks,body]) : setTasks([body])}} show={modalShow}
                    onHide={() => setModalShow(false)}/>*/}
                {/*tasks && tasks.map( (task,index) => (<div key={index}>{task.name}</div>))*/}
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Task name</th>
                        <th>Starting Date</th>
                        <th>Duration</th>
                        <th>Employee</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    { tasks &&  tasks.map( (task) => (<tr key={task.__KEY}>
                        <td>{task.name}</td>
                        <td>{task.starting_date.replace(/!/g, "-")}</td>
                        <td>{task.duration}</td>
                        <td>{employees && employees.map((employee)=>{ if(task.ID_employee == employee.__KEY)  return employee.lastName+" "+employee.firstName; }) }</td>
                        <td>{task.description}</td>
                        
                    </tr>) ) }
                    
                    
                    </tbody>
                    </Table>
            </div>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={/*(e) => {handleSubmit(projectProp.__KEY,e,tasks,setProject); console.log(project)}*/onHide}>close</Button>
        </Modal.Footer>
        </Modal>
    );
}

 
export default Project;