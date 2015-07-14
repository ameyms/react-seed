const API_BASE = '/api/v1';

var MANIFEST = {
    'greeting.list': () => {
        return 'greetings';
    }
};

export default function(endpoint) {
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    return API_BASE + MANIFEST[endpoint].apply(MANIFEST, args);
}
