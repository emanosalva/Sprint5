import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import NavBar from '../componentes/NavBar'
import Swal from "sweetalert2"
import { useHistory } from 'react-router'

const NewGym = () => {

    const history = useHistory();

    const [data,setData = useState] =useState({
        nit:"",
        nombre:"",
        direccion:"",
        contacto:""
    })

    const handleChange=({target}) =>{
        setData({
            ...data,
            [target.name]:target.value
        })
    }

    const URL ="http://132.226.212.218:8080/gym"

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await axios.post(URL,data);
        
        if(response.status===200){
            Swal.fire(
                "Gymnasio creado correctamente",
                `Codiasignado a gym: ${response.data.codigo}`,
                "success"
            )
            history.push("/gimnasios")
        }else{
            console.log(response.status, response)
            Swal.fire(
                "Error",
                "Ups!, algo salio mal",
                "error"
            )
        }
    }

    return (
        <Container>
            <NavBar />
            <h1 className='text-center'>Nuevo Gymnasio</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Control
                type='number'
                name='nit'
                placeholder='Escriba el NIT'
                required
                value={data.nit}
                onChange={handleChange}>
                </Form.Control>
            </Form.Group>

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
                    name="direccion" 
                    placeholder="Direccion"
                    required
                    value={data.direccion}
                    onChange={handleChange}>

                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="number" 
                    name="contacto" 
                    placeholder="Telefono"
                    required
                    value={data.contacto}
                    onChange={handleChange}>

                    </Form.Control>
                </Form.Group>

                <button className="btn btn-success">Crear</button>
                

            </Form>
        </Container>
    )
}

export default NewGym
