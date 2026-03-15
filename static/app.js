const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const batteryEl = document.getElementById("battery");
const statusEl = document.getElementById("device-status");
const updatedEl = document.getElementById("last-updated");
const telemetryBody = document.getElementById("telemetry-body");

const ctx = document.getElementById("tempChart").getContext("2d");

const tempChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Temperature (°C)",
            data: [],
            borderWidth: 2,
            tension: 0.3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

function updateDashboard(data) {
    temperatureEl.textContent = `${data.temperature} °C`;
    humidityEl.textContent = `${data.humidity} %`;
    batteryEl.textContent = `${data.battery} %`;
    updatedEl.textContent = data.timestamp;

    statusEl.textContent = data.status;
    if (data.status === "Online") {
        statusEl.classList.remove("offline");
        statusEl.classList.add("online");
    } else {
        statusEl.classList.remove("online");
        statusEl.classList.add("offline");
    }

    tempChart.data.labels.push(data.timestamp);
    tempChart.data.datasets[0].data.push(data.temperature);

    if (tempChart.data.labels.length > 10) {
        tempChart.data.labels.shift();
        tempChart.data.datasets[0].data.shift();
    }

    tempChart.update();

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${data.timestamp}</td>
        <td>${data.temperature} °C</td>
        <td>${data.humidity} %</td>
        <td>${data.battery} %</td>
        <td>${data.status}</td>
    `;

    telemetryBody.prepend(row);

    while (telemetryBody.rows.length > 8) {
        telemetryBody.deleteRow(telemetryBody.rows.length - 1);
    }
}

async function fetchData() {
    try {
        const response = await fetch("/api/data");
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
setInterval(fetchData, 3000);