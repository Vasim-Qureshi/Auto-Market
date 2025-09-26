// import axios from "axios";
// import api from "../api";

const URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

export default URL;

// // Booking APIs
// export const createBooking = async (bookingData) => {
//   return await axios.post(`${API_BASE_URL}/bookings/create`, bookingData);
// };

// export const getBookings = async () => {
//   return await api.get(`${API_BASE_URL}/bookings`,{ withCredentials: true });
// };

// export const updateBookingStatus = async (id, status) => {
//   return await axios.put(`${API_BASE_URL}/bookings/${id}/status`, { status });
// };

// export const deleteBooking = async (id) => {
//   return await axios.delete(`${API_BASE_URL}/bookings/${id}`);
// };

// // Inventory APIs
// export const addInventoryItem = async (itemData) => {
//   return await axios.post(`${API_BASE_URL}/inventory/add`, itemData);
// };

// export const getInventory = async () => {
//   return await axios.get(`${API_BASE_URL}/inventory`);
// };

// export const updateInventory = async (id, quantity) => {
//   return await axios.put(`${API_BASE_URL}/inventory/${id}/update`, { quantity });
// };

// export const deleteInventory = async (id) => {
//   return await axios.delete(`${API_BASE_URL}/inventory/${id}`);
// };
