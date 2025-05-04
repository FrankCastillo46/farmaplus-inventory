import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { getAllProducts } from "../services/product.service";
import { getAllSales } from "../services/sale.service";
import { getLowStockAlerts } from "../services/alert.service";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [byProduct, setByProduct] = useState([]);
  const [byDay, setByDay] = useState([]);
  const [productsOnAlert, setProductsOnAlert] = useState(0);

  useEffect(() => {

    fetchLowStock();
    fetchData();
  }, []);

  const fetchLowStock = async () => {
    try {
      const alertRes = await getLowStockAlerts();
      setProductsOnAlert(alertRes.data.length);
    } catch (err) {
      console.error("Error al cargar los datos del dashboard", err);
    }
  };

  const fetchData = async () => {
    const [pRes, sRes] = await Promise.all([getAllProducts(), getAllSales()]);
    setProducts(pRes.data);
    setSales(sRes.data);
    aggregateByProduct(sRes.data, pRes.data);
    aggregateByDay(sRes.data);
  };

  const aggregateByProduct = (salesData, productsData) => {
    const map = {};
    salesData.forEach((v) => {
      map[v.producto_id] = (map[v.producto_id] || 0) + v.cantidad;
    });
    const arr = Object.entries(map).map(([id, qty]) => {
      const prod = productsData.find((p) => p.id === +id);
      return { nrCh: prod?.nombre || `#${id}`, sold: qty };
    });
    // ordenar descendente y quedarnos con top 5
    arr.sort((a, b) => b.sold - a.sold);
    setByProduct(arr.slice(0, 5));
  };

  const aggregateByDay = (salesData) => {
    const map = {};
    salesData.forEach((v) => {
      const day = new Date(v.fecha).toLocaleDateString();
      map[day] = (map[day] || 0) + v.total;
    });
    const arr = Object.entries(map).map(([day, total]) => ({ day, total }));
    // ordenar cronológicamente
    arr.sort((a, b) => new Date(a.day) - new Date(b.day));
    setByDay(arr);
  };

  return (
    <Container className="mt-4">
      <h1>Dashboard</h1>
      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Top 5 Productos más Vendidos</Card.Title>
              <BarChart width={350} height={250} data={byProduct}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sold" name="Unidades vendidas" />
              </BarChart>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ventas por Día</Card.Title>
              <LineChart width={350} height={250} data={byDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total S/." />
              </LineChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
      <Col md={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Productos en Alerta</Card.Title>
              <h3>{productsOnAlert} productos</h3>
              <Card.Text>Stock por debajo del umbral configurado.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
