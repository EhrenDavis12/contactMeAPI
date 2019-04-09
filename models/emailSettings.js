module.exports = function(sequelize, DataTypes) {
  var EmailSetting = sequelize.define(
    "emailSetting",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        isUUID: 4
      },
      email: {
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
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          len: {
            args: [0, 255],
            msg: "password length is not in range of 0-255"
          }
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  return Message;
};
