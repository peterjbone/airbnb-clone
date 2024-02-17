type Person = {
	name: string;
	lastName: string;
	age: number;
	sayHi: () => void;
};

const person1: Person = {
	name: "joao",
	lastName: "bone",
	age: 22,
	sayHi() {
		console.log(`hi bro, im ${this.name}`);
	}
};

person1.sayHi();
