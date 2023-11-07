import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Error() {

    const navigate=useNavigate()

    const LoginKaMuna = () => {
        navigate("/signOut")
    }

  return (
    <Row>
        <Col className="p-5 text-center">
            <h1>EHHHHHHH???????</h1>
            <p>Balik Ka Don Sa LogIn</p>
            <Button onClick={LoginKaMuna} className="btn-primary">BACK TO LOGIN</Button>
        </Col>
    </Row>
  )
}

export default Error