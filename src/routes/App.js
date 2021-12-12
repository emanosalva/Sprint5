import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom"
import Inicio from "../pages/Inicio";
import Usuario from "../pages/Usuario";
import Informacion from "../pages/Informacion";
import Gymnasios from "../pages/Gymnasios";
import NavBar from "../componentes/NavBar";
import Layout from "../containers/Layout";
import NotFount from "../pages/NotFount";
import NewUser from "../pages/NewUser";
import NewGym from "../pages/NewGym";


function App() {
  return (
    <BrowserRouter>
      <Layout>

        <Switch>
          <Route exact path="/informacion" component={Informacion} />
          <Route exact path="/gimnasios" component={Gymnasios} />
          <Route exact path="/usuarios" component={Usuario} />
          <Route exact path="/nuevo_usuario" component={NewUser} />
          <Route exact path="/nuevo_gym" component={NewGym} />
          <Route exact path="/" component={Inicio} />
          <Route  path="*" component={NotFount} />
        </Switch>
        </Layout>
    </BrowserRouter>
     
  );
}

export default App;
