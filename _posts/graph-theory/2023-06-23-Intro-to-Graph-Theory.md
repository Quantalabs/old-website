---
layout: post
title: An Introduction to Graph Theory
date: 2023-06-23 01:00 -0700
modified: 2023-06-23 01:00 -0700
description: An introduction to the fundamentals of graph theory.
tag:
  - graph-theory
  - math
  - cs
  - algorithms
image: ./repo.png
---

> Imagine yourself within the picturesque setting of Königsberg, a city adorned with a network of bridges and islands. During the 18th century, this Prussian city, now known as Kaliningrad, faced a conundrum that perplexed its inhabitants and ignited the curiosity of mathematicians for generations to come. The challenge was deceptively simple yet tantalizingly complex: could a path be devised to traverse all seven bridges exactly once and return to the starting point?

<p align='center'>
<img alt='The seven bridges from the problem' src='https://upload.wikimedia.org/wikipedia/commons/5/5d/Konigsberg_bridges.png'><br> 
<sub>The seven bridges of Königsberg</sub>
</p>

This problem, known as the Seven Bridges of Königsberg, was eventually solved in 1736 by Leonhard Euler.[^1] But with Euler's solution came an entirely new field of mathematics, what Euler called "the position of geometry," now known as graph theory.[^2] We will get back to the seven bridges problem in a bit, but to go over Euler's solution, we need to familiarize ourselves with the fundamentals of graph theory.

# Part 1: Graphs

Graphs are made up of two main elements: nodes and edges. A node is a point on a graph, and an edge is a line that connects them.

A graph can be defined as $$G = (V, E)$$, where $$V$$ is a set of nodes/vertices and $$E$$ is a set of edges such that
$$E\subseteq\{(x,y) \ |\ x,y \in V \ \land \ x \neq y\}$$.[^3] If you want that in english, a graph is made up of vertices and edges, where the edges can be written as $$(x,y)$$ (where x and y are both vertices) as long as x isn't equal to y.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/basicgraph.html" style="border: none; width: 100%; height: 500px;"></iframe>
  <p align='center'><sub>An undirected simple graph</sub></p>
</div>

$$x$$ and $$y$$ are endpoints of the edge $$(x,y)$$. Not every node on the graph is an endpoint. There may be graphs where it is impossible to draw a path from one edge through every other edge (we'll go over some algorithms to figure out if this is possible for a given graph in a bit). Additionally, we can call the edge $$(x,y)$$ an incident on x and y.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/endpoints.html" style="border: none; width: 100%; height: 500px;"></iframe>
  <p align='center'><sub>A simple graph where there are nodes which aren't endpoints (specifically, node 3)</sub></p>
</div>

There also exist directed graphs, which contain only directed edges. Directed edges are edges that aren't unordered pairs. The edge $$(x,y)$$ is not the same as $$(y,x)$$ in a directed graph. You could define it as $$G=(V,E)$$ where $$V$$ is a set of vertices (and $$V^2$$ is a set of ordered sequences of 2 elements in $$V$$ that aren't necessarily distinct), and $$E\subseteq\{(x,y) \ | \
(x,y) \in V^2 \land x \neq y\}$$. In a directed edge $$(x,y)$$, going from x to y, x is called the tail and y is called the head.[^4]

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/directedgraph.html" style="border: none; width: 100%; height: 500px;"></iframe>
  <p align='center'><sub>A directed simple graph</sub></p>
</div>

In both forms of simple graphs, loops are not allowed, so an edge can't connect a node to itself. Adding loops to our equation is quite simple. We change $$E\subseteq\{(x,y) \ | \ 
x,y \in V \ \land \ x \neq y\}$$ to:

$$\begin{equation}E\subseteq\{(x,y) \ | \ x,y \in V\}\end{equation}$$

This is called a undirected simple graph permitting loops, or if we removed the $$x \neq y$$ in directed graphs, a simple directed graph permitting loops.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/loops.html" style="border: none; width: 100%; height: 500px;"></iframe>
  <p align='center'><sub>A simple directed graph permitting loops and a simple undirected graph permitting loops</sub></p>
</div>

There are many other [types of graphs](<https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)#Types_of_graphs>), such as mixed graphs (which permit both directed and undirected edges), multigraphs (two or more edges having the same endpoint), and different [named graphs](https://en.wikipedia.org/wiki/List_of_graphs), like a butterfly graph or Peterson graph. I encourage you to learn more about these graphs, however, we will not go over these graphs in this post&#151;we have a lot of other things to get to (maybe in a future post!).

# Part 2: Other Definitions and Terminology

There are other definitions and terms that are unrelated to the type of graph. These include:

- Neighbors - Neighbors of a node are all the nodes connected to that node via an edge
- Degree - The degree of a given node is the number of edges that are connected to that node. Note that this is not the number of neighbors the node has, as loops contribute to this value (loops actually add 2 to a degree, since the 2 ends of the edge both connect to the node).
  - The maximum degree of a graph is denoted with $$\Delta(G)$$ and minimum with $$\delta(G)$$.
  - $$deg(v)$$ denotes the degree of a node $$v$$
- Path - A path is a sequence of edges (infinite or finite) joining a sequence of nodes.
  - A cycle is a path that starts and ends at the same node.
- Connectivity - Nodes are connected when a path exists between them.
  - A graph is connected if a path exists that goes through all the nodes of the graph.
  - A connected component is a set of nodes in graph $$G=(V,E)$$, where $$V_i\subseteq V$$ such that a path exists between all nodes in $$V_1$$.

There are, of course, [more terms and definitions](https://en.wikipedia.org/wiki/Glossary_of_graph_theory), but for the purposes of the article, we won't need them.

# Part 3: Graph Traversal

With the basics down, we can now go over graph traversal. As the name implies, graph traversal algorithms allow us to visit each node algorithmically.

## Depth First Search

Depth first search (DFS) is a fairly common traversal algorithm. Let's take a graph, like the one below, and see how we can traverse it.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/dfsinit.html" style="border: none; width: 100%; height: 500px;"></iframe>
</div>

Start with node 0, and from node 0, let's go to node 1, the only option. From here, there are 2 options. It's important to note that there are usually multiple valid DFS orders, so it does not matter which path we take here. Let's pick node 2, since it's the smaller value of the 2. Then we go to 3. From 3, we go to 5, and 5 to 6. Oh no! We've come to a dead end- and we haven't even reached all the nodes yet! Don't fret, we simply go back to 5, and from 5, we go to 4. All the nodes connected to 4 have been visited, so we keep going back in our chain: from 4 to 5 to 3 to 2 to 1 to 0. We've come back where we've started, and we've visited all the nodes!

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/dfsoutlined.html" style="border: none; width: 100%; height: 500px;"></iframe>
</div>

As you can see, DFS takes all the neighbors of its current node, and visits them one by one, performing DFS each time.

If we wanted to represent the DFS order we performed earlier, we'd have multiple options. A preorder would list them in the order they are visited, like $$[0,1,2,3,5,6,4]$$, while a postorder would list when they were last visted by the algorithm (the starting node will always end the postorder), and look something like $$[6,4,5,3,2,1,0]$$.

## Breadth First Search

Breadth-first search (BFS) is less adventurous than DFS, but it can work better when trying to find nodes that are closer to a starting node.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/bfs.html" style="border: none; width: 100%; height: 500px;"></iframe>
</div>

In the tree above, if we wanted to use BFS, we would start at the top. From node 0, we visit Node 1, go back to 0, and visit 2. From 2 it goes back to 0, then to 1 again, and then to 3, and then back to 1, then 0, then 2, then 4, then 2 again, then 5. Now that it's visited all the nodes, it goes back up the tree, ending at 0.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/bfsoutlined.html" style="border: none; width: 100%; height: 500px;"></iframe>
</div>

We can define BFS by using a queue of nodes to visit. Let's first add the starting node to the queue, visit it, and then add all its neighbors to the beginning of the queue. Then, we'll pop off the last node in the queue, and repeat the process. This ensures that we complete one level of the tree at a time.

BFS benefits from its repetitive process of constantly going all the way back up the tree because in situations where a tree could be of infinite length, BFS will always find the solution node. DFS on the other hand has a very small chance of finding it, and most likely will end up going down the tree for infinity, never reaching a solution.

We can represent a BFS order by listing the nodes in the order we visit them. For the traversal we did earlier, it would be $$[0,1,2,3,4,5]$$.

# Part 4: The Bridge Problem

Finally, the part you've been waiting for. First let's create a graph from the seven bridges, like below, where each mass of land is a node, and each edge is a bridge.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/bridge.html" style="border: none; width: 100%; height: 500px;"></iframe>
</div>

For an Eulerian path to exist, a path that uses each edge only once, is possible only if there are 2 or 0 nodes of odd degree. Why? Every time you enter a node via an edge, you leave via a different edge. Which means only the start and end nodes can have an odd degree, and if we end at the start node, then no nodes can have an odd degree. Knowing this, it means that an Eulerian path does not exist for the bridge problem. All of our nodes have odd degree. Node 0 has a degree of 5, and the rest have a degree of 3.
# Part 5: Applications

Although some might find it disappointing that there's no solution, the problem still gave us a new field of mathematics, and one that is applied in numerous areas.

A surprising application of DFS is maze generation, like below.[^5] We simply make a grid a graph, pick a point on the graph, and start running DFS from that point.

<div style="max-width: 100%;">
  <iframe src="/assets/interactives/graph-theory/maze.html" style="border: none; width: 100%; height: 500px;"></iframe>
</div>

Of course, if we can use DFS to generate mazes, we can use it to solve them too! DFS is a great tool to solve mazes, but it doesn't always find the shortest path. Other algorithms like flood fill or BFS might be better suited. The interactive above generates the maze with DFS and solves it with BFS.

# Notes, References, and Comments

[^1]: For those interested, [here](https://archive.org/details/commentariiacade08impe/page/128/mode/2up) is Euler's original text. For those not fluent in Latin, [here's a translated version](https://www.cantab.net/users/michael.behrend/repubs/maze_maths/pages/euler_en.html).
[^2]: Euler's paper, entitled "Solutio problematis ad geometriam situs pertinentis" (see [^1]), is also considered one of the earliest papers in topology, not just graph theory.
[^3]: This specific type of graph may also be known as an undirected simple graph.
[^4]: Similar to undirected graphs, this graph may also be known as a directed simple graph.
[^5]: The demo below isn't premade- it was generated with DFS when you opened the page. 
