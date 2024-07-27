const API_BASE_URL = "http://localhost:4000";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
};

export const signup = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(response);
};

export const getPets = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${API_BASE_URL}/pets`, {
    method: "GET",
    headers,
  });
  return handleResponse(response);
};

export const addPets = async (petData) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${API_BASE_URL}/pets`, {
    method: "POST",
    headers,
    body: JSON.stringify(petData),
  });
  return handleResponse(response);
};

export const updatePets = async (id, petData) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(petData),
  });
  return handleResponse(response);
};

export const deletePets = async (id) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
    method: "DELETE",
    headers,
  });
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
