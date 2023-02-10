import * as akeemList from './akeem/list.js';
import * as akeemTree from './akeem/tree.js';

import * as mikeList from './mike/list.js';
import * as mikeTree from './mike/tree.js';

const mike = Object.assign({}, mikeList, mikeTree);//merge for convenience
const akeem = Object.assign({}, akeemList, akeemTree);//merge for convenience

//🔰This file is our playground where we test out the things we've created
//the 'mike' and 'akeem' objects encapsulate our different implementations
//so that we can try out both and compare them here!

const replacer = (key, val) => key.includes('prev') || key.includes('parent') ? undefined : val;

///Mike's implementation:
{
  //first, add nodes without self-balancing
  const tree1 = new mike.Tree();
  tree1.add(3, false);
  tree1.add(2, false);
  tree1.add(1, false);
  console.log(tree1.preorder());// [3, 2, 1]
  console.log(tree1.postorder());// [1, 2, 3]
  tree1.balance();
  console.log(tree1.preorder());//[2, 1, 3] (changed!)
  console.log(tree1.postorder());//[1, 3, 2] (changed!)

  //next, add nodes with self-balancing
  const tree2 = new mike.Tree();
  tree2.add(3);
  tree2.add(2);
  tree2.add(1);
  console.log(tree2.preorder());//[2, 1, 3] (already balanced!)
  console.log(tree2.postorder());//[1, 3, 2] (already balanced!)
}

///Akeem's implementation
{
  //CHALLENGE:
  //Implement your list and tree using 'this' instead of passed in nodes.
  //Include tree rotations, balance, and self-balancing in the add method.

  //TESTS:
  //const tree = new akeem.Tree();
  //tree.add(3);
  //tree.add(2);
  //tree.add(1);
  //console.log(tree.preorder());//[2, 1, 3] (already balanced?)
  //console.log(tree.postorder());//[1, 3, 2] (already balanced?)
}




/* EOF*/
