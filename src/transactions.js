import {formatDate, generateId} from './utils.js';
import {updateUI} from './ui.js';

export let transactions = JSON.parse(localStorage.getItem('transactions') || "[]");

/**
 *
 * @param formData
 * @returns {{id: string, date: string, amount: number, category: "доход" | "расход" | "инвестиции", description: string}}
 */
export function addTransaction(formData) {
	const transaction = {
		id: generateId(),
		date: new Date().toISOString(),
		amount: parseFloat(formData.amount),
		category: formData.category,
		description: formData.description
	};

	transactions.push(transaction);
	localStorage.setItem('transactions', JSON.stringify(transactions));
	updateUI(transaction);
	calculateTotal();

	return transaction;
}

/**
 *
 * @param {string} id
 */
export function deleteTransaction(id) {
	transactions = transactions.filter(t => t.id !== id);
	localStorage.setItem('transactions', JSON.stringify(transactions));
	calculateTotal();
}

/**
 *
 * @param {string} id
 */
export function displayTransactionDetails(id) {
	const transaction = transactions.find(t => t.id === id);
	const detailsElement = document.getElementById('transactionDetails');

	if (transaction) {
		detailsElement.style.display = 'block';
		detailsElement.innerHTML = `
            <h3>Детали транзакции</h3>
            <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
            <p><strong>Категория:</strong> ${transaction.category}</p>
            <p><strong>Сумма:</strong> ${transaction.amount} MDL</p>
            <p><strong>Описание:</strong> ${transaction.description}</p>
        `;
	}
}

function calculateTotal() {
	const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
	document.getElementById('totalAmount').textContent = total.toFixed(2);
}