import axios from "axios";
import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { ModalBody, Modal, ModalFooter, ModalHeader } from 'reactstrap'
import { useHistory } from 'react-router'
import Swal from "sweetalert2"


const GimnasiosTable = () => {
    const history = useHistory();
    const basicURL="http://132.226.212.218:8080/gym/";
    const [gym, setGym] = useState([])


    // function HorarioListItems(arrayHorarios) {
    //     return arrayHorarios.map((horario) => (<ul><h6>{horario.dias}</h6>{horario.hora}</ul>));
    //     }
    
    const peticionGetGym = async () => {
        await axios(basicURL)
        .then(response =>{
            setGym(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(() => {
        peticionGetGym();
    }, [setGym]);

    //post
    const peticionPost =async()=>{
        await axios.post(basicURL,gymSeleccionado)
        .catch(error=>{
            console.log(error)
        })
        peticionGetGym();
        abrirCerrarModalEditarGym()
    }

    //eliminar
    const peticionEliminar = async ()=> {
        await axios.delete(basicURL+gymSeleccionado.id)
        .then(response =>{
            setGym(gym.filter(gimnasio=>gimnasio.id!==gymSeleccionado.id));
            abrirCerrarModalEliminarGym();
            Swal.fire(
                "Confirmado",
                response.gym,
                "warning"
            )
        }).catch(error =>{
            console.log(error);
        })
    }

    const [modalEditarGym, setModaEditarGym] = useState(false);
    const [modalEliminarGym, setModalEliminarGym] = useState(false);
    const [gymSeleccionado, setGymSeleccionado] = useState({
        codigo:"",
        nit:"",
        nombre:"",
        direccion:"",
        contacto:""
    });

    // EDITAR & ELIMINAR

    const seleccionarGym =(elemento,caso) =>{
        setGymSeleccionado(elemento);
        (caso==="Editar")?abrirCerrarModalEditarGym():abrirCerrarModalEliminarGym();
    }

    const abrirCerrarModalEditarGym=()=>{
        setModaEditarGym(!modalEditarGym);
    }

    const abrirCerrarModalEliminarGym=()=>{
        setModalEliminarGym(!modalEliminarGym);
    }

    const handleChangeEditarGym=e=>{
        const{name,value}=e.target;
        setGymSeleccionado((estadoPrevio) =>({
            ...estadoPrevio,
            [name]:value
        }));
    }
    //buscar
    const[datosBusquedaGym, setDatosBusquedaGym]= useState({
        caja:"",
        filtro:"1"
    })

    const handleInputChange=(event)=>{
        setDatosBusquedaGym({
            ...datosBusquedaGym,
            [event.target.name]:event.target.value
        })
    }

    const buscarGym = async () =>{
        //console.log("buscarGym!!!! "+datosBusquedaGym.filtro);
        switch(datosBusquedaGym.filtro){
            
            case "1":
               //console.log("case 1!!!!! "+datosBusquedaGym.caja);
                await axios.get(basicURL+datosBusquedaGym.caja)
                
                .then(response=>{
                    //console.log("response data!!!!"+response.data)
                    
                    if(response.data !== null){
                        setGym([response.data]);
                    }else{
                        Swal.fire(
                            "Sin resultados",
                            "Por favor confirma",
                            "Info")
                            history.push("gimnasios")}

                }).catch(error =>{
                    console.log(error)
                })
                break;

            case "2":
                await axios.get(basicURL+"gnombre/"+datosBusquedaGym.caja.toLocaleLowerCase())
                .then(response =>{
                    if(response.data.length !==0){
                        setGym(response.data);
                    }else{
                        Swal.fire(
                            "Nombre no encontrado",
                            "Confirma datos",
                            "Info")
                            history.push("gym");
                    };
                }).catch(error=>{
                    console.log(error)
                });
                break;

            default:
                console.log("default");

        }
    }

    return (
        <div>
            
            <ReactBootStrap.Form variant="dark">
                <ReactBootStrap.Row>
                    <ReactBootStrap.Col xs="auto" className="my-1">
                        <ReactBootStrap.Form.Control name="caja" onChange={handleInputChange} placeholder="Busqueda" />
                    </ReactBootStrap.Col>
                    <ReactBootStrap.Col xs="auto" className="my-1">
                        <ReactBootStrap.Form.Select name="filtro" onChange={handleInputChange}>
                            <option value="1">Id</option>
                            <option value="2">Nombre</option>
                        </ReactBootStrap.Form.Select>
                    </ReactBootStrap.Col>

                    <ReactBootStrap.Col xs="auto" className="my-1">
                        <ReactBootStrap.Button onClick={()=>buscarGym()}>Buscar</ReactBootStrap.Button>
                    </ReactBootStrap.Col>

                    <ReactBootStrap.Col className="my-1 d-md-flex justify-content-md-end">
                        <ReactBootStrap.Button className="btn-success" href="/nuevo_gym">Crear gimnasio</ReactBootStrap.Button>
                    </ReactBootStrap.Col>                    
                </ReactBootStrap.Row>
            </ReactBootStrap.Form>



            <ReactBootStrap.Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NIT</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Contacto</th>
                    {/* <th>Horario</th> */}
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                     gym.map((gymnasio) => (
                            
                            <tr key={gymnasio.codigo}>
                                <td>{gymnasio.codigo}</td>
                                <td>{gymnasio.nit}</td>
                                <td>{gymnasio.nombre}</td>
                                <td>{gymnasio.direccion}</td>
                                <td>{gymnasio.contacto}</td>
                                {/* <td>{HorarioListItems(gymnasio.horario)}</td> */}
                                <td>
                                    <button className="btn btn-primary" onClick={()=>seleccionarGym(gymnasio,"Editar")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={()=>seleccionarGym(gymnasio)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                ))}     
            </tbody>

            </ReactBootStrap.Table>

            {/* modal editar */}

            <Modal isOpen={modalEditarGym}>
                <ModalHeader>
                    <div>
                        <h2>Actualizar Gimnasio</h2>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <input className="form-control"
                            readOnly
                            type="hidden"
                            value={gymSeleccionado.codigo}
                            onChange={handleChangeEditarGym}>
                        </input>
                        <br />
                        <label>NIT</label>
                        <input className="form-control"
                            type="number"
                            name="nit"
                            value={gymSeleccionado.nit}
                            onChange={handleChangeEditarGym}>
                        </input>
                        <br />
                        <label>Nombre</label>
                        <input className="form-control"
                            type="text"
                            name="nombre"
                            value={gymSeleccionado.nombre}
                            onChange={handleChangeEditarGym}>
                        </input>
                        <br />
                        <label>Direccion</label>
                        <input className="form-control"
                            type="text"
                            name="direccion"
                            value={gymSeleccionado.direccion}
                            onChange={handleChangeEditarGym}>
                        </input>
                        
                        <br />
                        <label>Numero de contacto</label>
                        <input className="form-control"
                            type="number"
                            name="contacto"
                            value={gymSeleccionado.contacto}
                            onChange={handleChangeEditarGym}>
                        </input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=> peticionPost()}>Actualizar</button>
                    <button className="btn btn-danger" onClick={()=> abrirCerrarModalEditarGym()}>Cancelar</button>
                </ModalFooter>
            </Modal>


        {/* MODAL ELIMINAR */}
        <Modal isOpen={modalEliminarGym}>
            <ModalBody>
                Confirma eliminar el gimnasio seleccionado: {gymSeleccionado.nombre}
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={()=> peticionEliminar()}>Confirmar</button>
                <button className="btn btn-secundary" onClick={()=> abrirCerrarModalEliminarGym()}>Cerrar</button>

            </ModalFooter>
        </Modal>



        </div>
    )
}

export default GimnasiosTable;
