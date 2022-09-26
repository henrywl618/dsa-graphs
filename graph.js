class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex))
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach(node => node.adjacent.delete(vertex));
    vertex.adjacent.clear();
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let seen = new Set();
    seen.add(start);
    let output = [];

    while(stack.length){
      const currentNode = stack.pop();
      output.push(currentNode.value);
      currentNode.adjacent.forEach(adjacent => {
        if(!seen.has(adjacent)){
          seen.add(adjacent);
          stack.push(adjacent);
        }
      })
    }
    console.log(output)
    return output;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set();
    let output = [];

    while(queue.length){
      const currentNode = queue.shift();
      if(!seen.has(currentNode)){
        seen.add(currentNode);
        output.push(currentNode.value)
        currentNode.adjacent.forEach(adjacent => queue.push(adjacent))
      }
    }
    return output;
  }
}

module.exports = {Graph, Node}