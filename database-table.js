// ============ DATABASE TABLE DATA ============
// Sourced from UAE_Skin_Microbiome_Mock_Database.xlsx
// Add new sample objects to this array to grow the dataset.
const dbSamples = [
    { id: "UAE-SMP-00001", bodySite: "Palm",    emirate: "Dubai",          gender: "F", nationality: "Indian",      staph: 23.4, coryne: 18.7, cuti: 12.1, micro: 6.3, other: 39.5 },
    { id: "UAE-SMP-00002", bodySite: "Finger",  emirate: "Abu Dhabi",      gender: "M", nationality: "Emirati",     staph: 19.8, coryne: 21.5, cuti: 9.4,  micro: 4.8, other: 44.5 },
    { id: "UAE-SMP-00003", bodySite: "Forearm", emirate: "Sharjah",        gender: "F", nationality: "Filipino",    staph: 16.2, coryne: 17.9, cuti: 6.8,  micro: 7.1, other: 52.0 },
    { id: "UAE-SMP-00004", bodySite: "Palm",    emirate: "Ajman",          gender: "M", nationality: "Pakistani",   staph: 20.1, coryne: 19.2, cuti: 11.2, micro: 5.5, other: 44.0 },
    { id: "UAE-SMP-00005", bodySite: "Finger",  emirate: "Ras Al Khaimah", gender: "F", nationality: "Egyptian",    staph: 18.6, coryne: 16.3, cuti: 8.1,  micro: 6.9, other: 50.1 },
    { id: "UAE-SMP-00006", bodySite: "Forearm", emirate: "Fujairah",       gender: "M", nationality: "British",     staph: 17.4, coryne: 20.1, cuti: 7.3,  micro: 4.2, other: 51.0 },
    { id: "UAE-SMP-00007", bodySite: "Palm",    emirate: "Umm Al Quwain",  gender: "F", nationality: "Sri Lankan",  staph: 21.7, coryne: 18.3, cuti: 10.5, micro: 6.1, other: 43.4 },
    { id: "UAE-SMP-00008", bodySite: "Finger",  emirate: "Dubai",          gender: "M", nationality: "Jordanian",   staph: 22.0, coryne: 17.8, cuti: 9.9,  micro: 5.8, other: 44.5 },
    { id: "UAE-SMP-00009", bodySite: "Forearm", emirate: "Abu Dhabi",      gender: "F", nationality: "Nepalese",    staph: 15.9, coryne: 19.4, cuti: 8.7,  micro: 6.0, other: 50.0 },
    { id: "UAE-SMP-00010", bodySite: "Palm",    emirate: "Sharjah",        gender: "M", nationality: "Bangladeshi", staph: 24.3, coryne: 17.2, cuti: 11.4, micro: 5.9, other: 41.2 },
];

const DB_ROWS_PER_PAGE = 5;
let dbCurrentPage = 1;

function renderDbTable(page) {
    const tbody = document.getElementById("db-table-body");
    const summary = document.getElementById("db-pagination-summary");
    if (!tbody) return;

    const totalRows = dbSamples.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / DB_ROWS_PER_PAGE));
    dbCurrentPage = Math.min(Math.max(1, page), totalPages);

    const start = (dbCurrentPage - 1) * DB_ROWS_PER_PAGE;
    const end = Math.min(start + DB_ROWS_PER_PAGE, totalRows);
    const pageRows = dbSamples.slice(start, end);

    tbody.innerHTML = pageRows.map(row => `
        <tr>
            <td>${row.id}</td>
            <td>${row.bodySite}</td>
            <td>${row.emirate}</td>
            <td>${row.gender}</td>
            <td>${row.nationality}</td>
            <td>${row.staph.toFixed(1)}</td>
            <td>${row.coryne.toFixed(1)}</td>
            <td>${row.cuti.toFixed(1)}</td>
            <td>${row.micro.toFixed(1)}</td>
            <td>${row.other.toFixed(1)}</td>
        </tr>
    `).join("");

    if (summary) {
        summary.textContent = `Showing ${start + 1} to ${end} of ${totalRows} samples`;
    }

    renderDbPagination(totalPages);
}

function renderDbPagination(totalPages) {
    const controls = document.getElementById("db-pagination-controls");
    if (!controls) return;

    let html = `<button ${dbCurrentPage === 1 ? "disabled" : ""} data-page="${dbCurrentPage - 1}">&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === dbCurrentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }

    html += `<button ${dbCurrentPage === totalPages ? "disabled" : ""} data-page="${dbCurrentPage + 1}">&gt;</button>`;

    controls.innerHTML = html;

    controls.querySelectorAll("button[data-page]").forEach(btn => {
        btn.addEventListener("click", () => renderDbTable(Number(btn.dataset.page)));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderDbTable(1);
});
