/**
 *
 * @returns {string}
 */
export function generateId() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 *
 * @param {string | Date} date
 * @returns {string}
 */
export function formatDate(date) {
	return new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(date));
}