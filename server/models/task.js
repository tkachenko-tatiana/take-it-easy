export default (sequelize, DataTypes) => {
  const TaskModel = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        required (value) {
          if (!value) {
            throw new Error('Title is required')
          }
        }
      }
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    }
  })

  TaskModel.associate = models => {
    TaskModel.belongsTo(models.Project)
  }

  return TaskModel
}
