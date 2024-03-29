
import '../styles/App.scss';
import { useEffect, useState } from 'react';
import fetchAdalabers from '../services/api'

const App = () => {
  //varstate
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCounselor, setSearchCounselor] = useState('Todos');
  const [newAdalaber, setNewAdalaber] = useState({
    'id': crypto.randomUUID(),
    "name": "",
    "counselor": "",
    "speciality": "",
    "social_networks": [],
  });
 const [message, setMessage] = useState('');
  //useffect
  useEffect(() => {
    fetchAdalabers().then((response) => {
      setData(response);
    });
  }, []);

  //handlers
  const handleNewAdalaber = (ev) => {
     setNewAdalaber({ ...newAdalaber, [ev.target.id]: ev.target.value });
   
  };
  const handleClick = (ev) => {
    ev.preventDefault();
 
    if( newAdalaber.name === '' && newAdalaber.counselor === ''&& newAdalaber.speciality === ''){
      setNewAdalaber({ ...newAdalaber, [ev.target.id]: ev.target.value });
      setMessage('Debe rellenar al menos uno de los campos. GRACIAS');
    }
    else if (!( newAdalaber.name !== '' && newAdalaber.counselor !== ''&& newAdalaber.speciality !== '')){
      setData([...data, newAdalaber]);
      setMessage('');
    }
  
    setNewAdalaber({
      'id': crypto.randomUUID(),
      "name": "",
      "counselor": "",
      "speciality": "",
      "social_networks": [],
    })
  };
  const handleSearchName = (ev) => {
    setSearchName(ev.target.value);
  }
  const handleSearchCounselor = (ev) => {
    setSearchCounselor(ev.target.value);
  }
  //fctions

  const htmlData = data
    .filter((filterName) => filterName.name.toLowerCase().includes(searchName.toLowerCase()))
    .filter((filterCounselor) => {
      let result = '';
      if (searchCounselor === 'Todos') {
        result = true;
        return result;
      }
      else if (filterCounselor.counselor === searchCounselor) {
        result = true;
        return result;
      }
      return result;
    })
    .map((adalaber) => {
      const socialNetworks = (adalaber.social_networks).map((social, index) => {
        return (
          <li key={index} className='socialmedialist'>
            <a href={social.url}>{social.name}</a>
          </li>
        )
      });
      return (
        <tr key={adalaber.id} className='column'>
          <td>{adalaber.name}</td>
          <td>{adalaber.counselor}</td>
          <td>{adalaber.speciality}</td>
          <td><ul>{socialNetworks}</ul></td>
        </tr>
      )
    });
  return (
    <div>
      <header>
        <h1>Adalabers</h1>
      </header>
      <main>
        <div >
          <form action="" className="formsearch">
            <label htmlFor="">Nombre</label>
            <input type="text" placeholder=' Ej: MariCarmen' onInput={handleSearchName} value={searchName} />
            <label htmlFor="">Escoje una tutora</label>
            <select name="" id="" className="" value={searchCounselor} onChange={handleSearchCounselor}>
              <option disabled>Escoge una opción</option>
              <option value="Todos">Todos</option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
              <option value="Yanelis">Yanelis</option>
              <option value="Miguel">Miguel</option>
            </select>
          </form>
        </div>
        <div className='superdivtable'>
          <table className="table">
            <thead className="thead">
              <tr key='001' className='column'>
                <th>Nombre</th>
                <th>Tutora</th>
                <th>Especialidad</th>
                <th colSpan={3} className='socialmediacolum'>Redes</th>
              </tr>
            </thead>
            <tbody>
              {htmlData}
            </tbody>
          </table>
        </div>
        <h2>Añadir una Adalaber</h2>
        <div className='divadd'>
          <form >
            <div className="formadd">
              <div className='formbox'>
                <label htmlFor="">Nombre:</label>
                <input type="text" id="name" onInput={handleNewAdalaber} value={newAdalaber.name} />
              </div>
              <div className='formbox'>
                <label htmlFor="">Tutora:</label>
                <input type="text" id="counselor" onInput={handleNewAdalaber} value={newAdalaber.counselor} />
              </div>
              <div className='formbox'>
                <label htmlFor="">Especialidad:</label>
                <input type="text" id="speciality" onInput={handleNewAdalaber} value={newAdalaber.speciality} />
              </div>
            </div>
            <p className='message'>{message}</p>
            <button className="button" onClick={handleClick}>Añadir una nueva Adalaber</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
