import api from "../configs/API";

const addCategory = (data) => api.post("/category", data);
const getCategory = () => api.get("/category");

const deleteCategory = (id) => api.delete(`/category/${id}`);

export { addCategory, getCategory, deleteCategory };
