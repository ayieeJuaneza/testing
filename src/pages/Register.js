import React from 'react'
import UserContext from "../UserContext"
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

function Register() {

    const navigate = useNavigate()

    const [ firstName, setFirstName ] = useState("")
    const [ mobileNo, setMobileNo ] = useState("")
    const [ company, setCompany ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ location, setLocation ] = useState("")

    const goToLoginKana = () => {
        navigate("/")
    }

    const handleMobileNoChange = (e) => {
        const inputMobileNo = e.target.value;
        if (inputMobileNo.length <= 11) {
            setMobileNo(inputMobileNo);
        }
    };

    function registerUser(e) {

        e.preventDefault();

        if(mobileNo === "") {

        }
        else {
        fetch(`http://192.168.210.77:4000/users/checkNumber`, {
          method: "POST",
          headers: {
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({
        mobileNo: mobileNo
        })
        })
        .then(res => res.json())
        .then(data => {

            // console.log(data);

            if(data === true){

                Swal.fire({
                    title: 'Duplicate number found',
                    icon: 'error',
                    text: 'Please provide a different number.'   
                });

            } else {
              if(firstName === "" || company === "" || location === "" || password === "") {
                if(firstName === "") {
                  alert("Firstname is required fields")
                }
                if(company === "") {
                  alert("Comnpany is required fields")
                }
                if(location === "") {
                  alert("Location is required fields")
                }
                if(password === "") {
                  alert("Password is required fields")
                }
              }
              else {
                fetch(`http://192.168.210.77:4000/users/register`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        mobileNo: mobileNo,
                        company: company,
                        location: location,
                        password: password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if(data === true){
                        setFirstName('');
                        setCompany('')
                        setPassword('');
                        setMobileNo('')
                        setLocation('')

                        Swal.fire({
                            title: 'Registration successful',
                            icon: 'success',
                        });
                        navigate("/");
                    } else {
                        Swal.fire({
                            title: 'Something wrong',
                            icon: 'error',
                            text: 'Please try again.'   
                        });
                    };
                })
            };
          }
          })
        }
    }
    

  return (
    <div fluid className='login'>
      <Row> 
        <Col md={6}>
          <div className='col-control'>
            <Form onSubmit={(e) => registerUser(e)} className="form mb-5">

              <h1>EARLY CHRISTMAS RAFFLE</h1>
              <p className='mb-4'>Sponsored by: Sir Francis</p>

              <Form.Group className='mb-1' controlId="formBasicUserName">
                <Form.Label className='text-white'>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder='Name your using here in Office'
                className='control'
                value={firstName}
                onChange={ e => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className='mb-1' controlId="formBasicUserName">
                <Form.Label className='text-white'>Mobile Number</Form.Label>
                <Form.Control
                type="text"
                className='control'
                value={mobileNo}
                onChange={handleMobileNoChange}
                />
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label className='text-white'>Company</Form.Label>
                <Form.Control
                    as="select"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className='control cursor'>
                        <option value="">-- Choose --</option>
                        <option value="DFNN/IEST">DFNN/IEST</option>
                        <option value="Iwin">Iwin</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="gender">
                <Form.Label className='text-white'>Location</Form.Label>
                <Form.Control
                    as="select"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className='control cursor'>
                        <option value="">-- Choose --</option>
                        <option value="silang">Within The Area</option>
                        <option value="outside">Beyond The Area</option>
                </Form.Control>
                </Form.Group>

              <Form.Group className='mb-1' controlId="formBasicPassword">
                <Form.Label className='text-white'>Password</Form.Label>
                <Form.Control
                type="password"
                className='control'
                value={password}
                onChange={ e => setPassword(e.target.value)}
              />
                <Row>
                    <Col>
                    <Button type='submit' className='mt-3 py-3 login-btn'>REGISTER</Button>
                    </Col>
                    <Col>
                    <Button onClick={goToLoginKana} className='mt-3 py-3 login-btn'>HAVE AN ACCOUNT?</Button>
                    </Col>
                </Row>
              </Form.Group>
            </Form>
          </div> 
        </Col>
      </Row>
    </div>
  )
}

export default Register