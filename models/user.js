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
      auth0_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "auth0_id length is not in range of 1-255"
          }
        }
      }
    },
    {
      freezeTableName: true,
      underscored: true
    }
  );

  User.associate = function(models) {
    User.hasMany(models.message, {
      as: "user_uuid"
    });
  };

  return User;
};
