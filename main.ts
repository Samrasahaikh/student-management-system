#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string,) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for the courses
        this.balance = 100;
    }

    //method to enroll a student in a course
    enroll_course(course: string) {
        this.courses.push(course);
    }
    // methode to view a student balance
    view_balance() {
        console.log(chalk.green(`Balance: ${this.name}: $${this.balance}`));
    }

    //method to pay a student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(chalk.green(`$${amount} Fees paid successfully ${this.name}`));
        console.log(chalk.blue(`Remaining Balance : $${this.balance}`));

    }
    //method to show status for student
    show_status() {
        console.log(chalk.yellow(`ID: ${this.id}`));
        console.log(chalk.yellow(`Name: ${this.name}`));
        console.log(chalk.yellow(`Courses: ${this.courses}`));
        console.log(chalk.yellow(`Balance: ${this.balance}`));


    }
};

//Difing a student manager class to manage the students
class Student_manager {
    students: Student[];
    constructor() {
        this.students = [];
    };
    //method to add a new student
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.yellow(`Student ${name} added successfully. Student ID: ${student.id}`));
    }
    //methode to enroll a studet in a course
    enroll_student(student_id: number, course: string) {
        let findStudent = this.find_student(student_id);
        if (findStudent) {
            findStudent.enroll_course(course);
            console.log(chalk.yellow(`${findStudent.name}enrolled in ${course} successfully`));
        }
    }
    // method to view a student balance
    view_student_balance(student_id: number) {
        let findStudent = this.find_student(student_id);
        if (findStudent) {
            findStudent.view_balance();
        }
        else {
            console.log(chalk.red("Student not found. Please enter a student ID !!!!."));

        }
    };
    //methode to pay student fees
    pay_student_fees(student_id: number, amount: number) {
        let findStudent = this.find_student(student_id);
        if (findStudent) {
            findStudent.pay_fees(amount);
        }
        else {
            console.log(chalk.red("Student not found. Please enter a currect student ID"));

        }
    }

    //method to disply student status
    show_student_status(student_id: number) {
        let findStudent = this.find_student(student_id);
        if (findStudent) {
            findStudent.show_status();
        }

    }

    //method to find a student by student id
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
}

//main function to rum the peogram
async function main() {
    console.log(chalk.blue("-".repeat(50)));
    console.log(chalk.yellow(" <<<<<<<<<<Student Management System>>>>>>>>>>"));
    console.log(chalk.blue("-".repeat(50)));

    let studentManager = new Student_manager()
    // while loop to keep peogram runing
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                massage: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);

        //using switch cases to handle user choise
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.magenta("Enter a Student Name")
                    }
                ]);
                studentManager.add_student(name_input.name);
                break;

            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.cyan("Enter a Student ID")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.magenta("Enter a Course Name")
                    }
                ]);
                studentManager.enroll_student(enroll_input.student_id, enroll_input.course);
                break;

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.cyan("Enter a Student ID")
                    }
                ]);
                studentManager.view_student_balance(balance_input.student_id);
                break;

            case "Pay Student Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_Id",
                        type: "number",
                        message: chalk.cyan("Enter a Student ID")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.magenta("Enter a amount to pay")
                    }
                ]);
                studentManager.pay_student_fees(fees_input.student_Id, fees_input.amount);
                break;

            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.cyan("Enter a Student ID")
                    }
                ]);
                studentManager.show_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log(chalk.red("Exiting..."));
                process.exit();
        }

    }
}

//calling a main function
main();