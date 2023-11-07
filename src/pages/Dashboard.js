import React, { useEffect, useState } from 'react'
import { Form, Table, Pagination, Container, Col } from 'react-bootstrap';
import moment from 'moment';

function Dashboard() {

    const [ data, setData ] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [ searchQuery, setSearchQuery] = useState('');
    const [ currentPage, setCurrentPage] = useState(1)
    

    useEffect(() => {
        fetch(`http://192.168.210.77:4000/journal/journal/${sessionStorage.getItem("number")}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.ticketsEarnedPerEntry)
            setData(data.ticketsEarnedPerEntry);
        })
    }, [])

    const handleChange = (event) => {
        const newPerPage = parseInt(event.target.value);
        setItemsPerPage(newPerPage);
      };

    const filteredData = data.filter((user) =>
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };



  return (
    <div className='Table-Cont'>
    <div>
       <div className='text-white mb-3'>
       </div>
        <h6 className='text-white'>PEM (PRODUCTIVITY, EFFICIENCY, MOTIVATION)</h6>
        <Table striped bordered hover variant="dark" className="custom-table rounded">
        <thead className='text-center'>
            <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Check-In</th>
            {/* <th className='d-flex justify-content-center'>Ticket Entries  
                    <div className='d-flex align-items-center justify-content-center'>
                        <i 
                            onClick={() => handleSort('raffleTickets')}
                            className='d-flex ps-3 cursor'><FaSortAmountDown/>
                        </i>
                        <i 
                            onClick={() => handleSort('raffleTickets')}
                            className='d-flex ps-3 cursor'><FaSortAmountDown/>
                        </i>
                    </div>
            </th> */}
            {/* <th onClick={() => handleSort('raffleTickets')}>Tickets</th> */}
            <th>Check-Out</th>
            <th>RaffleTickets</th>
            </tr>
        </thead>
        <tbody className='text-center'>
            {itemsToDisplay.map((item, index) => (
            <tr key={index}>
                <td>{moment(item.date).format("L")}</td>
                <td>{item.firstName}</td>
                <td>{item.mobileNo}</td>
                <td>{item.loginTime}</td>
                <td>{item.logoutTime}</td>
                <td>{item.raffleTickets}</td>
            </tr>
            ))}
        </tbody>
        </Table>
        <div>
        <div className='d-flex'>
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
            <Form.Group>
                <Form.Select
                onChange={handleChange}
                value={itemsPerPage}
                className='cursor'
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>

                </Form.Select>
            </Form.Group>
        </div>
        </div>
    </div>
</div>
  )
}

export default Dashboard