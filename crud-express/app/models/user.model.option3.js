const dbAccess = require('./db');

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
                status: 'error',
                error: error.message,
            });
            return;
        }
        console.debug('user.model.option3.findAll.rowCount ->' + data.rowCount)
        result({
            status: 'sucesss',
            rows: data.rows,
        });
    });
};

User.findById = (id, result) => {
    console.log('user.controller.option3.findById -> load');
    let sql = `SELECT * FROM users WHERE id = ${id}`;
    console.debug(sql);
    dbAccess.query(sql, (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                status: 'error',
                error: error.message,
            });
            return;
        }

        if (data.rowCount > 0) {
            console.debug('found user: ', data.rows);
            result({
                status: 'sucesss',
                rows: data.rows,
            });
            return;
        }

        result({
            status: 'error',
            error: 'not found',
        });
    })

}

User.create = (user, result) => {
    console.log('user.controller.option3.create -> load');
    let sql = 'INSERT INTO users(name, email) VALUES ($1,$2)';
    console.debug(sql);
    console.debug(user);
    dbAccess.query(sql, [user.name, user.email], (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                status: 'error',
                error: error.message,
            });
            return;
        }

        console.error('user has been created');
        result({
            status: 'error',
            affectedRows: data.rowCount,
        });
    });
};

User.update = (id, user, result) => {
    console.log('user.controller.option3.update -> load');
    let sql = 'UPDATE users SET name=$1, email=$2 where id=$3';
    console.debug(sql);
    console.debug(id);
    dbAccess.query(sql, [user.name, user.email, id], (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                status: 'error',
                error: error.message,
            });
            return;
        }

        if (data.rowCount === 0) {
            result({
                status: 'error',
                error: 'not found',
            });
            return;
        }

        console.error('user has been updated');
        result({
            status: 'success',
            updatedId: id,
            affectedRows: data.rowCount,
        });
    });
}

User.remove = (id, result) => {
    console.log('user.controller.option3.remove -> load');
    let sql = 'DELETE FROM users WHERE id=$1';
    console.debug(sql);
    console.debug(id);
    dbAccess.query(sql, id, (error, data) => {
        if (error) {
            console.log('error:', error);
            result({
                status: 'error',
                error: error.message,
            });
            return;
        }

        if (data.rowCount === 0) {
            result({
                id: uuid.v1(),
                status: 'error',
                error: 'not found',
            });
            return;
        }

        console.error('user has been deleted');
        result({
            status: 'error',
            deletedId: id,
            affectedRows: data.rowCount,
        });
    })

}

module.exports = User;
