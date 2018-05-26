export const publicFields = ['id', 'email', 'first_name', 'last_name', 'user_name', 'created_at', 'updated_at']

export default (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    user_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      set (val) {
        this.setDataValue('user_name', val.toLowerCase())
      },
      validate: {
        required (value) {
          if (!value) {
            throw new Error('Username is required')
          }
        },
        isUniq (value) {
          return UserModel.find({ where: { user_name: value } }).then((user) => {
            if (user) {
              throw new Error('This username is already in use')
            }
          })
        },
        isContainSpaces (value) {
          if (/\s/g.test(value)) {
            throw new Error('Username cannot contain spaces')
          }
        }
      }
    },
    password: {
      type: DataTypes.CHAR(64),
      validate: {
        checkPassword (value) {
          if (!value) {
            return
          }

          const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

          if (!regExp.test(value)) {
            throw new Error('Password should have minimum 8 characters, with at least one of each: lowercase, uppercase, numbers')
          }
        }
      }
    },
    salt: DataTypes.CHAR(64),
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        required (value) {
          if (!value) {
            throw new Error('Email is required')
          }
        },
        isEmail: {
          msg: 'Invalid email format'
        },
        isUniq (value) {
          const currentUserId = this.get('id')
          return UserModel.find({ where: { email: value, id: { [sequelize.Op.ne]: currentUserId } } }).then((user) => {
            if (user) {
              throw new Error('This email is already in use')
            }
          })
        }
      }
    },
    first_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    last_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    activation_token: {
      type: DataTypes.UUID
    }
  }, {
    indexes: [
      { unique: true, fields: ['user_name'] },
      { unique: true, fields: ['email'] }
    ],
    defaultScope: {
      attributes: publicFields
    }
  })

  UserModel.associate = models => {
    UserModel.hasMany(models.Project)
  }

  return UserModel
}
