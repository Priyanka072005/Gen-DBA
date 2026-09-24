async function analyzeQuery() {
    const id = document.getElementById("queryId").value;
    const loader = document.getElementById("loader");

    if (!id) return;

    loader.classList.remove("hidden");

    try {
        const res = await fetch(
            `http://127.0.0.1:8000/analyze/${id}`
        );

        const data = await res.json();

        const execTime = Number(
            data.execution_time || 0
        ).toFixed(3);

        const priority = (
            data.priority || "LOW"
        ).toUpperCase();

        // Execution Time
        document.getElementById("execTime").innerText =
            execTime + " sec";

        // Priority
        document.getElementById("priority").innerText =
            priority;

        // CLEAN ISSUES LIST (NO DUPLICATES)
        const issuesList =
            document.getElementById("issues");

        issuesList.innerHTML = "";

        const uniqueIssues = [
            ...new Set(data.issues || [])
        ];

        uniqueIssues.forEach(issue => {

            const li = document.createElement("li");

            li.innerText = issue;

            issuesList.appendChild(li);
        });

        // SMART PERFORMANCE METER
        updateMeter(priority);

        // OPTIMIZATION SUGGESTION
        document.getElementById("output").innerHTML = `
            <h3>💡 Optimization Suggestion</h3>
            <p>${data.suggestion || "No suggestion available."}</p>
        `;

    } catch (error) {

        document.getElementById("output").innerHTML = `
            <p class="error">
                Error: ${error.message}
            </p>
        `;

    } finally {

        loader.classList.add("hidden");

    }
}


// SMART METER
function updateMeter(priority) {

    const meter =
        document.getElementById("meter");

    let text = "";

    if (priority === "HIGH") {

        text =
            "🔴 SLOW QUERY\nOptimization Required";

    } else if (priority === "MEDIUM") {

        text =
            "🟡 MODERATE QUERY\nCan be Improved";

    } else {

        text =
            "🟢 FAST QUERY\nOptimized";
    }

    meter.innerText = text;

    meter.className =
        "meter " + priority.toLowerCase();
}