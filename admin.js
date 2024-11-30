// Admin Panel Script
document.addEventListener("DOMContentLoaded", loadTransactions);

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const tableBody = document.querySelector("#transactionTable tbody");

    // Clear current table content
    tableBody.innerHTML = "";

    // Populate table with transactions
    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>
                <button onclick="deleteTransaction(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    if (transactions.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No transactions available.</td></tr>`;
    }
}

function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    loadTransactions();
}

function clearAllTransactions() {
    if (confirm("Are you sure you want to clear all transactions?")) {
        localStorage.removeItem("transactions");
        loadTransactions();
    }
}
