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
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  })

  TaskModel.associate = models => {
    TaskModel.belongsTo(models.Project, { foreignKey: {
      name: 'projectId',
      field: 'project_id'
    },
    as: 'project'})
  }

  return TaskModel
}
