document.getElementById('start-test').addEventListener('click', () => {
    const startTime = performance.now();

    // Intentional performance issue: Blocking the event loop with a heavy computation
    for (let i = 0; i < 500000000; i++) {
        // Complex computation that blocks the UI thread
    }

    const dynamicContent = document.getElementById('dynamic-content');

    // Intentional performance issue: Unnecessary DOM reflows
    for (let i = 0; i < 100000; i++) {
        const newElement = document.createElement('p');
        newElement.textContent = `Paragraph ${i}`;
        dynamicContent.appendChild(newElement);
    }

    const endTime = performance.now();
    console.log(`Test completed in ${endTime - startTime} milliseconds.`);
});

/* 
    function runHeavyComputation() {
        let i = 0;
        function computeChunk() {
            const chunkSize = 1000000; // Number of iterations per chunk
            const end = Math.min(i + chunkSize, 500000000);
            for (; i < end; i++) {
                // Perform computation
            }
            if (i < 500000000) {
                setTimeout(computeChunk, 0); // Schedule the next chunk
            } else {
                console.log("Computation completed.");
            }
        }
        computeChunk();
    }
    runHeavyComputation()
*/

/*
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const newElement = document.createElement('p');
    newElement.textContent = `Paragraph ${i}`;
    fragment.appendChild(newElement);
}
dynamicContent.appendChild(fragment); // Append all at once
*/