const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      /*
      //Sequelize에서는 아래의 id 설정이 생략가능 (자동생성)
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      */
      name: {
        //VARCHAR
        type: Sequelize.STRING(20),
        //NOTNULL
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        //TINYINT
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        //좌측 SQL, 우측 Sequelize
        //DATETIME = DATE, DATE = DATEONLY
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      //timestamps true시 createdAt, updatedAt 컬럼이 자동으로 추가됨
      //이번예제에서는 false로 놓고 created_at을 직접 구현
      timestamps: false,
      //underscored가 true일 경우 createdAt이나 updatedAt같이
      //sequelize가 자동으로 생성하는 컬럼들의 표기가 created_at로 바뀜
      underscored: false,
      //모델명 = sequelize에서 사용하는 모델명
      modelName: 'User',
      //tableName = SQL에서 사용하는 table명
      tableName: 'users',
      //paranoid true시 deleteAt 추가 //soft delete기능
      paranoid: false,
      //utf8mb4, utf8_general_ci 사용시 이모티콘도 사용가능
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  //관계 설정
  static associate(db) {
    //user와 comment간 1:N 관계
    //user의 foreignKey인 Comment 테이블의 commenter가 user의 id를 참조
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};

module.exports = User;

