/**
 * @author VAMPETA
 * @brief SALVA A INSTANCIA DO Socket.IO
 * @param {Object} io INSTANCIA PRINCIPAL DO Socket.IO
*/
export function init(io) {
	this.io = io;
	this.configEvents();
}