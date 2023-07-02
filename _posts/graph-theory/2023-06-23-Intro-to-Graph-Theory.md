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

This problem, known as the Seven Bridges of Königsberg, was eventually solved in 1736 by Leonhard Euler[^1]. But with Euler's solution came an entirely new field of mathematics, what Euler called "the position of geometry," now known as graph theory[^2]. We will get back to the seven bridges problem in a bit, but to go over Euler's solution, we need to familiarize ourselves with the fundamentals of graph theory.

# Part 1: Graphs
A graph $$G = (V, E)$$, where $$V$$ is a set of nodes/vertices and $$E$$ is a set of edges such that $$E\subseteq\{(x,y) \ |\ x,y \in V \ \land \ x \neq y\}$$. We call a point on the graph a node, and a line connecting two nodes an edge.[^3]

<!-- Insert Interactive -->

$$x$$ and $$y$$ are endpoints of the edge $$(x,y)$$. Not every node on the graph is an endpoint. There may be graphs where it is impossible to draw a path from one edge through every other edge (we'll go over some algorithms to do this soon). Additionally, we can call the edge $$(x,y)$$ an incident on x and y.

There also exist directed graphs, which contain only directed edges. Directed edges are edges that aren't unordered pairs. The edge $$(x,y)$$ is not the same as $$(y,x)$$ in a diredted graph. In directed graphs, $$G=(V,E)$$ where $$V$$ is a set of vertices (and $$V^2$$ is a set of ordered sequences of 2 elements in $$V$$ that aren't necessarily distinct), and $$E\subseteq\{(x,y) \ | \
(x,y) \in V^2 \land x \neq y\}$$. In a directed edge $$(x,y)$$, going from x to y, x is called the tail and y is called the head.[^4]

<!-- Insert Interactive -->

In both forms of simple graphs, loops are not allowed, so an edge can't connect a node to itself. Adding loops to our equation is quite simple. We change $$E\subseteq\{(x,y) \ | \ 
x,y \in V \ \land \ x \neq y\}$$ to:

$$\begin{equation}E\subseteq\{(x,y) \ | \ x,y \in V\}\end{equation}$$

This is called a undirected simple graph permitting loops, or if we removed the $$x \neq y$$ in directed graphs, a simple directed graph permitting loops. 

There are many other [types of graphs](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)#Types_of_graphs), such as mixed graphs (which permit both directed and undirected edges), multigraphs (two or more edges having the same endpoint), and different [named graphs](https://en.wikipedia.org/wiki/List_of_graphs), like a butterfly graph or Peterson graph. I encourage you to learn more about these graphs, however, we will not go over these graphs in this post&#151;we have a lot of other things to get to (maybe in a future post!).

# Definitions and Terminology

There are other definitions and terms that are unrelated to the type of graph. These include:

  * Neighbors - Neighbors of a node are all the nodes connected to that node via an edge
  * Degree - The degree of a given node is the number of edges that are connected to that node. Note that this is not the number of neighbors the node has, as loops contribute to this value (loops actually add 2 to a degree, since the 2 ends of the edge both connect to the node).
    * The maximum degree of a graph is denoted with $$\Delta(G)$$ and minimum with $$\delta(G)$$.
    * $$deg(v)$$ denotes the degree of a node $$v$$
  * Path - A path is a sequence of edges (infinite or finite) joining a sequence of nodes.
    * A cycle is a path that starts and ends at the same node.
  *  Connectivity - Nodes are connected when a path exists between them.
      * A graph is connected if a path exists that goes through all the nodes of the graph.
      * A connected component is a set of nodes in graph $$G=(V,E)$$, where $$V_i\subseteq V$$ such that a path exists between all nodes in $$V_1$$.

There are, of course, [more terms and definitions](https://en.wikipedia.org/wiki/Glossary_of_graph_theory), but for the purposes of the article, we won't need them.

# Graph Traversal Algorithms

Now that the fundamentals are down, the fun begins. This section will go over graph traversal algorithms that can help us in many ways, from 

# Notes, References, and Comments 

[^1]: For those interested, [here](https://archive.org/details/commentariiacade08impe/page/128/mode/2up) is Euler's original text
[^2]: Euler's paper, entitled "Solutio problematis ad geometriam situs pertinentis" (see [^1]), is also considered one of the earliest papers in topology, not just graph theory. 
[^3]: This specific type of graph may also be known as an undirected simple graph.
[^4]: Similar to undirected graphs, this graph may also be known as a directed simple graph.