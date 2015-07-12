const URL_BASE = '/mock/responses/';

const MANIFEST = {
    'greeting.list': 'greetings/list.json'
};

export default function get(endpoint) {
    return URL_BASE + MANIFEST[endpoint];
}
