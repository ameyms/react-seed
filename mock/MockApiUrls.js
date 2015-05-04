var URL_BASE = '/mock/responses/';

var MANIFEST = {
    'greeting.list': 'greetings/list.json'
};

module.exports = {
    get: function(endpoint) {
        return URL_BASE + MANIFEST[endpoint];
    }
};
