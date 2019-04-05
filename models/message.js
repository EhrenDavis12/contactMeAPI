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
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          len: {
            args: [0, 255],
            msg: "Name length is not in range of 0-255"
          }
        }
      },
      contactInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
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
