import { useParams } from "react-router";
import { useState,useEffect } from "react";
import { Form,Modal,Button } from "react-bootstrap";
import  {modifyClient} from '../functions/functions.js';

const handleClick = (e,key,setClient) => {
    e.preventDefault();
    let name = document.getElementById("clientName").value;
    let adresse = document.getElementById("clientAdresse").value;
    let email = document.getElementById("clientEmail").value;

    const body = [{__KEY : key,name : name, adress : {fullAdresse : adresse} , email : email}]
    
    modifyClient(body)
        .then((response) => {console.log(response); setClient(response);})
        .catch((error) => {
            console.error('Error:', error);
            });
    
};


const Client = ({clientProp,show,onHide,handleModifyClient}) => {

    const [client,setClient] = useState(null);

    useEffect( () => {
        handleModifyClient(client);
    },[client]);

    return ( <div className = 'project'>
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify client
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group className="mb-3" controlId="clientName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name"  defaultValue={clientProp.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="clientAdresse">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" placeholder="Adresse" defaultValue={clientProp.adresse}  />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="clientEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" defaultValue = {clientProp.email}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e)=>{onHide(); return handleClick(e,clientProp.__KEY,setClient)}}>Modify</Button>
            </Modal.Footer>
        </Modal>
    </div> ); 
}
 
export default Client;