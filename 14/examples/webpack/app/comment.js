import React from 'react';

const Comment = function (props) {
    return <div>
        <b>{props.author}:</b> {props.text}
    </div>;
};

export default Comment;