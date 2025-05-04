import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createProduct, updateProduct } from "../services/product.service";
import { toast } from 'react-toastify';

export default function ProductForm({ show, onHide, product, onSaved }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    umbral_alerta: "5",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion || "",
        precio: product.precio,
        stock: product.stock,
        umbral_alerta: product.umbral_alerta ?? "5",
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        umbral_alerta: "5",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, formData);
        toast.info('Producto actualizado correctamente');
      } else {
        await createProduct(formData);
        toast.success('Producto creado exitosamente');
      }
      onSaved();
      onHide();
    } catch (err) {
      toast.error('Ocurrió un error al guardar el producto');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Editar Producto" : "Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Umbral de alerta</Form.Label>
            <Form.Control
              type="number"
              name="umbral_alerta"
              value={formData.umbral_alerta}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              Si stock ≤ este valor, el producto aparecerá en alertas.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {product ? "Guardar cambios" : "Crear"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
