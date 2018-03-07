var tree;
var leaves;
var limit;
var day;
var night;
var time;

function setup() {
    createCanvas(windowWidth, windowHeight);
    plantTree();
    sproutLeaves();
    timeOfDay();
}

function timeOfDay() {
    day = color(135, 206, 250, 255);
    night = color(0, 0, 0, 255);
    time = 0;
}

function plantTree() {
        const root = new Branch(
        createVector(width / 2, height),
        createVector(width / 2, height - random(100, 200)),
        random(15, 20)
    );
    tree = [];
    limit = 3000;
    tree.push(root);
}

function growTree() {
    for (var i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].grown && random(0, 1) > 0.88) {
            var leftTwig = tree[i].twig(
                random(-PI / 10, -4 * PI / 10),
                random(0.5, 0.9),
                random(0.7, 0.9)
            );
            var rightTwig = tree[i].twig(
                random(PI / 10, 4 * PI / 10),
                random(0.5, 0.9),
                random(0.7, 0.9)
            );
            tree.push(leftTwig);
            tree.push(rightTwig);
            tree[i].grown = true;
        }
    }
}

function renderTree() {
    for (var i = 0; i < tree.length; i++) {
        tree[i].render();
    }
}

function sproutLeaves() {
    leaves = [];
}

function growLeaves() {
    for (var i = 0; i < tree.length; i++) {
        if (!tree[i].grown || tree[i].sprout) {
            print("regrow");
            var leaf  = new Leaf(tree[i].end.copy(), random(1, 20));
            leaves.push(leaf);
            tree[i].grown = true;
            tree[i].sprout = true;
        }
    }
}

function renderLeaves() {
    for (var i = leaves.length - 1; i >= 0; i--) {
        if (leaves[i].life >= 1 && random(0, 1) > 0.995) leaves[i].fall = true;
        if (leaves[i].position.y > height + (leaves[i].size * 2)) {
            leaves.splice(i, 1);
            continue;
        }
        leaves[i].update();
        leaves[i].render();
    }
    if (tree.length === limit && leaves.length === 0) growLeaves();
}

/*function shakeTree() {
  for (var i = 0; i < tree.length; ++i) {
    tree[i].thickness += random(0,0.7);
  }
}
*/

function draw() {
    if (time < 1) {
        background(lerpColor(
            day,
            night,
            (time < 1 && random(0, 1) > 0.8) ? time += 0.005 : time));
    } else {
        [day, night] = [night, day];
        time = 0;
    }
    if (random(0, 1) > 0.90 && tree.length < limit) growTree();
    if (tree.length > limit) {
        growLeaves();
        limit = tree.length;
    }
    renderTree();
    renderLeaves();
  //  if (random(0,1) > 0.9999) shakeTree();
}
