import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Col, Row,Pagination } from "react-bootstrap"
import { FaSortAmountDown, FaTheRedYeti } from "react-icons/fa"
import moment from "moment"
import Swal from 'sweetalert2';
import { decryptData } from '../Utils';
import { useNavigate } from "react-router-dom";


function Tables() {

    const oopps = decryptData(sessionStorage.getItem('EhEto??'));
    
    const navigate = useNavigate()

    useEffect(() => {

        if ( oopps !== "true" || oopps === "true") {
            // console.log("YEHEEY")
        } else {
            navigate("/error")
        }
    });
    


    const tagoMoTo = decryptData(sessionStorage.getItem('hulaanMoto'));
    const tagoMoRinTo = decryptData(sessionStorage.getItem('patiToAnoTo'));
    const sigeNga = decryptData(sessionStorage.getItem("EhEto?"))
    const niceTry = decryptData(sessionStorage.getItem("HulaanMoNgaTo"))

    // console.log(tagoMoRinTo)
    // console.log(tagoMoTo)
    // console.log(sigeNga)
    // console.log(niceTry)

    const [sortedData, setSortedData] = useState([]);
    const [ showModal, setShowModal ] = useState(false)
    const [ showModal1, setShowModal1 ] = useState(false)
    const [ time, setTime ] = useState("")
    const [ timer, setTimer ] = useState("")
    const [ timeOut, setTimeOut ] = useState(null)
    const [ timeShift, setTimeShift ] = useState(null)
    const [ timeShiftOut, setTimeShiftOut ] = useState(null)
    const [ isButtonClickable, setIsButtonClickable] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [ searchQuery, setSearchQuery] = useState('');
    const [ currentPage, setCurrentPage] = useState(1);

    // const handleTime = () => {
       
    //   };

    

    const handleChange = (event) => {
        const newPerPage = parseInt(event.target.value);
        setItemsPerPage(newPerPage);
      };

    const filteredData = sortedData.filter((user) =>
    user.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.loginTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.logoutTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsToDisplay = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const logTimeShift = () => {
        // console.log(timeShift)
      }
    
    const openModal = () => {
        setShowModal(true)
        // handleTime()
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const OpenModalforTicks = () => {
        setShowModal1(true)
        checkAvailability()
    }

    const closeModalforTicks = () => {
        setShowModal1(false)
    }

    const openAdminModal = () => {
        navigate("/admin")
    }

    const goToRaffle = () => {
        navigate("/Raffle")
    }

    const goToDashboard = () => {
        navigate("/dashboard")
    }

    const handleSort = (sortBy) => {
        const sorted = [...sortedData].sort((a, b) => b[sortBy] - a[sortBy]);
        setSortedData(sorted);
    };

    const handleSort1 = (sortBy) => {
        const sorted = [...sortedData].sort((a, b) => b[sortBy] - a[sortBy]);
        setSortedData(sorted);
    };

    useEffect(() => {
        fetch(`http://192.168.210.77:4000/users/all-users`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setSortedData(data.users)
        })
    }, [])

    // useEffect(() => {
    //     fetch(`http://192.168.210.146:4000/users/player/${sessionStorage.getItem("number")}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data.player);
    //             setTime(data.player.timeIn);
    //             setTimeOut(data.player.timeOut);
    
    //             const timeIn = data.player.timeIn;
    //             const timeOut = data.player.timeOut;
    
    //             const [hoursIn, minutesIn] = timeIn.split(":");
    //             const [hoursOut, minutesOut] = timeOut.split(":");
    
    //             const currentDate = new Date();
    //             const timeInDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hoursIn, minutesIn);
    //             const timeOutDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hoursOut, minutesOut);
    
    //             console.log(timeInDate);
    //             console.log(timeOutDate);
    
    //             const timeDifference = (timeOutDate - timeInDate) / (1000 * 60 * 60); // Time difference in hours
    
    //             console.log(timeDifference);
    
    //             if (timeDifference >= 8) {
    //                 setIsButtonClickable(true);
    //             }
    //         });
    // }, []);

    const checkAvailability = () => {
        fetch(`http://192.168.210.77:4000/users/player/${sessionStorage.getItem("number")}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.player);
                setTime(data.player.timeIn);
                setTimeOut(data.player.timeOut);

                sessionStorage.setItem("testingCheckIn", data.player.timeIn)
    
                const timeIn = data.player.timeIn;
                const timeOut = data.player.timeOut;
    
                const [hoursIn, minutesIn] = timeIn.split(":");
                const [hoursOut, minutesOut] = timeOut.split(":");
    
                const currentDate = new Date();
                const timeInDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hoursIn, minutesIn);
                const timeOutDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hoursOut, minutesOut);
    
                // console.log(timeInDate);
                // console.log(timeOutDate);
    
                const timeDifference = (timeOutDate - timeInDate) / (1000 * 60 * 60); 
    
                // console.log(timeDifference);
    
                if (timeDifference >= 9) {
                    setIsButtonClickable(true);
                }
            });
        }


    const resetTimeInAndOut = () => {
        fetch(`http://192.168.210.77:4000/users/timeInAndOutZero`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: sessionStorage.getItem("firstNameto"),
                mobileNo: sessionStorage.getItem("number")
            })
        })
    }

        

    const updateTimeIn = () => {
        const currentTime = moment();
        Swal.fire({
            title: `PROCEED TO CHECK-IN ? 
            Time: ${currentTime.format('LT')}`,
            icon: "info",
            confirmButtonText: "OK",
            showCancelButton: true,
            allowOutsideClick: false
        })
        .then((result) => {
            if (result.isConfirmed) {
                fetch("http://192.168.210.77:4000/users/update-timein", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mobileNo: sessionStorage.getItem("number"),
                        firstName: sessionStorage.getItem("firstNameto")
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    if  (data.message === "TimeIn has already been set"){
                        Swal.fire({
                            title: `Ooooops! You have already checked in today.`,
                            icon: "error",
                            confirmButtonText: "OK",
                            allowOutsideClick: false
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        })
                    } else {
                        const currentTime = moment();
                        Swal.fire({
                            title: `CHECK-IN TIME: ${currentTime.format('LT')}`,
                            icon: "success",
                            confirmButtonText: "OK",
                            allowOutsideClick: false
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        })
                    }
                })
            }else{
                window.location.reload();
            }
        })
    }

    const updateTimeOut = () => {
        const currentTime = moment();
        Swal.fire({
            title: `PROCEED TO CHECK-OUT ? 
            Time: ${currentTime.format('LT')}`,
            icon: "info",
            confirmButtonText: "OK",
            showCancelButton: true,
            allowOutsideClick: false
        })
        .then((result) => {
            if (result.isConfirmed) {
                fetch("http://192.168.210.77:4000/users/update-timeout", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mobileNo: sessionStorage.getItem("number"),
                        firstName: sessionStorage.getItem("firstNameto")
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.message)
                    if (data.message === "TimeOut updated successfully"){
                        const currentTime = moment();
                    Swal.fire({
                        title: `CHECK-OUT TIME: ${currentTime.format('LT')}`,
                        icon: "success",
                        confirmButtonText: "OK",
                        allowOutsideClick: false
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                    });
                    } else {
                        Swal.fire({
                            title: `ERROR ENCOUNTERED`,
                            icon: "error",
                            confirmButtonText: "OK",
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                })
            } else {
                window.location.reload();
            }
        })
    }
    


    const updateRaffleTickets = () => {
        const storedTime = sessionStorage.getItem("testingCheckIn");
        const currentTime = moment(storedTime, 'HH:mm');
        let tickets = 0;

        const oneHourFortyFiveMinsBeforeTimeShift = moment(timeShift, 'HH:mm').subtract(1, 'hours').subtract(45, 'minutes');
        const oneHourBeforeTimeShift = moment(timeShift, 'HH:mm').subtract(1, 'hours');

        // console.log('Current Time:', currentTime);
        // console.log('Time Shift:', timeShift);
        // console.log('Location:', tagoMoTo);
        // console.log('company:', tagoMoRinTo);

        const isTimeSufficient = currentTime.isSameOrBefore(oneHourFortyFiveMinsBeforeTimeShift);
        const isTimeSufficientforHour = currentTime.isSameOrBefore(oneHourBeforeTimeShift);
        const isLocationOutside = tagoMoTo === 'outside';
        const isTimeisFiveAm = timeShift === `${moment('05:00', 'HH:mm').format('HH:mm')}`;
        const isTimeisSevenAm = timeShift === `${moment('07:00', 'HH:mm').format('HH:mm')}`;
        const isNotLocationOutside = tagoMoTo !== 'outside';
        // const isEitherLocationOutside = tagoMoTo === 'outside' || tagoMoTo !== 'outside';
        // const isCompany = tagoMoRinTo === 'Iwin';


        // console.log('Is Time Sufficient:', isTimeSufficient);
        // console.log('Is Time Sufficient1HOUR:', isTimeSufficientforHour);
        // console.log('Is Location Outside:', isLocationOutside);
        // console.log('Is Location Outside||not:', isEitherLocationOutside);
        // console.log('Is Company:', isCompany);
        // console.log('Is FiveAm:', isTimeisFiveAm);

        if (isTimeisSevenAm && isTimeSufficient && isLocationOutside) {
            tickets = 6;
        } else if (isTimeisFiveAm && isTimeSufficient && isLocationOutside) {
            tickets = 6;
        } else if (isTimeSufficient && isLocationOutside) {
            tickets = 5;
        } else if (isTimeisFiveAm && isTimeSufficient && isNotLocationOutside) {
            tickets = 4;
        } else if (isTimeisSevenAm && isTimeSufficient && isNotLocationOutside) {
            tickets = 4;
        } else if (isTimeSufficient && isNotLocationOutside) {
            tickets = 2;
        } else if (isTimeSufficientforHour && isTimeisFiveAm && isLocationOutside) {
            tickets = 3;
        } else if (isTimeSufficientforHour && isTimeisSevenAm && isLocationOutside) {
            tickets = 3;
        } else if (isTimeSufficientforHour && isTimeisFiveAm && isNotLocationOutside) {
            tickets = 1;
        } else if (isTimeSufficientforHour && isTimeisSevenAm && isNotLocationOutside) {
            tickets = 1;
        }

        // console.log('Tickets:', tickets);
    
        fetch(`http://192.168.210.77:4000/users/add-raffle-tickets`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobileNo: sessionStorage.getItem("number"),
                time: time,
                timeOut: timeOut,
                timeShift: timeShift,
                company: tagoMoRinTo,
                ticketsToAdd: tickets,
                location: tagoMoTo
            })
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            if (tickets === 0){
                resetTimeInAndOut()
                Swal.fire({
                    title: `AGAHAN MO PA NEXT TIME`,
                    text: ":(", 
                    icon: "error",
                    confirmButtonText: "OK",
                    allowOutsideClick: false
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }
            else {
                resetTimeInAndOut()
                Swal.fire({
                    title: `Congratulations you earned ${tickets} tickets`,
                    text: "Click 'OK' to see if you have a random BONUS!!", 
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        const probability = Math.random();
                        const oneHourAfterTimeShiftOut = moment(timeShiftOut, 'HH:mm').add(1, 'hours');
                        const isOneHourAfter = moment(timeOut, 'HH:mm').isSame(oneHourAfterTimeShiftOut);

                        console.log(isOneHourAfter)
                        console.log(oneHourAfterTimeShiftOut)
                        

                        if(!isOneHourAfter) {
                            Swal.fire({
                                title: `You need to stay at least 1 hour after the Shift's End`,
                                text: ':(',
                                icon: "error",
                                confirmButtonText: "OK",
                                allowOutsideClick: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        } else {
                            if (probability < 0.1) {
                                Swal.fire({
                                    title: `Congratulations ${sessionStorage.getItem("firstNameto")}! You won Shell's Hotdog! ${moment().format('llll')}`,
                                    text: "PAPICTURAN AH TAS BIGAY KAY AYIE KASAMA YUNG DATE AND TIME",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                    allowOutsideClick: false
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            } else if (probability < 0.3) {
                                Swal.fire({
                                    title: `Congratulations ${sessionStorage.getItem("firstNameto")}! You won Shell's Coffee! ${moment().format('llll')}`,
                                    text: "PAPICTURAN AH TAS BIGAY KAY AYIE KASAMA YUNG DATE AND TIME",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                    allowOutsideClick: false
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            } else if (probability < 0.6) {
                                Swal.fire({
                                    title: `Congratulations ${sessionStorage.getItem("firstNameto")}! You won Chan's Coffee! ${moment().format('llll')}`,
                                    text: "PAPICTURAN AH TAS BIGAY KAY AYIE KASAMA YUNG DATE AND TIME",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                    allowOutsideClick: false
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: `Ay talo bawi next time!!`,
                                    text: ';(',
                                    icon: "error",
                                    confirmButtonText: "OK",
                                    allowOutsideClick: false
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            }
                        }
                        
                    }
                })
            }
        });
    }

    // const updateRaffleTickets = (timeIn, timeOut) => {
    //     const currentTime = moment();
    //     let tickets = 0;
    
    //     // ... (existing logic remains unchanged)
    
    //     const timeDifference = timeOut.diff(timeIn, 'hours');
    
    //     if (timeDifference >= 8) {
    //         fetch(`http://192.168.210.146:4000/users/add-raffle-tickets`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 mobileNo: sessionStorage.getItem("number"),
    //                 time: timeIn.format(), // Assuming timeIn is a moment object
    //                 timeShift: timeShift,
    //                 company: tagoMoRinTo,
    //                 ticketsToAdd: tickets,
    //                 location: tagoMoTo
    //             })
    //         })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             Swal.fire({
    //                 title: `Congratulations you earned ${tickets} tickets`,
    //                 icon: "success",
    //                 confirmButtonText: "OK",
    //                 allowOutsideClick: false
    //             })
    //             .then((result) => {
    //                 if (result.isConfirmed) {
    //                     window.location.reload();
    //                 }
    //             })
    //         });
    //     } else {
    //         console.log("Time difference is less than 8 hours. Not executing API call.");
    //     }
    // }

    const SignOutKana = () => {
        navigate("/signOut")
    }

    // const updateRaffleTickets = () => {
    //     const currentTime = moment();
    //     let tickets = 2;
    
    //     if (
    //         (moment(timeShift, 'HH:mm').subtract(1, 'hours').subtract(45, 'minutes').isSameOrBefore(currentTime) || 
    //         moment(timeShift, 'HH:mm').subtract(1, 'hours').subtract(45, 'minutes').isSame(currentTime)) &&
    //         tagoMoTo === 'outside'
    //     ) {
    //         tickets = 5;
    //     }
    
    //     fetch(`${process.env.REACT_APP_API_URL}/users/add-raffle-tickets`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             mobileNo: sessionStorage.getItem("number"),
    //             time: time,
    //             timeShift: timeShift,
    //             company: tagoMoRinTo,
    //             ticketsToAdd: tickets,
    //             location: tagoMoTo
    //         })
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         Swal.fire({
    //             title: `Congratulations you earned ${tickets} tickets`,
    //             icon: "success",
    //             confirmButtonText: "OK",
    //             allowOutsideClick: false
    //         })
    //         .then((result) => {
    //             if (result.isConfirmed) {
    //                 window.location.reload();
    //             }
    //         });
    //     });
    // }

    setInterval(function() {
        setTimer(moment().format('dddd, MMM. D, YYYY'))
      }, 1000);

  return (
    <div className="Table-Cont p-5">
        <div className='p-5'>
            <div className='test'>
                <Row>
                    <Col>
                        <Button onClick={updateTimeIn}  className='bg-dark mb-3'>CHECK IN</Button>
                        <Button onClick={updateTimeOut} className='bg-dark mb-3 ms-3'>CHECK OUT</Button>
                        {/* <Button onClick={openModal} className={`bg-dark mb-3 ms-3 ${isButtonClickable ? '' : 'disabled'}`} disabled={!isButtonClickable}>
                            GET TICKETS HERE
                        </Button> */}
                        <Button onClick={OpenModalforTicks} className={`bg-dark mb-3 ms-3`}>
                            GET TICKETS HERE
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button onClick={SignOutKana} className='bg-dark mb-3'>Sign Out</Button>
                        {
                            sigeNga === "true"
                            ?
                            <>
                            <Button onClick={openAdminModal}  className='bg-dark mb-3 ms-3'>Admin's Dashboard</Button>
                            <Button onClick={goToRaffle}  className='bg-dark mb-3 ms-3'>START RAFFLE</Button>
                            </>
                            :
                            <>
                            {/* <Button onClick={goToDashboard}  className='bg-dark mb-3 ms-3'>See Dashboard</Button> */}
                            </>
                        }
                    </Col>
                </Row>
                
            </div>
            <h6 className='text-white'>PEM (PERFORMANCE, EFFICIENCY, MOTIVATION)<span className='ms-3'>{timer}</span></h6>
            <Table striped bordered hover variant="dark" className="custom-table rounded">
            <thead className='text-center'>
                <tr>
                <th>Company</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th className='d-flex justify-content-center'>Ticket Entries  
                    <div className='d-flex align-items-center justify-content-center'>
                        <i 
                            onClick={() => handleSort('raffleTickets')}
                            className='d-flex ps-3 cursor'><FaSortAmountDown/>
                        </i>
                    </div>
                </th>
                {/* <th onClick={() => handleSort('raffleTickets')}>Tickets</th> */}
                <th>Check In</th>
                <th>Check Out</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {itemsToDisplay.map((item, index) => (
                <tr key={index}>
                <td>{item.company}</td>
                    <td>{item.firstName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.raffleTickets}</td>
                    <td>{item.timeIn}</td>
                    <td>{item.timeOut}</td>
                </tr>
                ))}
            </tbody>
            </Table>
            <Pagination className='me-5'>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev
                    onClick={() =>
                        handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    />

                    {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                    ))}

                    <Pagination.Next
                    onClick={() =>
                        handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
                    }
                    />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
        </div>

        <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
        <Modal.Title>CHECK IN TO UPDATE RAFFLE TICKETS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={e => updateRaffleTickets(e)} >
            <Row>
                <Col>
                    <Form.Group className='mb-3' controlId="passWord">
                        <Form.Label className='mb-0'>Mobile Number</Form.Label>
                        <Form.Control
                        type="text"
                        value={sessionStorage.getItem("number")}
                        disabled
                        required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='mb-3' controlId="passWord">
                        <Form.Label className='mb-0'>Check-In</Form.Label>
                        <Form.Control
                        type="text"
                        value={time}
                        // onChange={e => setTime(e.target.value)}
                        disabled
                        required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='mb-3' controlId="passWord">
                        <Form.Label className='mb-0'>Check-Out</Form.Label>
                        <Form.Control
                        type="text"
                        value={timeOut}
                        // onChange={e => setTime(e.target.value)}
                        disabled
                        required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="gender">
                    <Form.Label className='mb-0'>Shift's Start</Form.Label>
                    <Form.Control
                        as="select"
                        value={timeShift}
                        onClick={logTimeShift}
                        onChange={e => setTimeShift(e.target.value)}
                        className='control cursor'>
                            <option>-- Choose --</option>
                            <option value={moment('05:00', 'HH:mm').format('HH:mm')}>05 AM</option>
                            <option value={moment('07:00', 'HH:mm').format('HH:mm')}>07 AM</option>
                            <option value={moment('09:00', 'HH:mm').format('HH:mm')}>09 AM</option>
                            <option value={moment('10:00', 'HH:mm').format('HH:mm')}>10 AM</option>
                            <option value={moment('12:00', 'HH:mm').format('HH:mm')}>12 NN</option>
                            <option value={moment('13:00', 'HH:mm').format('HH:mm')}>13 PM</option>
                    </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="gender">
                    <Form.Label className='mb-0'>Shift's End</Form.Label>
                    <Form.Control
                        as="select"
                        value={timeShiftOut}
                        // onClick={logTimeShift}
                        onChange={e => setTimeShiftOut(e.target.value)}
                        className='control cursor'>
                            <option>-- Choose --</option>
                            <option value={moment('14:00', 'HH:mm').format('HH:mm')}>2 PM</option>
                            <option value={moment('16:00', 'HH:mm').format('HH:mm')}>4 PM</option>
                            <option value={moment('18:00', 'HH:mm').format('HH:mm')}>6 PM</option>
                            <option value={moment('19:00', 'HH:mm').format('HH:mm')}>7 PM</option>
                            <option value={moment('21:00', 'HH:mm').format('HH:mm')}>9 PM</option>
                            <option value={moment('22:00', 'HH:mm').format('HH:mm')}>10 PM</option>
                    </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        <Button variant="dark" onClick={() => {
            const timeOutValue = moment(timeShiftOut, 'HH:mm').add(1, 'hours').format('HH:mm');
            updateRaffleTickets(timeOutValue);
        }}>
            Save Changes
        </Button>
        </Modal.Footer>
        </Modal>

    <Modal show={showModal1} onHide={closeModalforTicks} centered>
        <Modal.Header closeButton>
          <Modal.Title>CHECK TICKETS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            if the button is clickable you may claim your entry(ies) and if not ehh...... Lamona
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModalforTicks}>
            Close
          </Button>
          <Button onClick={openModal} className={`bg-dark ${isButtonClickable ? '' : 'disabled'}`} disabled={!isButtonClickable}>
            Check
          </Button>
        </Modal.Footer>
      </Modal>

  </div>
  )
}

export default Tables