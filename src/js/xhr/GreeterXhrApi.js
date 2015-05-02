var $ = require('jquery');
var ApiUrls = require('../commons/ApiUrls');

module.exports = {
    list: function() {

        return $.ajax({
            url: ApiUrls.get('greeting.list')
        });

    }
};
