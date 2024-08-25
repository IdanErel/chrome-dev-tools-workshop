document.addEventListener("DOMContentLoaded", function() {
    const number = 10;
    console.log("The number is: " + number);
    const object = { name: "John", age: 30 };
    console.log("The object is: ", object);
    // Intentional error: Unhandled promise rejection
    async function faultyAsyncFunction() {
        throw new Error("This is an intentional async error!");
    }

    document.getElementById('start-task').addEventListener('click', () => {
        faultyAsyncFunction()
            .then(() => console.log("Async task completed."))
            .catch(console.log('Unhandled Error')); // Intentional error: Unhandled promise rejection
    });

    // Intentional error: Incorrect function call
    nonExistentFunction();

    // Issue: Incorrectly calculated sum due to logical error
    const numbers = [1, 2, 3, 4, 5];
    let sum = numbers.reduce((acc, num) => acc - num, 0); // Should be acc + num
    console.log("Calculated sum:", sum);
});
