import { defineStore } from "pinia";

export const useWebSocketStore = defineStore("websocket", {
  state: () => ({
    ws: null,
    lastValues: null,
    wsStatus: WebSocket.CLOSED,
  }),
  getters: {
    isOpen() {
      return this.ws && this.ws.readyState === WebSocket.OPEN;
    },
    statusText() {
      switch (this.wsStatus) {
        case WebSocket.OPEN:
          return "Подключено";
        case WebSocket.CLOSING:
          return "Отключение";
        case WebSocket.CONNECTING:
          return "Подключение";
      }
      return "Отключено";
    },
    statusColor() {
      switch (this.wsStatus) {
        case WebSocket.OPEN:
          return "positive";
        case WebSocket.CLOSING:
          return "warning";
        case WebSocket.CONNECTING:
          return "info";
      }
      return "negative";
    },
    mainValues() {
      return [
        { name: "Курс", value: this.lastValues?.course, unit: "degrees" },
        { name: "Глубина", value: this.lastValues?.depth, unit: "meters" },
        { name: "Марш", value: this.lastValues?.march, unit: "knots" },
        { name: "Лаг", value: this.lastValues?.lag, unit: "seconds" },
        {
          name: "Дифферент",
          value: this.lastValues?.differential,
          unit: "meters",
        },
        { name: "Крен", value: this.lastValues?.roll, unit: "degrees" },
      ];
    },
    secondValues() {
      return [
        { name: "Dropper", value: this.lastValues?.dropper },
        { name: "Lifter", value: this.lastValues?.lifter },
      ];
    },
    thirdValues() {
      return [
        { name: "Global mission", value: this.lastValues?.global_mission },
        { name: "Local mission", value: this.lastValues?.local_mission },
        { name: "Transition", value: this.lastValues?.transtion },
      ];
    },
    lastValuesString() {
      return {
        ...this.mainValues,
        ...this.secondValues,
        ...this.thirdValues,
      };
    },
  },
  actions: {
    updateValues(event) {
      this.updateStatus();
      this.lastValues = JSON.parse(event.data);
    },
    opCloseWs(event) {
      this.updateStatus();
      setTimeout(() => {
        this.openWs();
      }, 3000);
    },
    openWs() {
      this.updateStatus();
      this.ws = new WebSocket("ws://localhost:9000/ws");
      this.ws.onopen = this.updateStatus;
      this.ws.onclose = this.opCloseWs;
      this.updateStatus();

      this.ws.onmessage = this.updateValues;
    },
    closeWs() {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
    },
    updateStatus() {
      this.wsStatus = this.ws?.readyState ?? WebSocket.CLOSED;
    },
    sendWs(action) {
      this.updateStatus();
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ action }));
        return;
      }
      console.log("send fail");
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
