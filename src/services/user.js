import { getCookie } from "../utils/cookies";
import api from "../configs/API";

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = () => api.get("");

export { getProfile, getPosts, getAllPosts };
