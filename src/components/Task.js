import {useState} from 'react';
import {useEffect} from 'react';
import { extractEmployee, extractProject } from '../functions/functions';


const Task = ({prop_task}) => {
    
    const [task,setTask] = useState(prop_task);
    var employee_name = null; 

    useEffect(() => {extractEmployee(prop_task.ID_employee)
                        .then(data => {
                            console.log(data);
                            employee_name = data.__ENTITIES.name
                            setTask({...task,employee : employee_name})} )
                    },[]);  


    return ( <div className = 'Task'>
        <div>{task.name}</div>
        <div>{task.startingDate}</div>
        <div>{task.duration}</div>
        <div>{task.employee}</div>
        <div>{task.description}</div>
        </div> );
}
 
export default Task;