import { defineStore } from "pinia";

export const useWebSocketStore = defineStore("websocket", {
  state: () => ({
    ws: null,
    lastValues: null,
  }),
  getters: {
    isOpen() {
      return this.ws.readyState === WebSocket.OPEN
    },
    lastValuesString() {
      return {
        "Курс": this.lastValues?.course,
        "Глубина": this.lastValues?.depth,
        "Марш": this.lastValues?.march,
        "Лаг": this.lastValues?.lag,
        "Дифферент": this.lastValues?.differential,
        "Крен": this.lastValues?.roll,
        "Dropper": this.lastValues?.dropper,
        "Lifter": this.lastValues?.lifter,
        "Global mission": this.lastValues?.global_mission,
        "Local mission": this.lastValues?.local_mission,
        "Transition": this.lastValues?.transtion,
      }
    },
  },
  actions: {
    updateValues(event) {
      this.lastValues = JSON.parse(event.data);
      console.log(this);
      console.log(this.lastValues);
    },
    openWs() {
      this.ws = new WebSocket("ws://localhost:8000/ws/");
      this.ws.onopen = (event) => {
        console.log("Подключился");
      };
      this.ws.onclose = (event) => {
        console.log("Отключился");
        setTimeout(() => {
          this.openWs();
        }, 3000);
      };

      this.ws.onmessage = this.updateValues;
    },
    closeWs() {
      this.isOpen ? this.ws?.close() : null;
    },
    sendWs(action) {
      this.isOpen ? this.ws?.send(JSON.stringify({ action })) : console.log("send fail");
    },
    sendJson() {
      // console.log("try to send JSON");
      this.sendWs("JSON");
    },
    sendStart() {
      this.sendWs("START");
    },
    sendStop() {
      this.sendWs("STOP");
    },
    sendReset() {
      this.sendWs("RESET");
    },
  },
});
