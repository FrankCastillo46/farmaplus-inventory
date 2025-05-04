import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { getAllProducts } from "../services/product.service";
import { createSale } from "../services/sale.service";
import { toast } from "react-toastify";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    setFiltered(
      products.filter(
        (p) =>
          p.nombre.toLowerCase().includes(term) ||
          (p.descripcion || "").toLowerCase().includes(term)
      )
    );
  };

  const openModal = (product) => {
    setSelected(product);
    setCantidad(1);
    setShowModal(true);
  };

  const handleSale = async () => {
    try {
      // ← aquí, valida cantidad
      if (cantidad > selected.stock) {
        toast.error("La cantidad supera el stock disponible");
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar venta");
    }
    try {
      await createSale({
        producto_id: selected.id,
        cantidad,
        total: selected.precio * cantidad,
        fecha: new Date().toISOString().slice(0, 10),
      });
      toast.success("Venta registrada");
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar venta");
    }
  };

  return (
    <Container className="mt-4">
      <h1>Catálogo de Productos</h1>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre o descripción"
        value={search}
        onChange={handleSearch}
        className="mb-3"
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Umbral</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{Number(p.precio).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>{p.umbral_alerta}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={p.stock < 1}
                  onClick={() => openModal(p)}
                >
                  Vender
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected ? (
            <>
              <p>
                <strong>Producto:</strong> {selected.nombre}
              </p>
              <p>
                <strong>Descripción:</strong> {selected.descripcion}
              </p>
              <p>
                <strong>Precio Unitario:</strong> S/{" "}
                {Number(selected.precio).toFixed(2)}
              </p>
              <p>
                <strong>Stock Disponible:</strong> {selected.stock}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max={selected.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </Form.Group>
            </>
          ) : (
            <p>Selecciona un producto antes de continuar.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handleSale}
            disabled={
              !selected || // protege si no hay producto elegido
              cantidad < 1 ||
              (selected && cantidad > selected.stock)
            }
          >
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
