import axios from "axios";

const API = "http://localhost:5000/api/complaints";

export const createComplaint = async (formData) => {
  const response = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllComplaints = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getComplaintAnalytics = async () => {
  const response = await axios.get(`${API}/analytics`);
  return response.data;
};

export const getComplaintById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

export const getMyComplaints = async (clerkId) => {
  const response = await axios.get(`${API}/user/${clerkId}`);
  return response.data;
};

export const deleteComplaint = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};

export const assignDepartment = async (id, department) => {
  const response = await axios.put(`${API}/${id}/department`, {
    department,
  });

  return response.data;
};

export const updateStatus = async (id, status) => {
  const response = await axios.put(`${API}/${id}/status`, {
    status,
  });

  return response.data;
};