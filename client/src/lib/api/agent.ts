import axios from "axios"; 
import { store } from "../stores/store";
import type { ActivityDto } from "../../features/table/types";

export interface PaginatedResponse<T> {
    items: T[];
    nextCursor: string | null;
    totalCount: number; 
}

const agent = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: true 
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(res => {
    store.uiStore.isIdle();
    return res;
}, error => {
    store.uiStore.isIdle();
    return Promise.reject(error);
});

const Activities = {
    list: (params: any) => 
        agent.get<PaginatedResponse<ActivityDto>>('/activities/items', { params })
            .then(res => res.data)
};

export default { ...agent, Activities };
