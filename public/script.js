$(document).ready(() => {
    // Function to fetch and display transactions
    function fetchTransactions() {
        $.get('/api/transactions', (transactions) => {
            const transactionList = $('#transactionList');
            transactionList.empty();

            transactions.forEach((transaction) => {
                const transactionItem = `
                    <div>
                        <p>Type: ${transaction.type}</p>
                        <p>Description: ${transaction.description}</p>
                        <p>Amount: $${transaction.amount.toFixed(2)}</p>
                        <button onclick="editTransaction('${transaction._id}')">Edit</button>
                        <button onclick="deleteTransaction('${transaction._id}')">Delete</button>
                    </div>
                    <hr>
                `;
                transactionList.append(transactionItem);
            });
        });
    }

    // Function to add a new transaction
    window.addTransaction = function () {
        const type = $('#type').val();
        const description = $('#description').val();
        const amount = $('#amount').val();

        $.post('/api/transactions', { type, description, amount }, () => {
            fetchTransactions();
            // Clear form fields after adding a transaction
            $('#type').val('income');
            $('#description').val('');
            $('#amount').val('');
        });
    };

    // Function to edit a transaction
    window.editTransaction = function (id) {
        // Implement logic to handle editing a transaction
        // You can use a modal or redirect to another page for editing
        console.log('Edit transaction with ID:', id);
    };

    // Function to delete a transaction
    window.deleteTransaction = function (id) {
        $.ajax({
            url: `/api/transactions/${id}`,
            type: 'DELETE',
            success: () => {
                fetchTransactions();
            },
        });
    };

    // Initial fetch to display transactions
    fetchTransactions();
});
