import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import NavBar from '../componentes/NavBar'
import Swal from "sweetalert2"
import { useHistory } from 'react-router'

function NewUser() {

    const history = useHistory();

    const [data,setData] = useState({
        nombre:"",
        apellido:"",
        telefono:"", 
        fechaIngreso:new Date().toISOString(),
        estado:true
    })

    const handleChange= ({target}) =>{
        setData({
            ...data,
            [target.name]:target.value
        })
    }

    const URL="http://132.226.212.218:8080/usuario"

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await axios.post(URL,data);
        console.log(response, response.data);

        if(response.status===200){
            Swal.fire(
                "Usuario creado con exito",
                `El cliente con id: ${response.data.id}`,
                "success"
            )
            history.push("/usuarios")

        }else{
            console.log(response.status, response)
            Swal.fire(
                "Error",
                "Ups!, Algo salió mal",
                "error"
            )
        }
    }



    return (
        <Container>
            <NavBar />
            <h1 className="text-center">Nuevo usuario</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="text" 
                    name="nombre" 
                    placeholder="Nombre"
                    required
                    value={data.nombre}
                    onChange={handleChange}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="text" 
                    name="apellido" 
                    placeholder="Apellido"
                    required
                    value={data.apellido}
                    onChange={handleChange}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="number" 
                    name="telefono" 
                    placeholder="Telefono"
                    required
                    value={data.telefono}
                    onChange={handleChange}>

                    </Form.Control>
                </Form.Group>

                <button className="btn btn-success">Crear</button>
                
            </Form>
        </Container>
        
            
        
    )
}

export default NewUser
