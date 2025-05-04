import { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getLowStockAlerts } from "../services/alert.service";
import { Bell } from "react-bootstrap-icons";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchAlerts = async () => {
      try {
        const res = await getLowStockAlerts();
        setAlerts(res.data);
      } catch (err) {
        console.error("Error al obtener alertas:", err);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Nova Salud
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/productos">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/ventas">
                  Ventas
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>

          {user && (
            <Nav>
              <NavDropdown
                title={
                  <span className="d-flex align-items-center text-dark">
                    <Bell size={20} />
                    {alerts.length > 0 && (
                      <Badge bg="danger" pill className="ms-1">
                        {alerts.length}
                      </Badge>
                    )}
                  </span>
                }
                id="alerts-dropdown"
                align="end"
              >
                {alerts.length > 0 ? (
                  alerts.map((item) => (
                    <NavDropdown.Item
                      key={item.id}
                      className="d-flex justify-content-between"
                    >
                      <span>{item.nombre}&nbsp;</span>
                      <Badge bg="warning" pill>
                        {item.stock}
                      </Badge>
                    </NavDropdown.Item>
                  ))
                ) : (
                  <NavDropdown.Item disabled>No hay alertas</NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          )}

          {user && (
            <Nav>
              <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
