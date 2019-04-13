module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define(
    "message",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        isUUID: 4
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ContactMe Notification",
        validate: {
          len: {
            args: [1, 255],
            msg: "subject length is not in range of 0-255"
          }
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null
      }
    },
    {
      freezeTableName: true
      //underscored: true
    }
  );

  /* Message.associate = function(models) {
    Message.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      },
      //underscored: true
    });
  }; */

  return Message;
};
