# Network Panel Exercise

## Objective
Use the Network panel to analyze network activity, including making requests to an external API, simulating slow network conditions, and handling errors.

## Instructions

1. **Open the `index.html` file**:
   - Open the `index.html` file in your browser by double-clicking it or dragging it into your browser window.
   - This file contains a button that, when clicked, will fetch data from an external API and display it on the page.

2. **Monitor Network Requests**:
   - Open your browser's DevTools (Right-click -> Inspect -> Network).
   - Click the "Fetch Posts" button and observe the network request to `https://jsonplaceholder.typicode.com/posts` in the Network panel.
   - What is the HTTP method used? What status code is returned?

3. **Analyze the Request and Response**:
   - In the Network panel, inspect the request made to `https://jsonplaceholder.typicode.com/posts`.
   - Review the response headers and body to understand how the data is structured and returned by the server.
   - What content type is the response? How many posts were returned?

4. **Simulate Slow Network Conditions**:
   - In the Network panel, change the network throttling to "Slow 3G".
   - Click the "Fetch Posts" button again and observe how the request and response times change.
   - How does this affect the user experience? What strategies could improve performance under slow network conditions?

5. **Handle Errors Gracefully**:
   - Simulate an error by modifying the URL in the `fetch` call (e.g., change `https://jsonplaceholder.typicode.com/posts` to `https://jsonplaceholder.typicode.com/wrong-endpoint`).
   - Observe how the code handles the 404 error and see what message is displayed in the browser.
   - Update the `script.js` file to provide a more user-friendly message in case of an error.

6. **Experiment with Other Endpoints**:
   - Modify the fetch request to use different endpoints provided by the API, such as `/users` or `/comments`.
   - Adjust the code to display different types of data and observe how the response structure changes.
   - What new fields are present in the response? How would you modify the output to display this additional information?

## Tips
- The Network panel is essential for analyzing how your web page interacts with external resources, including understanding AJAX requests, response times, and error handling.
- Use the Timing tab in the Network panel to see how long each part of the request takes, and consider how you might optimize this.
- Handling errors gracefully improves the user experience, especially in cases of network failures or incorrect endpoints.

## Additional Challenge
- Extend the exercise by adding a new button to fetch users or comments from the API. Write the necessary JavaScript to handle this new functionality and display the results in the browser.
