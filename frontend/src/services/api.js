import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/notes'; // Change if your backend is hosted elsewhere
const token = localStorage.getItem('token'); // Optional: if using token auth

const headers = {
  headers: {
    Authorization: `Bearer ${token}`, // remove if you disabled auth
  },
};

export const fetchNotes = () =>
  axios.get(API_BASE, headers).then((res) => res.data);

export const createNote = (title, content) =>
  axios.post(API_BASE, { title, content }, headers).then((res) => res.data);

export const addNoteVersion = (id, content) =>
  axios.put(`${API_BASE}/${id}`, { content }, headers).then((res) => res.data);
