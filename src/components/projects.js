import {useState} from 'react';
import { useEffect } from 'react';
import Project from './project.js';
import AddProject from './AddProject';
import {extractProjects, deleteProject,extractAllClients,extractAllEmployees} from '../functions/functions.js';
import {Table,Button} from 'react-bootstrap'


const Projects = () => {

    const [clients, setClients] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [projects, setProjects] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [projectProp,setProjectProp] = useState(null);

    useEffect(() => { extractProjects(null,null,null)
                        .then(data => {
                            console.log(data);
                            setProjects(data.__ENTITIES);} )
                        .catch((error) => {
                            console.error('Error:', error);
                            })
    },[]);    

    useEffect(() => { extractAllClients()
        .then(data => {
            console.log(data);
            setClients(data.__ENTITIES);} )
        .catch((error) => {
            console.error('Error:', error);
            })
    },[]);

    useEffect(() => { extractAllEmployees()
        .then(data => {
            console.log(data);
            setEmployees(data.__ENTITIES);} )
        .catch((error) => {
            console.error('Error:', error);
            })
    },[]);

    return ( <div className="projects">
                <div className="addProject container">
                    <Button variant="primary" onClick={() => setModalShow(true)}>AddProject</Button>
                    <AddProject employees={employees} clients={clients} handleAddProject={(project)=>{project && (projects ? setProjects([...projects,project]) : setProjects([project])) } } show={modalShow}
                onHide={() => setModalShow(false)} />
                </div>
    
                <div className="projectsDiv container">
                    {/* projects &&  projects.map( (project) => (<Project key={project.__KEY} name={project.name} client = {project.ID_client}  projectManager={project.ID_projectManager} startingDate={project.starting_date}/>) ) */}
                    <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Project name</th>
                        <th>Client</th>
                        <th>Project Manager</th>
                        <th>Starting Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    { projects &&  projects.map( (project) => (<tr key={project.__KEY}>
                        <td>{project.name}</td>
                        <td>{clients && clients.map((client)=>{ if(project.ID_client == client.__KEY)  return client.name; }) }</td>
                        <td>{employees && employees.map((employee)=>{ if(project.ID_projectManager == employee.__KEY)  return employee.lastName+" "+employee.firstName; }) }</td>
                        <td>{project.starting_date.replace(/!/g, "-")}</td>
                        <td><Button onClick={() => {setProjectProp({__KEY : project.__KEY,name : project.name,starting_date : project.starting_date,duration : project.duration,budget : project.budget,ID_client : project.ID_client,ID_projectManager : project.ID_projectManager});
                                                    setModalShow2(true)}}>Enter</Button></td>
                        <td><Button onClick={() => {deleteProject(project.__KEY).then(result=>console.log(result)); setProjects(projects.filter( (fl) => (fl.__KEY!=project.__KEY) ))} }>Delete</Button></td>
                    </tr>) ) }
                    
                    
                    </tbody>
                    </Table>
                    {projectProp && (<Project employees={employees} clients={clients} handleModifyProject={(project)=>{project && setProjects([...projects.filter( (fl) => (fl.__KEY!=projectProp.__KEY) ),project])}} projectProp={projectProp} show={modalShow2}
                    onHide={() => setModalShow2(false)}></Project>)}
                </div>

            </div>  )

}
 
export default Projects;