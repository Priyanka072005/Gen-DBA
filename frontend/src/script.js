async function analyzeQuery() {
    const id = document.getElementById("queryId").value;
    const output = document.getElementById("output");

    if (!id) {
        output.innerHTML = `<p class="error">Please enter a Query ID</p>`;
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/analyze/${id}`);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        const execTime = Number(data.execution_time).toFixed(5);

        const priority = data.priority.toLowerCase();
        let priorityClass = "priority-low";

        if (priority === "high") priorityClass = "priority-high";
        else if (priority === "medium") priorityClass = "priority-medium";

        output.innerHTML = `
            <p><span class="label">Query:</span> ${data.query}</p>
            <p><span class="label">Execution Time:</span> ${execTime} sec</p>
            <p><span class="label">Issues:</span> ${data.issues}</p>
            <p><span class="label">Suggestion:</span> ${data.suggestion}</p>
            <p><span class="label">Priority:</span> 
                <span class="${priorityClass}">${data.priority}</span>
            </p>
        `;

    } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}