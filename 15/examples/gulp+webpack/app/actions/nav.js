import NavConstants from '../constants/nav';

export default {
    activate: function (link) {
        return {
            type: NavConstants.NAV_ACTIVATE,
            link: link
        };
    }
};