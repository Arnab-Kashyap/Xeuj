import API_URL from "./api";

export async function createComplaint(data) {
  console.log("Create Complaint:", API_URL, data);
}

export async function getComplaints() {
  console.log("Fetch Complaints:", API_URL);
}