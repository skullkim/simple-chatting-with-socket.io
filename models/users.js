const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nick: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}