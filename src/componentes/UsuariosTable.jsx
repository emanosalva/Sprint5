import React, { useEffect, useState} from "react";
import axios from "axios";
import { ModalBody, Modal, ModalFooter, ModalHeader } from 'reactstrap'
import * as ReactBootStrap from "react-bootstrap";
import Swal from "sweetalert2"
import { useHistory } from 'react-router'

const UsuariosTable = () => {
    const history = useHistory();
    const baseURL= "http://132.226.212.218:8080/usuario/";
    const [data, setData] = useState([])
    
        const peticionGet = async () => {
            await axios (baseURL)
            .then(response =>{
                setData(response.data);
            }).catch(error=>{
                console.log(error)
            })};
    useEffect(() => {
        peticionGet();
    }, [setData]);

    function valorEstado(estado){
        if(estado == true){
            return "Activo"
        }else{
            return "Inactivo"
        }
        
    }
 //PETICION POST
    const peticionPost = async()=>{
        await axios.post(baseURL,usuarioSeleccionado)
        .catch(error=>{
            console.log(error);
        })
        peticionGet();
        abrirCerrarModalEditar();
    }

//peticion eliminar
    const peticionDelete=async()=>{
        await axios.delete(baseURL+usuarioSeleccionado.id)
        .then(response =>{
            setData(data.filter(usuario=>usuario.id!==usuarioSeleccionado.id));
            abrirCerrarModalEliminar();
            Swal.fire(
                "confirmado",
                response.data,
                "warning"
            )
        }).catch(error =>{
            console.log(error);
        })
    }




    const [modalEditar, setModalEditar] =useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] =useState({
        id:"",
        nombre:"",
        apellido:"",
        estado: false
    });

//EDITAR eliminar
    const seleccionarUsuario=(elemento,caso) =>{
        setUsuarioSeleccionado(elemento);
        (caso==="Editar")?abrirCerrarModalEditar():abrirCerrarModalEliminar();
    }
    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

//eliminar
    // const seleccionarUsuarioDelete=(elemento) =>{
    //     setUsuarioSeleccionado(elemento);
    //     setModalEliminar(true);
    // }
    
    const handleChangeEdit=e=>{
        //console.log(e.target.value)
        const {name,value}=e.target;
        setUsuarioSeleccionado((prevState) =>({
            ...prevState,
            [name]:value
        }));
    }

//buscar

    const [datosBusqueda, setDatosBusquda] = useState({
        caja:"",
        filtro:"1"
    })
    const handleInputChange=(event)=>{
        //console.log(datosBusqueda.caja)
        setDatosBusquda({
            ...datosBusqueda,
            [event.target.name]:event.target.value
        })
    }

    const buscarUsuario = async () =>{
        //console.log(datosBusqueda.filtro);
        switch(datosBusqueda.filtro){
            
            case "1":
              // console.log(baseURL+datosBusqueda);
                await axios.get(baseURL+datosBusqueda.caja)
                
                .then(response=>{
                    //console.log(response.data)
                    
                    if(response.data !== null){
                        setData([response.data]);
                    }else{
                        Swal.fire(
                            "Sin resultados",
                            "Por favor confirma",
                            "Info")
                            history.push("usuarios")}

                }).catch(error =>{
                    console.log(error)
                })
                break;

            case "2":
                await axios.get(baseURL+"unombre/"+datosBusqueda.caja.toLocaleLowerCase())
                .then(response =>{
                    if(response.data.length !==0){
                        setData(response.data);
                    }else{
                        Swal.fire(
                            "Nombre no encontrado",
                            "",
                            "info")
                        history.push("usuarios");
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

            <ReactBootStrap.Form  variant="dark">
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
                        <ReactBootStrap.Button onClick={()=>buscarUsuario()}>Buscar</ReactBootStrap.Button>
                    </ReactBootStrap.Col>

                    <ReactBootStrap.Col className="my-1 d-md-flex justify-content-md-end">
                        <ReactBootStrap.Button className="btn-success" href="/nuevo_usuario">Crear usuario</ReactBootStrap.Button>
                    </ReactBootStrap.Col>                    
                </ReactBootStrap.Row>
            </ReactBootStrap.Form>   


            <ReactBootStrap.Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre Completo</th>
                        <th>Telefono</th>
                        <th>Fecha Ingreso</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            data.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}{" "}{usuario.apellido}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.fechaIngreso}</td>
                                    <td>{valorEstado(usuario.estado)}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={()=>seleccionarUsuario(usuario,"Editar")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                            </svg>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={()=>seleccionarUsuario(usuario)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                    ))}
                </tbody>

            </ReactBootStrap.Table>

            {/* Modal Edit */}
            <Modal isOpen={modalEditar}>
                <ModalHeader>
                <div>
                    <h2>Actualizar Usuario</h2>
                </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <input className="form-control"
                            readOnly
                            type="hidden"
                            value={usuarioSeleccionado.id}
                            onChange={handleChangeEdit}>
                        </input>
                        <br />
                        <label>Nombre</label>
                        <input className="form-control"
                            type="text"
                            name="nombre"
                            value={usuarioSeleccionado.nombre}
                            onChange={handleChangeEdit}>
                        </input>
                        <br /><label>Apellido</label>
                        <input className="form-control"
                            type="text"
                            name="apellido"
                            value={usuarioSeleccionado.apellido}
                            onChange={handleChangeEdit}>
                        </input>
                        <br />
                        <label>Telefono</label>
                        <input className="form-control"
                            type="text"
                            name="telefono"
                            value={usuarioSeleccionado.telefono}
                            onChange={handleChangeEdit}>
                        </input>
                        <br />
                        <select name="estado" value={usuarioSeleccionado.estado} onChange={handleChangeEdit}>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </select>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=> peticionPost()}>Actualizar</button>
                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cerrar</button>
                </ModalFooter>
            </Modal>


            {/* modal eliminar */}
            <Modal isOpen={modalEliminar}>
            <ModalBody>
                Confirma eliminar registro del usuario: {usuarioSeleccionado.nombre}
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={()=>peticionDelete()}>Confirmar</button>
                <button className="btn btn-secundary" onClick={()=>{abrirCerrarModalEliminar()}}>Cancelar</button>
            </ModalFooter>

            </Modal>
        </div>
    )
}

export default UsuariosTable
