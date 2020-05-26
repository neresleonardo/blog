import Sequelize, { Model } from 'sequelize';

class Post extends Model {
    static init(sequelize) {
        super.init({
            title: Sequelize.STRING,
            description: Sequelize.STRING
        },
        {
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'user'
        });

        this.belongsTo(models.File, {
            foreignKey: 'id_file',
            as: 'file'
        });
    }
}

export default Post;
