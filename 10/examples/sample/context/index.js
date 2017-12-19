module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const Post = require('../models/post')(Sequelize, sequelize);

    // User <-> Role
    User.belongsToMany(Role, { through: 'userRoles' });
    Role.belongsToMany(User, { through: 'userRoles' });

    // Post -> User
    Post.belongsTo(User);
    User.hasMany(Post);

    return {
        users: User,
        roles: Role,
        posts: Post,

        sequelize,
        Sequelize,
    };
};