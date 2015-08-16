const API_BASE = '/api/v1';

var MANIFEST = {
    'greeting.list': () => {
        return 'greetings';
    }
};

export default function(endpoint) {
    let args = Array.prototype.slice.call(arguments, 1, arguments.length);
    let relUri = MANIFEST[endpoint].apply(MANIFEST, args);
    return `${API_BASE}/${relUri}`;
}
