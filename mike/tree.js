import { assert } from './assert.js';

/** Tree */
export class Tree{
  _elem = undefined;//allow 'null' to be valid data but not 'undefined'
  _left = null;
  _right = null;
  _parent = null;

  /** Create a balanced Tree from the given elements.
   * To add additional elements and maintain balance, use `addBalanced`.
   * For an unbalanced tree, construct an empty tree then `add` elements.
   * @constructor
   * @param {Array} [elements]
   */
  constructor(...elements){ this.addBalanced(...elements) }

  ///Accessors
  get element(){ return this._elem }
  set element(v){ this._elem = v }
  get left(){ return this._left }
  get right(){ return this._right }
  get parent(){ return this._parent }

  ///Calculated getters
  get root(){ return this._parent ? this._parent.root : this }
  get isLeft(){ return this._parent ? this._parent._left === this : false }
  get isRight(){ return this._parent ? this._parent._right === this : false }
  get height(){ return 1+Math.max(this._left ? this._left.height : -1, this._right ? this._right.height : -1) }
  get heightDiff(){ return (this._left ? this._left.height : -1) - (this._right ? this._right.height : -1) }

  /** [TreeTraversalCallback]
   * Creates a new array, similar to Array.map, populated with the results of calling a
   * provided function on every element in the calling Tree in a specified calling order.
   * @name TreeTraversalCallback
   * @function
   * @param {*} data Data stored in the node.
   * @returns A new array with each element being the result of the callback function.
  */

  /** Creates a new array, similar to Array.map, populated with the results of calling a
   * provided function on every element in the calling Tree in preorder. If no function is
   * provided, an array of preordered elements is returned.
   * @param {TreeTraversalCallback} [fn] A function to execute for each element in the array.
   * Its return value is added as a single element in the new array.
   * @return A new array with each element being the result of the callback function.
   * @example ```
   * const tree = new Tree(2, 1, 3);
   * tree.preorder();//[2, 1, 3]
   * tree.preoder(x => 2*x);//[4, 2, 6]
   * ```
   */
  preorder(fn){ return [
    this._elem,
    ...(this._left ? this._left.preorder() : []),
    ...(this._right ? this._right.preorder() : []),
  ].map(fn || ((node) => node)); }

  /** Creates a new array, similar to Array.map, populated with the results of calling a
   * provided function on every element in the calling Tree in inorder. If no function is
   * provided, an array of inordered elements is returned.
   * @param {TreeTraversalCallback} [fn] A function to execute for each element in the array.
   * Its return value is added as a single element in the new array.
   * @return A new array with each element being the result of the callback function.
   * @example ```
   * const tree = new Tree(2, 1, 3);
   * tree.inorder();//[1, 2, 3]
   * tree.inoder(x => 2*x);//[2, 4, 6]
   * ```
   */
  inorder(fn){ return [
    ...(this._left ? this._left.inorder() : []),
    this._elem,
    ...(this._right ? this._right.inorder() : []),
  ].map(fn || ((node) => node)); }

  /** Creates a new array, similar to Array.map, populated with the results of calling a
   * provided function on every element in the calling Tree in postorder. If no function is
   * provided, an array of postordered elements is returned.
   * @param {TreeTraversalCallback} [fn] A function to execute for each element in the array.
   * Its return value is added as a single element in the new array.
   * @return A new array with each element being the result of the callback function.
   * @example ```
   * const tree = new Tree(2, 1, 3);
   * tree.postorder();//[1, 3, 2]
   * tree.postoder(x => 2*x);//[2, 6, 4]
   * ```
   */
  postorder(fn){ return [
    ...(this._left ? this._left.postorder() : []),
    ...(this._right ? this._right.postorder() : []),
    this._elem,
  ].map(fn || ((node) => node)); }

  /** Balance this subtree with the appropriate rotations.
   * @return {Tree} This subtree.
   * @example ```
   * // 1*
   * //  \                  2
   * //   3  -balance()→   /  \
   * //  /                1*   3
   * // 2
   * const tree = new Tree(1, 3, 2);
   * tree.preorder();//[1, 3, 2]
   * tree.postorder();//[2, 3, 1]
   * tree.balance();
   * tree.preorder();//[2, 1, 3] (changed!)
   * tree.postorder();//[1, 3, 2] (changed!)
   * ```
   */
  balance(){
    const heightDiff = this.heightDiff;
    if(1 < heightDiff){
      //left subtree is higher than the right subtree
      const leftHeightDiff = this._left ? this._left.heightDiff : -1;
      if(0 < leftHeightDiff) rotateRR(this);
      else if(leftHeightDiff < 0) rotateLR(this);
    }else if(heightDiff < -1){
      //right subtree is higher than the left subtree
      const rightHeightDiff = this._right ? this._right.heightDiff : -1;
      if(rightHeightDiff < 0) rotateLL(this);
      else if(0 < rightHeightDiff) rotateRL(this);
    }//else if
    return this;
  }//balance

  /** Add an element to the tree without rebalancing.
   * @param {*} element New element to add to the tree.
   * @param {Array} moreElements Additional elements to add to the tree.
   * @return {Tree} The newly added subtree node for the first given `element`.
   * @example ```
   * // 1             1
   * //  \             \
   * //   3  -add(2)→   3
   * //                /
   * //               2*
   * const tree = new Tree(1, 3);
   * tree.add(2).element;//2
   * tree.preorder();//[1, 3, 2]
   * tree.postorder();//[2, 3, 1]
   * ```
   */
  add(element, ...moreElements){
    if(undefined===element) return this;
    if(undefined===this._elem){
      assert(null===this._left && null===this._right);
      this._elem = element;
      this.add(...moreElements);
      return this;
    }//if
    let newNode;
    if(element <= this._elem){
      if(element == this._elem) console.warn(`Adding duplicate element ${element} as left child.`);
      if(this._left) return this._left.add(element);
      newNode = this._left = new Tree(element);
    }else{
      if(this._right) return this._right.add(element);
      newNode = this._right = new Tree(element);
    }//else
    newNode._parent = this;
    this.add(...moreElements);
    return newNode;
  }//add

  /** Add an element to the tree and rebalance the parent.
   * @param {Array} elements New elements to add to the tree.
   * @returns {Tree} The newly added subtree node for the first given element.
   * @example ```
   * // 1             1
   * //  \             \                 2*
   * //   3  -add(2)→   3  -rebalance→  /  \
   * //                /               1    3
   * //               2*
   * const tree = new Tree(1, 3);
   * tree.addBalanced(2).element;//2
   * tree.preorder();//[2, 1, 3]
   * tree.postorder();//[1, 3, 2]
   * ```
   */
  addBalanced(...elements){
    const newNode = this.add(...elements);
    this.balance();
    return newNode;
  }//addBalanced
}//Tree

///Private, non-exported function

/** Rotate this subtree to solve lopsidedness to the right.
 * @return {Tree} Resulting subtree after the rotation.
 * @example ```
 * // 2*                3
 * //  \   –rotateLL→  / \
 * //   3             2*  4
 * //    \
 * //     4
 * const tree = new Tree(2, 3, 4);
 * tree.preorder();//[2, 3, 4]
 * tree.postorder();//[4, 3, 2]
 * rotateLL(tree);
 * tree.preorder();//[3, 2, 4] (changed!)
 * tree.postorder();//[2, 4, 3] (changed!)
 * ```
 */
function rotateLL(tree){
  if(!tree._right) return tree;
  [ tree._elem, tree._right._elem ] = [ tree._right._elem, tree._elem ];//swap
  tree._right._left = tree._left;
  if(tree._left) tree._left._parent = tree._right;
  if(tree._right._right) tree._right._right._parent = tree;
  tree._left = tree._right;
  tree._right = tree._right._right;
  tree._right._right = tree._left._right = null;
  return tree;
}//rotateLL

/** Rotate this subtree to solve lopsidedness to the left.
 * @return {Tree} Resulting subtree after the rotation.
 * @example ```
 * //     3*             2
 * //    /              /  \
 * //   2  –rotateRR→  1    3*
 * //  /
 * // 1
 * const tree = new Tree(3, 2, 1);
 * tree.preorder();//[3, 2, 1]
 * tree.postorder();//[1, 2, 3]
 * rotateRR(tree);
 * tree.preorder();//[2, 1, 3] (changed!)
 * tree.postorder();//[1, 3, 2] (changed!)
 * ```
 */
function rotateRR(tree){
  if(!tree._left) return tree;
  [ tree._elem, tree._left._elem ] = [ tree._left._elem, tree._elem ];//swap
  tree._left._right = tree._right;
  if(tree._right) tree._right._parent = tree._left;
  if(tree._left._left) tree._left._left._parent = tree;
  tree._right = tree._left;
  tree._left = tree._left._left;
  tree._left._left = tree._right._left = null;
  return tree;
}//rotateRR

/** Rotate this subtree to solve left-right lopsidedness.
 * @return {Tree} Resulting subtree after the rotation.
 * @example ```
 * //   3*              3*
 * //  /               /               2
 * // 1   -rotateLL→  2   -rotateRR→  /  \
 * //  \             /               1    3*
 * //   2           1
 * const tree = new Tree(3, 1, 2);
 * tree.preorder();//[3, 1, 2]
 * tree.postorder();//[2, 1, 3]
 * rotateLR(tree);
 * tree.preorder();//[2, 1, 3] (changed!)
 * tree.postorder();//[1, 3, 2] (changed!)
 * ```
 */
function rotateLR(tree){
  if(tree._left) rotateLL(tree._left);
  return rotateRR(tree);
}//rotateLR

/** Rotate this subtree to solve right-left lopsidedness.
 * @return {Tree} Resulting subtree after the rotation.
 * @example ```
 * // 1*              1*
 * //  \               \                  2
 * //   3  -rotateRR→   2   -rotateLL→   /  \
 * //  /                 \              1*   3
 * // 2                   3
 * const tree = new Tree(1, 3, 2);
 * tree.preorder();//[1, 3, 2]
 * tree.postorder();//[2, 3, 1]
 * rotateRL(tree);
 * tree.preorder();//[2, 1, 3] (changed!)
 * tree.postorder();//[1, 3, 2] (changed!)
 * ```
 */
function rotateRL(tree){
  if(tree._right) rotateRR(tree._right);
  return rotateLL(tree);
}//rotateRL

///* EOF *///
