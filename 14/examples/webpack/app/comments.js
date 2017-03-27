import React from 'react';
import Comment from './comment';

const Comments = function (props) {
    return <div>
        {props.comments.map(comment =>
            <Comment key={comment.id}
                 author={comment.author}
                 text={comment.text}/>
        )}
    </div>;
};

export default Comments;