import * as hooks from './hooks/user'

export default (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(32),
      field: 'user_name',
      allowNull: false,
      set (val) {
        this.setDataValue('userName', val.toLowerCase())
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
    firstName: {
      type: DataTypes.STRING(32),
      field: 'first_name',
      allowNull: false,
      defaultValue: ''
    },
    lastName: {
      type: DataTypes.STRING(32),
      field: 'last_name',
      allowNull: false,
      defaultValue: ''
    },
    activationToken: {
      type: DataTypes.UUID,
      field: 'activation_token'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    hooks,
    indexes: [
      { unique: true, fields: ['user_name'] },
      { unique: true, fields: ['email'] }
    ]
  })

  UserModel.associate = models => {
    UserModel.hasMany(models.Project, { foreignKey: {
      name: 'ownerId',
      field: 'owner_id'
    },
    as: 'owner' })
  }

  return UserModel
}
