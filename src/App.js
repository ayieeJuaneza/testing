import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { UserProvider } from './UserContext';
import {  useState, useEffect, lazy } from 'react';
import RaffleDeclare from './pages/RaffleDeclare';
import Login from './pages/Login';
import Register from './pages/Register';
import Tables from './pages/Tables';
import Error from './pages/Error';
import Signout from './pages/SignOut';
import AdminTable from './pages/AdminTable';
import Dashboard from './pages/Dashboard';


function App () {
  
  const [user, setUser] = useState({
    RoleIdx: sessionStorage.getItem("role"),
  })


  // Function for clearing the storage on logout
  const unsetUser = () => {
  sessionStorage.clear();
  }
  
 return (

  <UserProvider value={{user, setUser, unsetUser}}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Raffle" element={<RaffleDeclare/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/tables" element={<Tables/>}/>
          <Route path="/admin" element={<AdminTable/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/error" element={<Error/>}/>
          <Route path="/signout" element={<Signout/>}/>
        </Routes>
      </Router>
    </div>
  </UserProvider>

 ) 

}



export default App;