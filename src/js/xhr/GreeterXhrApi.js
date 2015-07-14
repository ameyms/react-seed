var $ = require('jquery');
var makeApiRequest = require('../commons/ApiUrls');


var GreeterXhrApi = {
    list: () => {

        return $.ajax({
            url: makeApiRequest('greeting.list')
        });
    }
};

export default GreeterXhrApi;
