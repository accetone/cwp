module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const UserRole = require('../models/userRole')(Sequelize, sequelize);
    const Post = require('../models/post')(Sequelize, sequelize);

    // User <-> Role
    User.belongsToMany(Role,
        { through: UserRole });

    Role.belongsToMany(User,
        { through: UserRole });

    // Post -> User
    Post.belongsTo(User);
    User.hasMany(Post);

    return {
        user: User,
        role: Role,
        post: Post,

        sequelize: sequelize
    };
};