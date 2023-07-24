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

// Highlight the DFS path, pausing 1000 ms after each step
let path = [0, 1, 2, 3, 5, 6, 4];
let highlighted = [];

let highlight = () => {
  if (highlighted.length === 7) {
    highlighted = [];
    path = [0, 1, 2, 3, 5, 6, 4];

    for (let i = 0; i < path.length; i++) {
      cy.$("#" + path[i]).css("background-color", "#FF5277");
    }
  }

  highlighted.push(path.shift());

  // Style all nodes in highlighted to have bg of red
  for (let i = 0; i < highlighted.length; i++) {
    cy.$("#" + highlighted[i]).css("background-color", "green");
  }
};

let highlightInterval = setInterval(highlight, 1000);
