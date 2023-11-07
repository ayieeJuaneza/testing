import React from 'react'
import UserContext from "../UserContext"
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import CryptoJS from 'crypto-js';

function Login() {

    const secretKey = 'your-secret-key'
    const navigate = useNavigate()


    const { user, setUser } = useContext(UserContext);
    const [mobileNo, setmobileNo] = useState('');
    const [password, setPassword] = useState('');
    // const [isActive, setIsActive] = useState(false);

    // useEffect(() => {
    //     if(mobileNo !== '' && password !== ''){
    //         setIsActive(true);
    //     }else{
    //         setIsActive(false);
    //     }

    // }, [mobileNo, password]);

    const goToLogin = () => {
        navigate("/register")
    }

    function authenticate(e) {
        e.preventDefault();


        fetch(`http://192.168.210.77:4000/users/login`, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                mobileNo : mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data.access){
                retrieveUserDetails(data.access);
                // console.log(data.access)

                Swal.fire({
                  icon: 'success',
                  title: 'Login Successful!',
                })
                    navigate("/tables")

            }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Authentication Failed!',
                  text: 'Please try again!',
                })
            }
        })
        setmobileNo('');
        setPassword('');

    }

     // Retrieve user details using its token
    const retrieveUserDetails = (access) => {
        fetch(`http://192.168.210.77:4000/users/details`, {
            headers: {
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${access}`
            },
        })
        .then(res => res.json())
        .then(data => {

            // console.log(data)

            const isAdminString = data.isAdmin.toString();

            const encryptedLocation = CryptoJS.AES.encrypt(
                data.location,
                secretKey
              ).toString();

              const encryptedCompany = CryptoJS.AES.encrypt(
                data.company,
                secretKey
              ).toString();

              const encryptedisAdmin = CryptoJS.AES.encrypt(
                isAdminString,
                secretKey
            ).toString();
            
                sessionStorage.setItem("hulaanMoto", encryptedLocation);
                sessionStorage.setItem("number", data.mobileNo);
                sessionStorage.setItem("firstNameto", data.firstName);
                sessionStorage.setItem("patiToAnoTo", encryptedCompany);
                sessionStorage.setItem("EhEto?", encryptedisAdmin);

                // console.log(data.location)

                // setUser({
                //     id : data._id,
                //     mobileNo : data.mobileNo,
                //     isAdmin : data.isAdmin
                // })
            // console.log(data)

        })
    }
    // function authenticate(e) {
    //     e.preventDefault();
    
    //     fetch(`http://192.168.210.146:4000/users/login`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             mobileNo: mobileNo,
    //             password: password
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         if (data.token) {
    //             retrieveUserDetails(data.token);
    //             console.log(data.token)
    
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Login Successful!',
    //             });
    //             navigate("/tables");
    //         } else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Authentication Failed!',
    //                 text: 'Please try again!',
    //             });
    //         }
    //     });
    
    //     setmobileNo('');
    //     setPassword('');
    // }
    
    // Retrieve user details using the provided token
    // const retrieveUserDetails = (token) => {
    //     fetch(`http://192.168.210.146:4000/users/details`, {
    //     method: 'GET',
    //     headers: {
    //         "Content-type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //     },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    
    //         const encryptedLocation = CryptoJS.AES.encrypt(
    //             data.user.location,
    //             secretKey
    //         ).toString();
    
    //         const encryptedCompany = CryptoJS.AES.encrypt(
    //             data.user.company,
    //             secretKey
    //         ).toString();
    
    //         const encryptedisAdmin = CryptoJS.AES.encrypt(
    //             data.user.isAdmin.toString(),
    //             secretKey
    //         ).toString();
    
    //         sessionStorage.setItem("hulaanMoto", encryptedLocation);
    //         sessionStorage.setItem("number", data.user.mobileNo);
    //         sessionStorage.setItem("patiToAnoTo", encryptedCompany);
    //         sessionStorage.setItem("EhEto?", encryptedisAdmin);
    
    //         setUser({
    //             id: data.user._id,
    //             mobileNo: data.user.mobileNo,
    //             isAdmin: data.user.isAdmin
    //         });
    //     });
    // }

  return (
    <div fluid className='login'>
      <Row> 
        <Col md={6}>
          <div className='col-control'>
            <Form onSubmit={(e) => authenticate(e)} className="form">

              <h1>EARLY CHRISTMAS RAFFLE</h1>
              <p className='mb-5'>Sponsored by: Sir Francis</p>

              <Form.Group className='mb-1' controlId="formBasicUserName">
                <Form.Label className='text-white'>Registered Mobile Number</Form.Label>
                <Form.Control
                type="text"
                className='control'
                value={mobileNo}
                onChange={ e => setmobileNo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-1' controlId="formBasicPassword">
                <Form.Label className='text-white'>Password</Form.Label>
                <Form.Control
                type="password"
                className='control'
                value={password}
                onChange={ e => setPassword(e.target.value)}
              />
              
              <Button type='submit' className='mt-3 py-3 login-btn'>LOGIN</Button>
              <Button onClick={goToLogin} className='mt-3 py-3 login-btn'>NO ACCOUNT YET?</Button>
              </Form.Group>
            </Form>
          </div> 
        </Col>
      </Row>
    </div>
  )
}

export default Login