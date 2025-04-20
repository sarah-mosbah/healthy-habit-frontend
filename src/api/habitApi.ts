import axios from 'axios';
import { HabitRequest } from '../models/HabitRequest.interface';
import { UserQuery } from '../models/UserQuery.interface';

const API = import.meta.env.VITE_API_URL

export const generatePlan = (data: HabitRequest) => axios.post(`${API}/generate-plan`, data);

export const getDailyMessage = (data: UserQuery) => axios.post(`${API}/daily-message`, data);