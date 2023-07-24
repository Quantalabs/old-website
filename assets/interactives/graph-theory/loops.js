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
    ],
    edges: [
      {
        data: { id: "01", source: "0", target: "1" },
      },
      {
        data: { id: "00", source: "0", target: "0" },
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
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
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
    name: "grid",
    rows: 2,
  },
});

var cy2 = cytoscape({
  container: document.getElementById("cy2"), // container to render in

  elements: {
    nodes: [
      {
        data: { id: "0" },
      },
      {
        data: { id: "1" },
      },
    ],
    edges: [
      {
        data: { id: "01", source: "0", target: "1" },
      },
      {
        data: { id: "00", source: "0", target: "0" },
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
    name: "grid",
    rows: 2,
  },
});
