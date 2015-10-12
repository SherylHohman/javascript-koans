describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;
    };

    var aPerson = new Person ("John", "Smith");
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe('Smith, John');
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)
    {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    var aPerson = new Person ("John", "Smith");

    //console.log(aPerson.firstname);
    // creates a new Public property on the object, called firstname
    aPerson.firstname = "Penny";
    //console.log(aPerson.firstname);
    aPerson.lastname = "Andrews";
    // does this overwrite the private fullName var on the object?
    //console.log(aPerson.fullName);        //fullName is a Private var
    //console.log(aPerson.getFullName());
    aPerson.fullName = "Penny Andrews";   // add public var
    //console.log(aPerson.fullName);        // return val of Public var
    //console.log(aPerson.getFullName());   // result of closures
    /*
      Interesting, so firstname and lastname aren't private variables..
      But, due to closures, getFirstName will ALWAYS return the value of firstname as it was originally passed into the Constructor
      BECAUSE there is no way to alter (getFirstName).
      Even though we add a new Public var of "firstname" to the object, 
      the Private getFirstName() method looks at its local (Private) copy of the variable and returns that value. Not the value of the Public var firstName.

    */

    expect(aPerson.getFirstName()).toBe('John');
    expect(aPerson.getLastName()).toBe('Smith');
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };
    // added Public method getFullName,
    // which overwrites the Private method of the same name.

    expect(aPerson.getFullName()).toBe('Andrews, Penny');
  });

});
