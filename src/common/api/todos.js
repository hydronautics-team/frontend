import {apiAxios} from "boot/axios";

export function todoList() {
    return apiAxios.get('/todos')
}

export function todoItem(id) {
    return apiAxios.get(`/todos/${id}`)
}