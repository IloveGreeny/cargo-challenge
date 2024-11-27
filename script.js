const cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26"
    }
];

const statusColors = {
    "Ожидает отправки": "text-warning",
    "В пути": "text-primary",
    "Доставлено": "text-success"
};

let filteredCargoList = [...cargoList];

const cargoTableBody = $("#cargoTableBody");
const cargoForm = $("#cargoForm");

function renderCargoList() {
    cargoTableBody.empty();

    filteredCargoList.forEach((cargo, index) => {
        const row = $(`
            <tr>
                <td>${index + 1}</td>
                <td>${cargo.name}</td>
                <td class="${statusColors[cargo.status]}">${cargo.status}</td>
                <td>${cargo.origin}</td>
                <td>${cargo.destination}</td>
                <td>${cargo.departureDate}</td>
                <td>
                    <select class="form-select form-select-sm" 
                        onchange="changeStatus(${index}, this.value)">
                        <option ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
                        <option ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
                        <option ${cargo.status === "Доставлено" ? "selected" : ""}>Доставлено</option>
                    </select>
                </td>
            </tr>
        `);
        cargoTableBody.append(row);
    });
}

function changeStatus(index, newStatus) {
    const cargo = filteredCargoList[index];

    if (cargo.status === "Доставлено" && newStatus !== "Доставлено") {
        alert("Error: Cannot change the status of a delivered cargo!");
        return;
    }

    cargo.status = newStatus;
    renderCargoList();
}

cargoForm.on("submit", (e) => {
    e.preventDefault();

    const name = $("#cargoName").val().trim();
    const origin = $("#origin").val().trim();
    const destination = $("#destination").val().trim();
    const departureDate = $("#departureDate").val().trim();
    const status = $("#status").val();

    if (!name || !origin || !destination || !departureDate) {
        alert("All fields are required!");
        return;
    }

    const newCargo = {
        id: `CARGO${String(cargoList.length + 1).padStart(3, "0")}`,
        name,
        status,
        origin,
        destination,
        departureDate
    };

    cargoList.push(newCargo);
    filteredCargoList.push(newCargo);

    cargoForm[0].reset();
    renderCargoList();
});

function filterByStatus(status) {
    filteredCargoList = status === "All"
        ? [...cargoList]
        : cargoList.filter(cargo => cargo.status === status);

    renderCargoList();
}

$("#statusColumn").on("click", function () {
    const selectedStatus = prompt("Enter status to filter by (Ожидает отправки, В пути, Доставлено, or All):");

    if (selectedStatus) {
        filterByStatus(selectedStatus.trim());
    }
});

renderCargoList();




