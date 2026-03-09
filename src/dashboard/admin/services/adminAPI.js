import axios from "axios";

const API = "http://localhost:3000/api/admin";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getDashboardStats = () =>
  axios.get(`${API}/stats`, getHeaders());

export const getUsers = () =>
  axios.get(`${API}/users`, getHeaders());

export const deleteUser = (id) =>
  axios.delete(`${API}/users/${id}`, getHeaders());

export const getRiders = () =>
  axios.get(`${API}/riders`, getHeaders());

export const approveRider = (id) =>
  axios.patch(`${API}/approve-rider/${id}`, {}, getHeaders());

export const rejectRider = (id) =>
  axios.patch(`${API}/reject-rider/${id}`, {}, getHeaders());

export const getOrders = () =>
  axios.get(`${API}/orders`, getHeaders());