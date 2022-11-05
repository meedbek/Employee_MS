import {useState} from 'react';
import { useEffect } from 'react';
import Client from './Client.js';
import AddClient from './AddClient';
import {extractClients,deleteClient} from '../functions/functions.js'
import {Button,Table } from 'react-bootstrap'


const Clients = () => {


    const [clients, setClients] = useState(null);
    const [addClient, setAddClient] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [clientProp,setClientProp] = useState(null);

    useEffect(() => { extractClients(null)
        .then(data => {
            console.log(data);
            setClients(data.__ENTITIES);} )
        .catch((error) => {
            console.error('Error:', error);
            })
        },[]);    

    return ( <div className="clients container">
                <div className="addClient container">
                    <Button onClick={()=>{setModalShow(true)}}>Add Client</Button>
                    <AddClient handleAddClient={(client)=>{client && (clients ? setClients([...clients,client]) : setClients([client]) ) }} show={modalShow}
                    onHide={() => setModalShow(false)}/>
                </div>
        
                <div className="clientDiv container">
                    {/*clients.map( (client) => (<Client key={client.__KEY} name={client.name} adresse={client.adress.fullAdresse} email={client.email} />) )*/}
                    <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Adresse</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    { clients &&  clients.map( (client) => (<tr key={client.__KEY}>
                        <td>{client.name}</td>
                        <td>{client.adress.fullAdresse}</td>
                        <td>{client.email}</td>
                        <td><Button onClick={() => {setClientProp({__KEY : client.__KEY,name : client.name,adresse : client.adress.fullAdresse,email : client.email});
                                                    setModalShow2(true)}}>Modify</Button></td>
                        <td><Button onClick={() => {deleteClient(client.__KEY).then(result=>console.log(result)); setClients(clients.filter( (fl) => (fl.__KEY!=client.__KEY) ))}}>Delete</Button></td>
                    </tr>) ) }
                    
                    
                    </tbody>
                    </Table>

                    {clientProp && (<Client handleModifyClient={(client)=>{client && setClients([...clients.filter( (fl) => (fl.__KEY!=clientProp.__KEY) ),client])}} clientProp={clientProp} show={modalShow2}
                    onHide={() => setModalShow2(false)}></Client>)}
                </div>
            </div>  )

}
 
export default Clients;