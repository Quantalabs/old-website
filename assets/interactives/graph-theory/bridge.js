function nodePos (node) {
  const positions = {
    "1": {
      x: 0,
      y: -50,
    },
    "0": {
      x: -50,
      y: 0,
    },
    "2": {
      x: 0,
      y: 50,
    },
    "3": {
      x: 50,
      y: 0,
    }
  }

  return positions[node.id()]
}

var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  elements: {
    nodes: [
      {
        data: { id: "1" },
      },
      {
        data: { id: "0" },
      },
      {
        data: { id: "2" },
      },
      {
        data: { id: "3" },
      },
    ],
    edges: [
      {
        data: { id: "01", source: "0", target: "1" },
      },
      {
        data: { id: "02", source: "0", target: "2" },
      },
      {
        data: { id: "01-2", source: "0", target: "1" },
      },
      {
        data: { id: "02-2", source: "0", target: "2" },
      },
      {
        data: { id: "03", source: "0", target: "3" },
      },
      {
        data: { id: "32", source: "3", target: "2" },
      },
      {
        data: { id: "31", source: "3", target: "1" },
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
    name: "preset",
    positions: nodePos,
  },
});
