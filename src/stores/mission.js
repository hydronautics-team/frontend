import { defineStore } from "pinia";

export const useMissionStore = defineStore("mission", {
  state: () => ({
    elements: [
      // Nodes
      // An input node, specified by using `type: 'input'`
      { id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },

      // Default nodes, you can omit `type: 'default'`
      { id: "2", label: "Node 2", position: { x: 100, y: 100 } },
      { id: "3", label: "Node 3", position: { x: 400, y: 100 } },
      { id: "122", label: "Node 33", position: { x: 600, y: 100 } },

      // An output node, specified by using `type: 'output'`
      {
        id: "4",
        type: "output",
        label: "Node 4",
        position: { x: 400, y: 200 },
      },

      // Edges
      // Most basic edge, only consists of an id, source-id and target-id
      { id: "e1-3", source: "1", target: "3" },

      // An animated edge
      { id: "e1-2", source: "1", target: "2", animated: true },
    ],
  }),
  getters: {},
  actions: {},
});
