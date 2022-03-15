const todoModal = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Todo;
};

export default todoModal;
