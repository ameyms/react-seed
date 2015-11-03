const API_BASE = '/api/v1';

var MANIFEST = {
    'greeting.list': () => {
        return 'greetings';
    }
};

export default function(endpoint) {
    const args = Array.prototype.slice.call(arguments, 1, arguments.length);
    const relUri = MANIFEST[endpoint](...args);
    return `${API_BASE}/${relUri}`;
}
