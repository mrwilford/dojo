//My shitty imprementation

/* AVL tree updated */
class BSTree {
    constructor() { 
        this.root = null;
    }
    inOrder(){
        if(this.root)
            return this.root.inOrder();
    }
    
    preOrder(){
        if(this.root)
            return this.root.preOrder();
    }

    postOrder(){
        if(this.root)
            return this.root.postOrder();
    }
    search(data){
        if(this.root)
            return this.root.search(data);
        return false;
    }

    add(data){
        if(this.root)
            this.root.add(data);
        else
            this.root = new Node(data);
    }

    delete(data){
        if(this.root)
            this.root = this.root.delete(data);
    }

    getHeight(node){
        if(node)
            return this.root.getHeight(node);
        return -1;
    }
    findMin() {
        if (this.root) {
            return this.root.findMin();
        }
    }
    findMax() {
        if (this.root) {
            return this.root.findMax();
        }
    }
    getBalance(node) {
        if (!node) return 0;
        return this.root.getBalance(node);
    }

}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = this;
        //finish me: since we’ll need it later, make sure every node has a ref to its parent
    }

    // add(value, node) {
    //     if (node == null) return new Node(value);
    //     if (value < node.value) node.left = this.add(value, node.left);
    //     else if (value > node.value) node.right = this.add(value, node.right);
    //     else{
    //         node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    //     if (this.getBalance(node) == 2 && this.getBalance(node.left) >= 0) 
    //         return this.rightRotate(node);
    //     else if (this.getBalance(node) == 2 && this.getBalance(node.left) < 0) {
    //         node.left = this.left.leftRotate();
    //         return this.left.rightRotate();
    //     } else if (this.getBalance(node) == -2 && this.getBalance(node.right) <= 0) 
    //         this.leftRotate(node);
    //     else if (this.getBalance(node) == -2 && this.getBalance(node.right) > 0) {
    //         node.right = this.rightRotate(node.right);
    //         return this.leftRotate(node);
    //     }
    //     return node; 
    //     }
    // }
 

    //  Trying to implement this without passing in the node as an argument, but I'm having trouble with it running an error
    // when trying to run something like this:  this.right.(function) but sometimes, this.right or this.left === null.

    //sooo I've been adding in conditionals to check it this.right or this.left has a value and only invoking the recursion call when it's not null.
    add(value) {
        console.log(this)
        if (!this) {
          return new Node(value);
        }
        console.log(value)
        if (value < this.value) {
            if (this.left) this.left = this.left.insertNode(value)
            else this.left = new Node(value);
        } else if (value > this.value) {
            if (this.right) this.right = this.right.insertNode(value);
            else this.right = new Node(value);
        } else {
          return this;
        }
        if (this.left && this.right) {
        this.height = 1 + Math.max(this.left.getHeight(), this.right.getHeight());
        } 
        if (this.left) {
        let balance = this.left.getBalance();
        } else return 
    
        if (balance > 1 && value < this.left.value) {
          return this.rightRotate();
        }
    
        if (balance < -1 && value > this.right.value) {
          return this.leftRotate();
        }
    
        if (balance > 1 && value > this.left.value) {
          this.left = this.leftRotate(this.left);
          return this.rightRotate();
        }
    
        if (balance < -1 && value < this.right.value) {
          this.right = this.rightRotate(this.right);
          return this.leftRotate();
        }
    
        return this;
      }

    getHeight() {
        if (!this) {
          return 0;
        }
        return this.height;
      }

    inOrder() {
        const array = [];
        const search = function(node) {
            if (node) {
                search(node.left)
            array.push(node.value)
                search(node.right)
            } 
        }
        search(this);
        return array
    }

    preOrder(){
        const array = [];
        const search = function(node) {
            if (node) {
                array.push(node.value)
                search(node.left)
                search(node.right)
            } 
        }
        search(this);
        return array;
    }

    postOrder(){
        const array = [];
        const search = function(node) {
            if (node) {
                search(node.left)
                search(node.right)
                array.push(node.value)
            } 
        }
        search(this);
        return array;
    }

    search(arg){
        const outputArr = [];
        const traverse = function(node){ 
            outputArr.push(node.value);
            if (arg === node.value) return;
            if (arg < node.value) traverse(node.left);
            if (arg > node.value) traverse(node.right);
            }
        traverse(this);
        return outputArr;
    }

    getBalance() {
        if (!this) return 0;

        return this.left.getHeight() - this.right.getHeight();
    }

    leftRotate(){
        const nodeY = this.right;
        const T2 = nodeY.left;
        nodeY.parent = this.parent;
        this.parent = nodeY;

        nodeY.left = this;
        this.right = T2;
    
        this.height = Math.max(this.left.getHeight(), this.right.getHeight()) +1;
        nodeY.height = Math.max(nodeY.left.getHeight(), nodeY.right.getHeight()) +1;
        return nodeY;
    }

    rightRotate() {
        const nodeY = this.left;
        const T2 = nodeY.right;
        nodeY.parent = this.parent;
        this.parent = nodeY;

        nodeY.right = this;
        this.left = T2;
    
        this.height = Math.max(this.right.getHeight(), this.left.getHeight()) +1;
        nodeY.height = Math.max(nodeY.right.getHeight(), nodeY.left.getHeight()) +1;
        return nodeY;
    }

    

    findMin() {
        let current = this;
        while(current.left) {
            current = current.left;
        }
        return current.value;
    }

    findMax() {
        let current = this;
        while(current.right) {
            current = current.right;
        }
        return current.value;
    }
}

//instanciate a new object passing in number 6 argument
const tree = new BSTree(); 
//add method is invoked, passing in 5
tree.add(5);
tree.add(9);
tree.add(3);
tree.add(4);
tree.add(0);
tree.add(8);
tree.add(7);
tree.add(2);
tree.add(6);
tree.add(1);
tree.add(10);
console.log(tree.root)


const replacer = (key, val) => 'parent' == key ? undefined : val;
console.log(JSON.stringify(tree, replacer, '\t'));
// console.log(tree.inOrder())
// console.log(tree.preOrder())
// console.log(tree.postOrder())
// console.log(tree.search(10))
// console.log(tree.search(1))
// console.log(tree.getHeight(tree.root))
// console.log(tree.findMin())
// console.log(tree.findMax())
console.log(tree.getBalance(tree.root.left)) //should be 2: 2 - 0
console.log(tree.getBalance(tree.root)) //should be 0: 4 - 4
console.log(tree.getBalance(tree.root.right.left)) //should be 2: 1 - -1
// console.log(tree.root.right.left.value)
// tree.root.rightRotate(tree.root.right.left)
// console.log(tree.search(6))
console.log(tree.root.getHeight(tree.root))
// console.log(tree.root.right.left.value)
// console.log(tree.root.left.left.right.value)
// tree.root.rightLeftRotate(tree.root.left.left.right)


console.log(tree.root.left.inOrder())




// const replacer = (key, val) => 'parent' == key ? undefined : val;
// console.log(JSON.stringify(tree, replacer, '\t'));
// tree.search(10);
/*console.log(tree.search(4))
console.log(tree.search(6))
console.log(tree.getHeight()) */

// console.log(tree.getHeight(tree.root.right.left.left))
