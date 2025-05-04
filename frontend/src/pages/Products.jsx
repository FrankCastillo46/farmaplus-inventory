import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { getAllProducts, deleteProduct } from "../services/product.service";
import ProductForm from "../components/ProductForm";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        fetchProducts();
        toast.success("El producto ha sido eliminado.");
      } catch (err) {
        console.error(err);
        toast.error("Ocurrió un error al eliminar el producto.");
      }
    }
  };

  const handleNew = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  return (
    <Container className="mt-4">
      <h1>Productos</h1>
      <Button className="mb-3" onClick={handleNew}>
        Nuevo Producto
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para crear/editar producto */}
      <ProductForm
        show={showForm}
        onHide={() => setShowForm(false)}
        product={editProduct}
        onSaved={fetchProducts}
      />
    </Container>
  );
}
