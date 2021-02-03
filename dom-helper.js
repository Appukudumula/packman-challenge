export class DOMHelper {
    constructor() {
    }
    message(msg) {
        document.getElementById('error').innerHTML = msg;
    }
    clearMessage() {
        document.getElementById('error').innerHTML = '';
    }
    handleEvents(cbFn) {
        document.getElementById('commandBtn').addEventListener('click', () => {
            this.clearMessage();
            cbFn.call(this, document.getElementById('command').value);
        });
    }
    clearInput() {
        document.getElementById('command').value = '';
    }
}