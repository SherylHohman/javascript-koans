function Muppet(age, hobby) {
  this.age = age;
  this.hobby = hobby;

  this.answerNanny = function(){
	return "Everything's cool!";
  }
}

function SwedishChef(age, hobby, mood) {
  Muppet.call(this, age, hobby);
  this.mood = mood;

  this.cook = function() {
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet();

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet = new Muppet(2, "coding");
	this.swedishChef = new SwedishChef(2, "cooking", "chillin");
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual('Mmmm soup!');
  });

  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything's cool!");
  });

  it("should set constructor parameters on the base object", function() {
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual('cooking');
  });

  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual('chillin');
  });
});

// http://javascript.crockford.com/prototypal.html
Object.prototype.beget = function () {
  function F() {}
  F.prototype = this;
  return new F();
}
/*
  // SH so, this adds a method "beget" to Every Object's Object.prototype method
  // or adds "prototype.beget" to every Object..
  // Um.. which returns a pointer to a brand new Object.
  // But.. it does Not set the prototype of that new object to the prototype of the calling 
  //  object which was referenced in the call? As I first though?
  //  does it actually now set the prototype to be aof plain vanilla "Object" instead ??
  //  That would then make it act like "new" - which, since it creates a brand new Object 
  //    even though it is generally used to create a new instance using a particular object Constructor, the prototype for the new ojbect doesn't get automatically set to the prototype for the constructor object, but instead for the base "Object" prototype.
  // Hence, normally, you would then want to assign the proper protype so that "typeOf" would return the proper answer.
  // But here, against my first supposition, this does not creat a way to "correct" that problem automatically,
  // But instead re-creates the "unexpected" behaviour
  // Hopefully either my first assumption was right, and this new one is wrong,
  //  and I can clarify in my head how the code works correctly
  // OR, I can understand why this behaviour is actually the preferred behaviour
  //  and confirm that the code indeed operates as I secondly thought, not as I first thought
  // Obviously, this code is Not Clear in My Head ! (YET!)
*/

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby);
  this.trick = trick;

  this.doTrick = function() {
    return this.trick;
  }
}

//no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget();
// SH -- not entirely clear on this..

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
  this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire");
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual('eat a tire');
  });

  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual('Everything\'s cool!');
  });

  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3);
    expect(this.gonzo.hobby).toEqual('daredevil performer');
  });

  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual('eat a tire');
  });
  // SH so what is gonzo's prototype chain. 
  // And what do inherited Gonzo types of Gonzo 's prototype chain look like ?'
});
