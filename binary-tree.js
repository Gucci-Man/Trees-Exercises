/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0; // Empty tree has depth 0
    }

    const dfs = (node, depth) => {
      if (!node.left && !node.right) {
        return depth; // Reached a leaf node
      }

      let leftDepth = 0;
      let rightDepth = 0;

      if (node.left) {
        leftDepth = dfs(node.left, depth + 1);
      }

      if (node.right) {
        rightDepth = dfs(node.right, depth + 1);
      }

      return Math.min(leftDepth, rightDepth);
    };

    return dfs(this.root, 1); // Start the depth calculation from the root
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0; // Empty tree has depth 0
    }

    const dfs = (node, depth) => {
      if (!node.left && !node.right) {
        return depth; // Reached a leaf node
      }

      let leftDepth = 0;
      let rightDepth = 0;

      if (node.left) {
        leftDepth = dfs(node.left, depth + 1);
      }

      if (node.right) {
        rightDepth = dfs(node.right, depth + 1);
      }

      return Math.max(leftDepth, rightDepth);
    };

    return dfs(this.root, 1); // Start the depth calculation from the root
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) {
      return 0; // Empty tree has sum 0
    }

    let maxPathSum = Number.MIN_SAFE_INTEGER;

    const dfs = (node) => {
      if (!node) {
        return 0; // Null node has sum 0
      }

      // Calculate the sum for the left and right subtrees
      const leftSum = Math.max(0, dfs(node.left));
      const rightSum = Math.max(0, dfs(node.right));

      // Update the maximum path sum considering the current node
      maxPathSum = Math.max(maxPathSum, leftSum + rightSum + node.val);

      // Return the maximum sum achievable from the current subtree
      return Math.max(leftSum, rightSum) + node.val;
    };

    dfs(this.root); // Start the depth-first search from the root

    return maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) {
      return null; // Empty tree, no value exists
    }

    let result = null;

    const inorderTraversal = (node) => {
      if (node) {
        inorderTraversal(node.left);

        if (node.val > lowerBound && (result === null || node.val < result)) {
          result = node.val;
        }

        inorderTraversal(node.right);
      }
    };

    inorderTraversal(this.root); // Start the in-order traversal from the root

    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) {
      return false; // Empty tree, no nodes to compare
    }

    const queue = [];
    let foundNode1 = false;
    let foundNode2 = false;

    queue.push({ node: this.root, parent: null, level: 0 });

    while (queue.length > 0) {
      const current = queue.shift();

      if (current.node === node1) {
        foundNode1 = { parent: current.parent, level: current.level };
      }

      if (current.node === node2) {
        foundNode2 = { parent: current.parent, level: current.level };
      }

      if (foundNode1 && foundNode2) {
        // Both nodes are found, check if they are cousins
        return foundNode1.level === foundNode2.level && foundNode1.parent !== foundNode2.parent;
      }

      if (current.node.left) {
        queue.push({ node: current.node.left, parent: current.node, level: current.level + 1 });
      }

      if (current.node.right) {
        queue.push({ node: current.node.right, parent: current.node, level: current.level + 1 });
      }
    }

    // If either node is not found, they are not cousins
    return false;
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
