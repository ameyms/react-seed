/* @flow */

import $ from 'jquery';
import makeApiRequest from '../commons/ApiUrls';


var GreeterXhrApi = {
    list: () => {

        return $.ajax({
            url: makeApiRequest('greeting.list')
        });

    }
};

export default GreeterXhrApi;
