import makeApiRequest from '../commons/ApiUrls';
import * as $ from 'jquery';

export function list() {

    return $.ajax({
        url: makeApiRequest('greeting.list')
    });
}
