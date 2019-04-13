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
        allowNull: true,
        defaultValue: null,
        validate: {
          len: {
            args: [0, 255],
            msg: "email length is not in range of 0-255"
          }
        }
      },
      phone: {
        type: DataTypes.STRING(20),
        validate: {
          validatePhone: function(value) {
            if (
              !/^(13|14|15|17|18)\d{9}$/i.test(value) &&
              !/^((\(\d{2,3}\))|(\d{3}\-)|(\d{3}))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(
                value
              )
            ) {
              throw new Error("phone format error!");
            }
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

    User.hasMany(models.emailSetting, {
      onDelete: "cascade",
      hooks: true,
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
};
