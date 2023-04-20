import { apiAxios } from "boot/axios";

export function todoList() {
  return apiAxios.get("/todos");
}
export function sendStart() {
  return apiAxios.post("/form", {
    command: "START",
  });
}

export function sendStop() {
  return apiAxios.post("/form", {
    command: "STOP",
  });
}

export function sendReset() {
  return apiAxios.post("/form", {
    command: "RESET",
  });
}
export function todoItem(id) {
  return apiAxios.get(`/todos/${id}`);
}
