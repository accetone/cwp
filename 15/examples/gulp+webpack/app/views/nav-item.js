import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div className={'nav__item' + (this.props.isActive ? ' nav__item_active' : '')} onClick={this._navigate}>
                {this.props.link.title}
            </div>
        );
    },

    _navigate: function () {
        this.props.navigate(this.props.link)
    }
});