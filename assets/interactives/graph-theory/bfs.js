  var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  elements: [
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
      data: { id: "01", source: "0", target: "1" },
    },
    {
      data: { id: "02", source: "0", target: "2" },
    },
    {
      data: { id: "13", source: "1", target: "3" },
    },
    {
      data: { id: "24", source: "2", target: "4" },
    },
    {
      data: { id: "25", source: "2", target: "5" },
    },
  ],

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
      }
    }
  ],

  layout: {
    name: "dagre",
  },
});

// Highlight nodes in order of BFS traversal
cy.edges().animate(
  {
    style: { color: "red" },
  },
  {
    duration: 1000,
  }
);
