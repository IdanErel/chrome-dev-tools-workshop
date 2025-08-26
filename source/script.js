document.addEventListener("DOMContentLoaded", function() {
    const output = document.getElementById("output");

    async function complexAsyncFunction() {
        let result = 0;
        try {
            result = await faultyPromise();
            console.log("Result from async function:", result);
        } catch (error) {
            console.error("Error in async function:", error);
        }
        return result;
    }

    function faultyPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Intended logic: This promise should either resolve OR reject, but not both.
                reject(new Error("This should have been rejected!")); // Intentional logic error
                resolve("Success!");
            }, 1000);
        });
    }

    function triggerError() {
        const outOfScopeVariable = "Some random data";
        let data = "Initial data";

        try {
            data = processData(data);
        } catch (e) {
            console.error("Error processing data:", e, outOfScopeVariable);
        }

        output.textContent = "Processed Data: " + data;
    }

    function processData(input) {
        // Intentional logic error: Undefined variable used
        return input.toUpperCase() + " " + outOfScopeVariable;
    }

    document.getElementById("trigger-debug").addEventListener("click", () => {
        complexAsyncFunction().then(finalResult => {
            console.log("Final result:", finalResult);
            triggerError();
        });
    });
});
