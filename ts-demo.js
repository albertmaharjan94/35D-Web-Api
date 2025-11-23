var message = "Hello";
console.log(message);
// message = true;
// Primitive types
var booleanVar = true;
var numberVar = 42;
var symbolVar = Symbol("unique");
var nullVar = null;
var undefinedVar = undefined;
var bigintVar = 9007199254741991n;
var anyVar = "Could be anything";
anyVar = anyVar + 100;
var unknownVar = "Unknown type";
// unknownVar = unknownVar + 123;
// any can be anything, unknown needs type assertion
// Array
var score = [100, 98, 95];
// tuples
var student = ["Alice", 20];
// Union type
var id;
id = "Hello";
console.log(id);
id = 1002;
console.log(id);
// id = false; // Error
// Functions
function add(num1, num2) {
    var sum = num1 + num2;
    return "Sum is ".concat(sum);
}
var result = add(10, 20);
console.log(result);
var greet = function (name) {
    if (name === void 0) { name = "Guest"; }
    console.log("Hello, ".concat(name));
};
greet();
// Object defination
// 1. Object Literal
var userDetails = {
    name: "Bob",
    age: 25,
    // desc: "A developer", // optional
    // isActive: false, // Error
};
console.log(userDetails);
var product1 = {
    id: 1,
    name: "Laptop",
    price: 999.99, // price: null
};
console.log(product1);
var employee1 = {
    empId: 101,
    empName: "Charlie",
    isPermanent: true,
    product: product1,
};
console.log(employee1);
// Generics
function identity(arg) {
    return arg;
}
var output1 = identity("Generic String");
console.log(output1);
var output2 = identity(12345);
console.log(output2);
// Enums
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {}));
var userRole = Role.Admin;
console.log(userRole); // enum index
console.log(Role[userRole]); // enum value
var role = "Admin";
console.log(role === "admin");
console.log(Role.Admin === userRole);
