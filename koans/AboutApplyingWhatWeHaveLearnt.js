var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      // SH code ! :-)
      // first filter the pizzas to return only items that do Not have nuts
        // : pizza.containsNuts === false
      var notAllergic = products.filter(function(pizza){return pizza.containsNuts === false});
      //console.log(notAllergic);

      // now for each item in notAllergic array, look at the ingredients list
      //  if "mushrooms" is not found (perhaps use Match) in the 
      //  pizza.ingredients array
      //    add this pizza to productsICanEat.
      //  Altertatively, pop any pizza With mushrooms from the filtered array
      // returned from the first step. 
      
      productsICanEat = notAllergic.filter( 
        function(pizza){
          //console.log('---',pizza.name, pizza.ingredients, '---');
          var isEdible = _.all(pizza.ingredients, 
            function(ingredient){
              //console.log(ingredient, (ingredient !=='mushrooms'));
              return  ingredient !=='mushrooms'
          })
          return isEdible;
          // I tried putting "return"
          // where "var is Edible =" is located instead of here
          // but for some reason, that did not work
        });
      //console.log('+++Final:', productsICanEat);
      // SH End SH Code

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
    // SH were we expected to do this math in our head?
    // I didn't, I ran the code. It is written correctly.
    // I'd rather exptected that we write the code
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    // SH Yea! we get to write some more Interesting Code !
    // create an array of numbers 1->1000 (use Range)

  /*  DOESN'T WORK: See Comments Below As To Why. TRY AGAIN
    // Nope: create array of numbers divisible by 3 ::range, step3
    var multipleOf3 = _.range(0, 1001, 3);
    //       create array of numbers divisible by 5 ::range, step5
    var multipleOf5 = _.range(0, 1001, 5);
    // combine the arrays
    var numbersToSum = _.flatten([multipleOf3,multipleOf5]);
    //console.log(numbersToSum);
    //NOPE: this does NOT work because integers which are multiples of BOTH 3 AND 5 are in the array Twice
    // .. Therefore get Added Twice!

    // sum the elements of the array ::via Reduce
    sum = numbersToSum.reduce(function(runningTotal,currentValue){
          return runningTotal + currentValue;
    }, 0);
    // the sum is correct, IF numbersToSum had been correct
    console.log(sum);
  */

    // Try Again ! :-)

// BELOW 1000. I was using 1001 to add numbers THROUGH 1000 !!
// By starting the array at 0, I do not need to supply an initial sum in my reduce function.
// Alternately, I coult start the array at 1, and supply the optional "initial" value parameter to my reduce function
// Actually, since this is addition, it doesn't matter
// I can start the array at 1, AND Not supply an initial value.
var array1000 = _.range(1,1000);
//console.log(array1000);

var factorOf3or5 = function(number){
    return ((number % 3 ===0) || (number%5===0)) ? true : false;
}

var addThisNumber = function(sum, valueAtIndex) {
  //console.log(sum, valueAtIndex, sum + valueAtIndex);
  return sum + valueAtIndex;
}
var arrayOfFactors = array1000.filter(factorOf3or5);
//console.log(arrayOfFactors);

var total = arrayOfFactors.reduce(addThisNumber);
console.log("total from non-chain solution", total);

/*// ## This Chaining Version Does NOT WORK !!!
    var sum =  _.chain()
                .range(1,1000)
                .filter(factorOf3or5(number))
                .reduce(addThisNumber(sum, valueAtIndex))
               .value();
*/
    console.log('sum is', sum, total);

    //var sum = FILL_ME_IN;    /* try chaining range() and reduce() */

    // This line puts the NON Chain solution
    // Remove this line to see results of Chain solution
    var sum = total;

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(FILL_ME_IN);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(FILL_ME_IN);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
