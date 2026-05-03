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

        // 🔥 Handle backend error
        if (data.error) {
            output.innerHTML = `<p class="error">Error: ${data.error}</p>`;
            return;
        }

        // 🔥 Safe execution time
        const execTime = data.execution_time 
            ? Number(data.execution_time).toFixed(5) 
            : "0.00000";

        // 🔥 SAFE priority handling (MAIN FIX)
        const priority = (data.priority || "LOW").toLowerCase();

        let priorityClass = "priority-low";
        if (priority === "high") priorityClass = "priority-high";
        else if (priority === "medium") priorityClass = "priority-medium";

        // 🔥 Safe issues display
        const issues = Array.isArray(data.issues) 
            ? data.issues.join(", ") 
            : (data.issues || "No issues");

        output.innerHTML = `
            <p><span class="label">Query:</span> ${data.query || "N/A"}</p>
            <p><span class="label">Execution Time:</span> ${execTime} sec</p>
            <p><span class="label">Issues:</span> ${issues}</p>
            <p><span class="label">Suggestion:</span> ${data.suggestion || "N/A"}</p>
            <p><span class="label">Priority:</span> 
                <span class="${priorityClass}">${data.priority || "LOW"}</span>
            </p>
        `;

    } catch (error) {
        output.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}