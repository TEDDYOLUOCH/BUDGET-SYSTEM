// Initialize transactions from localStorage or use an empty array if none exist
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
// script.js

// Example data (replace with actual dynamic data)
let transactions = [
    { type: "income", amount: 2000 },
    { type: "expense", amount: 500 },
    { type: "expense", amount: 300 },
];

// Calculate totals
function calculateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    // Update the DOM
    document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    document.getElementById("totalExpense").textContent = totalExpense.toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", calculateTotals);

// Simulate admin check - replace with your actual login/authentication logic
let isAdmin = false; // Set to `true` for admin, `false` for regular user

// Initialize the page when it loads
document.addEventListener("DOMContentLoaded", () => {
    loadTransactions(); // Display transactions
    updateBalance(); // Update balance display
});

// Add Transaction function
function addTransaction() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // Validate inputs
    if (!description) {
        alert("Please enter a description.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Create a transaction object
    const transaction = { description, amount, type };

    // Add transaction to the array and save to localStorage
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update UI
    loadTransactions();
    updateBalance();
    clearForm();
}

// Delete Transaction function
function deleteTransaction(index) {
    // Remove transaction from array
    transactions.splice(index, 1);
    
    // Update localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update UI
    loadTransactions();
    updateBalance();
}

// Load transactions and update the table
function loadTransactions() {
    const transactionTable = document.getElementById('transactionTable');
    transactionTable.innerHTML = ''; // Clear the table

    if (transactions.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No transactions found</td>';
        transactionTable.appendChild(row);
        return;
    }

    // Loop through transactions and display each row
    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>
                <!-- Show delete button only for admin users -->
                <button onclick="deleteTransaction(${index})" style="display: ${isAdmin ? 'inline-block' : 'none'};">Delete</button>
            </td>
        `;
        transactionTable.appendChild(row);
    });
}

// Update the balance based on income and expenses
function updateBalance() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Update the balance display on the page
    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Clear the form after submitting a transaction
function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}

// Example of a simple role-based check to display the delete button for admins
// In a real application, this should be done based on the actual authentication logic
function checkAdminStatus() {
    // Set `isAdmin = true` if the user is an admin, `false` otherwise
    // Example: check a cookie or a session value to determine admin status
    isAdmin = true; // Set to `false` for regular users
}

// Call the function to check admin status
checkAdminStatus();
