const dbAccess = require('./db');
const uuid = require('uuid');

//
// best practice:
// 1. Separation of contexts.
// 

const User = function (user) {
    this.name = user.name;
    this.email = user.email;
}

User.findAll = (result) => {
    console.debug('user.model.option3.findAll -> load.');
    let sql = 'SELECT * FROM users ';

    dbAccess.query(sql, (error, data) => {
        if (error) {
            console.log('error: ', error);
            result({
                id: uuid.v1(),
                status: 'error',
                error: error.message,
            });
            return;
        }
        console.debug('user.model.option3.findAll.rowCount ->' + data.rowCount)
        result({
            id: uuid.v1(),
            status: 'sucesss',
            rows: data,
        });
    });
};

User.findById = (id, result) => {
    console.log('user.controller.option3.findById -> load');
    let sql = `SELECT *
               FROM users
               WHERE id = '${id}'`;

    dbAccess.query(sql, (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                id: uuid.v1(),
                status: 'error',
                error: error.message,
            });
            return;
        }

        if (data.length) {
            console.log('found user: ', data[0]);
            result({
                id: uuid.v1(),
                status: 'sucesss',
                rows: data[0],
            });
            return;
        }

        result({
            id: uuid.v1(),
            status: 'error',
            error: 'not found',
        });
    })

}

User.create = (user, result) => {
    console.log('user.controller.option3.create -> load');
    let sql = 'INSERT into users SET ?';

    dbAccess.query(sql, user, (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                id: uuid.v1(),
                status: 'error',
                error: error.message,
            });
            return;
        }

        console.error('user has been created');
        result({
            id: uuid.v1(),
            status: 'error',
            insertId: data.insertId,
            rows: data,
        });
    });
};

User.update = (id, user, result) => {
    console.log('user.controller.option3.update -> load');
    let sql = 'UPDATE users SET name=?, email=? where id=?';

    dbAccess.query(sql, [user.name, user.email, id], (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                id: uuid.v1(),
                status: 'error',
                error: error.message,
            });
            return;
        }

        if (data.affectedRows == 0) {
            result({
                id: uuid.v1(),
                status: 'error',
                error: 'not found',
            });
            return;
        }

        console.error('user has been updated');
        result({
            id: uuid.v1(),
            status: 'success',
            updatedId: id,
            rows: data,
        });
    });
}

User.remove = (id, result) => {
    console.log('user.controller.option3.remove -> load');
    let sql = 'DELETE FROM users WHERE id=?';

    dbAccess.query(sql, id, (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                id: uuid.v1(),
                status: 'error',
                error: error.message,
            });
            return;
        }

        if (data.affectedRows == 0) {
            result({
                id: uuid.v1(),
                status: 'error',
                error: 'not found',
            });
            return;
        }

        console.error('user has been deleted');
        result({
            id: uuid.v1(),
            status: 'error',
            deletedId: id,
            rows: data,
        });
    })

}

module.exports = User;
