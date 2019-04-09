module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "user",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        isUUID: 4
      },
      auth0Id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "auth0_id length is not in range of 1-255"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null,
        validate: {
          len: {
            args: [0, 255],
            msg: "Name length is not in range of 0-255"
          }
        }
      }
    },
    {
      freezeTableName: true
      //underscored: true
    }
  );

  User.associate = function(models) {
    User.hasMany(models.message, {
      //as: "user_uuid",
      //underscored: true,
      onDelete: "cascade",
      hooks: true,
      foreignKey: {
        allowNull: false
      }
    });

    User.hasOne(models.emailSettings, {
      onDelete: "cascade",
      hooks: true,
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
};
