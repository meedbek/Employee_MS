import { useState } from "react";
import { useEffect } from "react";
import { addClient } from "../functions/functions";
import {Modal, Button,Form} from 'react-bootstrap';


const handleClick = (e,setClient) => {
    e.preventDefault();
    let name = document.getElementById("clientName").value;
    let adresse = document.getElementById("clientAdresse").value;
    let email = document.getElementById("clientEmail").value;

    const body = [{name : name, adress : {fullAdresse : adresse} , email : email}]
    addClient(body)
        .then((response) => {console.log(response); setClient(response);})
        .catch((error) => {
            console.error('Error:', error);
            });
    
};

const AddClient = ({show,onHide,handleAddClient}) => {
    
    const [client,setClient] = useState(null);
    
    useEffect( () => {
        handleAddClient(client);
    },[client]);
    
    return ( 
    
        
        <div className="addClient">
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add client
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="clientName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="clientAdresse">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" placeholder="Adresse"  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="clientEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email"  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e)=>{onHide(); return handleClick(e,setClient)}}>Add</Button>
                </Modal.Footer>
            </Modal>
        
    </div> );
}
 
export default AddClient;