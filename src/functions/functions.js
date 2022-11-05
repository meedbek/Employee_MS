export const extractProjects = async (name,ID_client,ID_projectManager)=> {
    const data = '['+name+','+ID_client+','+ID_projectManager+']';
    const result =  await fetch("http://localhost:8080/rest/Project/getProjects", {
        method: 'POST',
        body: data,
        credentials:'include'  
        })
        .then(response => response.json())
        ;
    return result;
}

export const extractClients = async (name)=> {
    const data = '['+name+']';
    const result =  await fetch("http://localhost:8080/rest/Client/getClients", {
        method: 'POST',
        body: data,
        credentials:'include'  
        })
        .then(response => response.json())
        ;
    return result;
}

export const extractAllClients = async () => {
    const result =  await fetch("http://localhost:8080/rest/Client",{
        credentials:'include'  
    })
        .then(response => response.json())
        ;

    return result
}

export const extractAllEmployees = async () => {
    const result =  await fetch("http://localhost:8080/rest/Employee",{
        credentials:'include'
    })
        .then(response => response.json())
        ;

    return result
}

export const extractTasks = async (project_ID) => {
    const result = await fetch('http://localhost:8080/rest/Task/?$filter="ID_project='+project_ID+'"',{
        credentials:'include'
    })
        .then(response => response.json())
        ;

    return result
}


export const extractEmployee = async(employee_ID) => {
    const result = await fetch("http://localhost:8080/rest/Employee("+employee_ID+")",{
        credentials:'include'
    })
        .then(response => response.json())
        ;

    return result
}

export const extractProject = async(project_ID) => {
    const result = await fetch("http://localhost:8080/rest/Project("+project_ID+")",{
        credentials:'include'
    })
        .then(response => response.json())
        ;

    return result
}

export const addProject = async(name,startingDate , duration,  budget,  client , manager) => {
    const body = [{name : name, starting_date : startingDate ,duration : duration, budget : budget, ID_client : client , ID_projectManager : manager}];

    const result = await fetch("http://localhost:8080/rest/Project/?$method=update",
        {credentials : 'include',
         method : 'POST',
         body : JSON.stringify(body)})
        .then(response => response.json());

        return result
}

export const modifyProject = async(key,name,startingDate , duration,  budget,  client , manager) => {
    const body = [{__KEY : key , name : name, starting_date : startingDate ,duration : duration, budget : budget, ID_client : client , ID_projectManager : manager}];

    const result = await fetch("http://localhost:8080/rest/Project("+key+")/?$method=update",
        {credentials : 'include',
         method : 'POST',
         body : JSON.stringify(body)})
        .then(response => response.json());

        return result
}

export const deleteProject = async(key) => {

    const result = await fetch("http://localhost:8080/rest/Project("+key+")/?$method=delete",
        {credentials : 'include',
         method : 'POST'
        })
        .then(response => response.json());

        return result
}


export const addTask = async(body)=> {

    const result = await fetch("http://localhost:8080/rest/Task/?method=update",
    {
        credentials : 'include',
        method : 'POST',
        body : JSON.stringify(body)
    })
    .then(response =>response.json());

    return result;
}

export const deleteTasks = async(key)=> {

    const result = await fetch("http://localhost:8080/rest/Task:ID_project("+key+")/?method=delete",
    {
        credentials : 'include',
        method : 'POST'
    })
    .then(response =>response.json());

    return result;
}

export const addClient = async(body) => {
    const result = await fetch("http://localhost:8080/rest/Client/?method=update",
        {
            credentials : 'include',
            method : 'POST',
            body : JSON.stringify(body)
        })
        .then(response =>response.json());

    return result;
}

export const modifyClient = async(body) => {
    const result = await fetch("http://localhost:8080/rest/Client/?method=update",
        {
            credentials : 'include',
            method : 'POST',
            body : JSON.stringify(body)
        })
        .then(response =>response.json());

    return result;
}

export const deleteClient = async(key) => {
    const result = await fetch("http://localhost:8080/rest/Client("+key+")/?$method=delete",
        {
            credentials : 'include',
            method : 'POST'
        })
        .then(response=>response.json())

     return result;
}

export const changeDateFormat = (date_arg) => {

    let date_4d = "!!"+date_arg+"!!"

    return date_4d;
}

