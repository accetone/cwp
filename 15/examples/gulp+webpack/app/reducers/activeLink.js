import NavConstants from '../constants/nav';

export default function(state = {}, action) {
    switch (action.type) {
        case NavConstants.NAV_ACTIVATE:
            return action.link;

        default:
            return state;
    }
};