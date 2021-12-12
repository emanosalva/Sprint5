import React from 'react'

const FormBuscar = () => {
    return (
        <nav className="navbar navbar-dark bg-light">
            <div className="container fluid">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default FormBuscar
