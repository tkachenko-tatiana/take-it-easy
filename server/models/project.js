export default (sequelize, DataTypes) => {
  const ProjectModel = sequelize.define('Project', {
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
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  })

  ProjectModel.associate = models => {
    ProjectModel.hasMany(models.Task, { foreignKey: {
      name: 'projectId',
      field: 'project_id'
    },
    as: 'project'})
    ProjectModel.belongsTo(models.User, { foreignKey: {
      name: 'ownerId',
      field: 'owner_id'
    },
    as: 'owner' })
  }

  return ProjectModel
}
