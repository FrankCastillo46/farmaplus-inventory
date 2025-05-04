import api from './api';

export const getAllSales = () => api.get('/ventas');
export const createSale  = data => api.post('/ventas', data);
