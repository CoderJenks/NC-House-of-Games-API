const db = require('../db/connection.js');
const { checkExists } = require('../utils/utils.js');

exports.deleteCommentById = async (comment_id) => {
    if(comment_id){  
        await checkExists("comments","comment_id",comment_id)
    };


    return db.query(`
    DELETE FROM comments
     WHERE comment_id = $1;`,
    [comment_id]
    )
    .then(({rows}) => {
        return rows;     
    })
}