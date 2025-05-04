import { useState, useContext } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre_usuario: '',
    password: ''
  });

  // Si ya está autenticado, redirigir
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };
  console.log(formData);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData); /// error
      const { token, role, username } = res.data;
      login({ token, role, username });
      toast.success('¡Bienvenido, ' + username + '!');
      // Redirigir según rol
      if (role === 'admin') navigate('/productos');
      else navigate('/ventas');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Error de conexión');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
