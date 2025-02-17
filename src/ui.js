import {addTransaction, deleteTransaction, displayTransactionDetails, transactions} from './transactions.js';
import {formatDate} from './utils.js';

export function initializeUI() {
	const form = document.getElementById('transactionForm');
	const table = document.getElementById('transactionsTable');

	if (Array.isArray(transactions) && transactions.length > 0) {
		transactions.forEach((transaction) => updateUI(transaction))
	}

	form.addEventListener('submit', handleFormSubmit);
	table.addEventListener('click', handleTableClick);
}

function handleFormSubmit(event) {
	event.preventDefault();

	const formData = {
		amount: document.getElementById('amount').value,
		category: document.getElementById('category').value,
		description: document.getElementById('description').value
	};

	if (validateForm(formData)) {
		addTransaction(formData);
		event.target.reset();
	}
}

function handleTableClick(event) {
	const target = event.target;

	if (target.classList.contains('delete-btn')) {
		const row = target.closest('tr');
		const id = row.dataset.id;
		deleteTransaction(id);
		row.remove();
	} else if (target.closest('tr')) {
		const row = target.closest('tr');
		const id = row.dataset.id;
		displayTransactionDetails(id);
	}
}

/**
 *
 * @param transaction
 */
export function updateUI(transaction) {
	const tbody = document.querySelector('#transactionsTable tbody');
	const row = document.createElement('tr');

	row.dataset.id = transaction.id;
	row.className = transaction.amount >= 0 ? 'transaction-positive' : 'transaction-negative';

	const shortDescription = transaction.description
		.split(' ')
		.slice(0, 4)
		.join(' ') + (transaction.description.split(' ').length > 4 ? '...' : '');

	row.innerHTML = `
        <td>${formatDate(transaction.date)}</td>
        <td>${transaction.category}</td>
        <td>${shortDescription}</td>
        <td>${transaction.amount} MDL</td>
        <td><button class="delete-btn">Удалить</button></td>
    `;

	tbody.appendChild(row);
}

function validateForm(formData) {
	if (!formData.amount || isNaN(formData.amount)) {
		alert('Пожалуйста, введите корректную сумму');
		return false;
	}

	if (!formData.category) {
		alert('Пожалуйста, выберите категорию');
		return false;
	}

	if (!formData.description.trim()) {
		alert('Пожалуйста, введите описание');
		return false;
	}

	return true;
}