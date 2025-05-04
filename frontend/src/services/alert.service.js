import api from './api';
export const getLowStockAlerts = () => api.get('/alertas');