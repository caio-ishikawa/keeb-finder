import Axios from 'axios';
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    // Gets all available keybords from mykeyboard.eu //
    Axios.get('http://localhost:3002/data')
      .then((res) => console.log(res));

    // Gets Ducky items from keygem.com //
    Axios.get('http://localhost:3002/keygem_ducky')
      .then((res) => console.log(res))

    // Gets GMMK items from keygem.com //
    // BUGGY (LOOK INTO THIS) //
    Axios.get('http://localhost:3002/keygem_gmmk')
      .then((res) => console.log(res));
  }, [])


  return (
    <div className="App">
      <p>keeb-finder</p>
    </div>
  );
}

export default App;
