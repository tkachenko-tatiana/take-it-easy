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
    }
  })

  ProjectModel.associate = models => {
    ProjectModel.hasMany(models.Task)
    ProjectModel.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' })
  }

  return ProjectModel
}
