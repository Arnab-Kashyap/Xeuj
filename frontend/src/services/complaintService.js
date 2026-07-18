import axios from "axios";

const API = "http://localhost:5000/api/complaints";

export const createComplaint = async (complaintData) => {
  const response = await axios.post(API, complaintData);
  return response.data;
};

export const getAllComplaints = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getComplaintById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};