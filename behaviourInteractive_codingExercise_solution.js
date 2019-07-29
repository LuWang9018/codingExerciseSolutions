//Since the question says "It is impossible for Bender to
//go through the same room twice."
// ==> The room map is a DAG
//So this question is to find the most cost path in a DAG

class DAG {
  constructor() {
    this.nodeList = {};
    this.stack = [];
  }

  addNode(nodeName) {
    if (this.nodeList[nodeName]) {
      return this.nodeList[nodeName];
    }
    let newNode = {
      pathTo: {},
      //add default value to 0 since E does not have money
      money: 0,
      //for topologicalSort sort
      visited: false,
    };
    this.nodeList[nodeName] = newNode;
    return newNode;
  }

  addPath(nodeFrom, moneyAmount, nodeTo) {
    let From = this.addNode(nodeFrom);
    let To = this.addNode(nodeTo);
    From.money = moneyAmount;

    if (!From.pathTo[nodeTo]) {
      //add the destination node reference to the pathlist
      From.pathTo[nodeTo] = To;
    }
  }

  //time complexity: O(N + E)
  //N is number of numberOfNode
  //E is number of Edges

  //since E= N -1
  //time complexity is O(N) in this question
  topologicalSort(nodeList) {
    for (let nodeName in nodeList) {
      //console.log('nodeName:', nodeName);
      if (!nodeList[nodeName].visited) {
        nodeList[nodeName].visited = true;
        this.topologicalSort(nodeList[nodeName].pathTo);
        this.stack.push(nodeName);
      }
    }
  }

  //time complexity: O(N*E)
  //N is number of numberOfNode
  //E is the maximum number of Edges that a node connected

  //In this question
  //time complexity is O(N) since each the question
  //saids "Each room has exactly two doors which you
  //can use to get out."
  mostCostPath(nodeFrom, noodTo) {
    let costsToEveryNode = {};
    const nodeList = this.nodeList;
    for (let nodeName in nodeList) {
      costsToEveryNode[nodeName] = Number.NEGATIVE_INFINITY;
    }
    costsToEveryNode[nodeFrom] = 0;

    while (this.stack.length) {
      // Get the next node from topological orde
      let nextNode = this.stack.pop();

      // Update money of all adjacent vertices
      if (costsToEveryNode[nextNode] != Number.NEGATIVE_INFINITY) {
        const adjacentNode = nodeList[nextNode].pathTo;
        for (let adjacentNodeName in adjacentNode) {
          if (
            costsToEveryNode[adjacentNodeName] <
            costsToEveryNode[nextNode] + nodeList[adjacentNodeName].money
          ) {
            costsToEveryNode[adjacentNodeName] =
              costsToEveryNode[nextNode] + nodeList[adjacentNodeName].money;
          }
        }
      }
    }

    console.log(nodeList[nodeFrom].money + costsToEveryNode[noodTo]);
  }
}

function main() {
  const N = parseInt(readline());

  const roomDAG = new DAG();
  for (let i = 0; i < N; i++) {
    const room = readline().split(' ');
    const roomFrom = room[0];
    const roomPrice = parseInt(room[1]);
    const roomTo1 = room[2];
    const roomTo2 = room[3];

    roomDAG.addPath(roomFrom, roomPrice, roomTo1);
    roomDAG.addPath(roomFrom, roomPrice, roomTo2);
  }

  roomDAG.topologicalSort(roomDAG.nodeList);
  roomDAG.mostCostPath('0', 'E');
}

main();
