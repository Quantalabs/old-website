var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  elements: {
    nodes: [
      {
        data: { id: "0" },
      },
      {
        data: { id: "1" },
      },
      {
        data: { id: "2" },
      },
      {
        data: { id: "3" },
      },
      {
        data: { id: "4" },
      },
      {
        data: { id: "5" },
      },
      {
        data: { id: "6" },
      },
    ],
    edges: [
      {
        data: { id: "01", source: "0", target: "1" },
      },
      {
        data: { id: "12", source: "1", target: "2" },
      },
      {
        data: { id: "23", source: "2", target: "3" },
      },
      {
        data: { id: "14", source: "1", target: "4" },
      },
      {
        data: { id: "45", source: "4", target: "5" },
      },
      {
        data: { id: "35", source: "3", target: "5" },
      },
      {
        data: { id: "56", source: "5", target: "6" },
      },
    ],
  },

  style: [
    {
      selector: "node",
      style: {
        "background-color": "#FF5277",
        label: "data(id)",
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "curve-style": "bezier",
      },
    },

    {
      selector: "label",
      style: {
        "text-valign": "center",
        "text-halign": "center",
      },
    },
  ],
  layout: {
    name: "circle",
  },
});
