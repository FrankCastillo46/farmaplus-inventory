import api from './api';

export const getAllProducts = () => api.get('/productos');
export const getProductById = id => api.get(`/productos/${id}`);
export const createProduct = data => api.post('/productos', data);
export const updateProduct = (id, data) => api.put(`/productos/${id}`, data);
export const deleteProduct = id => api.delete(`/productos/${id}`);
