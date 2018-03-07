var Leaf = function(position, size) {
    this.position = position;
    this.velocity = createVector(0, random(0, 2));
    this.acceleration = createVector(0, random(0, 1));
    this.size = size;
    this.colourA = color(0, floor(random(100, 150)), 0, floor(random(50, 255)));
    this.colourB = color(floor(random(100, 150)), 0, 0, floor(random(20, 255)));
    this.life = 0;
    this.fall = false;
};

Leaf.prototype.update = function() {
    if (this.fall) {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
};

Leaf.prototype.render = function() {
    push();
    noStroke();
    fill(lerpColor(
        this.colourA,
        this.colourB,
        (this.life < 1 && random(0, 1) > 0.75) ? this.life += 0.01 : this.life
    ));
    ellipse(this.position.x, this.position.y, this.size, this.size);
    pop();
};
