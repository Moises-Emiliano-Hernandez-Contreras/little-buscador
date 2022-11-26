import { useEffect, useState } from "react";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [tabla, setTabla] = useState([]);
  const [busqueda, setBusqueda] = useState("")

  const obtener = async () => {
    await axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsuarios(response.data)
        setTabla(response.data)
      }).catch((error) => console.error(error))
  }

  const handleChange=(e)=>{
    setBusqueda(e.target.value)
    filtrar(e.target.value)    
  }

  const filtrar=(busq)=>{
    let resultado=tabla.filter((item)=>{
      if(item.name.toString().toLowerCase().includes(busq.toLowerCase())||
      item.company.name.toString().toLowerCase().includes(busq.toLowerCase())){
        return item
      }
    })
    setUsuarios(resultado)
  }
  useEffect(() => { obtener() }, [])

  return (
    <div className="container mt-5">
      <div className="container-input my-5">
        <input className="form-control w-50 my-3 inputBuscar" placeholder="Buscar por Nombre o Empresa..."
        value={busqueda}
        onChange={handleChange}
        autoFocus
        />
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faSearch}/>          
        </button>
      </div>
      <table className="table table-sm table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Usuario</th>
            <th scope="col">Correo</th>
            <th scope="col">Pagina</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Empresa</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length>0?usuarios.map((item) => (
            <tr>
              <th scope="row" key={item.id}>{item.id}</th>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.website}</td>
              <td>{item.address.city}</td>
              <td>{item.company.name}</td>
            </tr>
          )):<tr colSpan="8"
          className="text-center px-auto mx-auto">Usuario o Empresa inexistente</tr>}

        </tbody>
      </table>
    </div>
  );
}

export default App;
