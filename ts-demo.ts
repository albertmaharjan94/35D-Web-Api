let message: string = "Hello";
console.log(message);
// message = true;

// Primitive types
let booleanVar: boolean = true;
let numberVar: number = 42;
let symbolVar: symbol = Symbol("unique");
let nullVar: null = null;
let undefinedVar: undefined = undefined;
let bigintVar: bigint = 9007199254741991n;
let anyVar: any = "Could be anything";
anyVar = anyVar +  100;

let unknownVar: unknown = "Unknown type";
// unknownVar = unknownVar + 123;
// any can be anything, unknown needs type assertion

// Array
let score: number[] = [100, 98, 95];
// tuples
let student: [string, number] = ["Alice", 20];

// Union type
let id: string | number;
id = "Hello";
console.log(id);
id = 1002;
console.log(id);
// id = false; // Error

// Functions
function add(num1: number, num2: number): string{
    let sum: number = num1 + num2;
    return `Sum is ${sum}`;
}
let result: string = add(10, 20);
console.log(result);

const greet = (name: string = "Guest"): void => {
    console.log(`Hello, ${name}`);
}
greet();

// Object defination
// 1. Object Literal
let userDetails: { name: string, age: number, desc?: string } = {
    name: "Bob",
    age: 25,
    // desc: "A developer", // optional
    // isActive: false, // Error
};
console.log(userDetails)

// 2. Interfaces
interface Product {
    id: number;
    name: string | number;
    price: number | null;
    description?: string; // optional
}
let product1: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99, // price: null
};
console.log(product1);

// 3. Type Aliases
type Employee = {
    empId: number;
    empName: string;
    isPermanent?: boolean;
    product?: Product;
}
let employee1: Employee = {
    empId: 101,
    empName: "Charlie",
    isPermanent: true,
    product: product1,
};
console.log(employee1);

// Generics
function identity<T>(arg: T): T {
    return arg;
}
let output1: string = identity<string>("Generic String");
console.log(output1);
let output2: number = identity<number>(12345);
console.log(output2);

// Enums
enum Role{
    Admin,
    User,
    Guest
}
let userRole: Role = Role.Admin;
console.log(userRole); // enum index
console.log(Role[userRole]); // enum value

let role: string = "Admin";
console.log(role === "admin");
console.log(Role.Admin === userRole)

interface User{
    id: number;
    name: string;
    role: Role;
}

let update: Partial<User> = {
    id: 101 
}
console.log(update)

let readonlyUser: Readonly<User> = {
    id: 1,
    name: "Readonly User",
    role: Role.User
};
// readonlyUser.id = 2; // Error
console.log(readonlyUser);


// Tasks
// Create enum for CarType: Sedan, SUV, Truck, Coupe.
// create a type CarModel.
// - name: string, description: string
// Create an interface for a Car with properties: 
// make: string, model: CarModel, 
// year: number or string, 
// type : CarType, and isElectric (optional) boolean.
// create a array of cars with at least 3 car objects.
// filter the cars whose year is greater than 2015
enum CarType {
    Sedan,
    SUV,
    Truck,
    Coupe
}

type CarModel = {
    name: string;
    description: string;
}

interface Car {
    make: string;
    model: CarModel;
    year: number | string;
    type: CarType;
    isElectric?: boolean;
}
let car1: Car = {
    make: "Honda",
    model: { name: "Civic", description: "A compact car" },
    year: 2020,
    type: CarType.Sedan,
    isElectric: false
};
let cars: Car[] = [
    {
        make: "Toyota",
        model: { name: "Camry", description: "A comfortable sedan" },
        year: 2018,
        type: CarType.Sedan,
        isElectric: false
    },
    car1
]
let recentCars: Car[] = cars.filter(car => {
    if (typeof car.year === "number") {
        return car.year > 2015;
    }
    return false;
});
console.log(recentCars);