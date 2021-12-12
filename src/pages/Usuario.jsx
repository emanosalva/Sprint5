import React from 'react';
import NavBar from '../componentes/NavBar';
import UsuariosTable from "../componentes/UsuariosTable";
import * as ReactBootStrap from "react-bootstrap";

const Usuario = () => {
    return (
        <div>
            <NavBar />
            <UsuariosTable />
        </div>
    )
}

export default Usuario;
