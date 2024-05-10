'use strict';

const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('users', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      email_verified: { type: DataTypes.DATE },
      image: { type: DataTypes.STRING },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table User Has Created');

    await queryInterface.createTable('accounts', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      type: { type: DataTypes.STRING, allowNull: false },
      provider: { type: DataTypes.STRING, allowNull: false },
      provider_account_id: { type: DataTypes.STRING, allowNull: false },
      refresh_token: { type: DataTypes.STRING },
      access_token: { type: DataTypes.STRING },
      expires_at: { type: DataTypes.INTEGER },
      token_type: { type: DataTypes.STRING },
      scope: { type: DataTypes.STRING },
      id_token: { type: DataTypes.TEXT },
      session_state: { type: DataTypes.STRING },
      user_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table Account Has Created');

    await queryInterface.createTable('sessions', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      expires: { type: DataTypes.DATE, allowNull: false },
      session_token: { type: DataTypes.STRING, allowNull: false, unique: true },
      user_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table Session Has Created');

    await queryInterface.createTable('verification_tokens', {
      identifier: { type: DataTypes.CHAR(255), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      token: { type: DataTypes.CHAR(255), allowNull: false },
      expires: { type: DataTypes.DATE, allowNull: false },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table Verification_token Has Created');

    await queryInterface.createTable('services', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      url: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table Service Has Created');

    await queryInterface.createTable('trackers', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      url: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table Tracker Has Created');

    await queryInterface.createTable('advertisements', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: false, unique: true },
      city: { type: DataTypes.STRING, allowNull: true },
      price: { type: DataTypes.STRING, allowNull: true },
      tracker_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'trackers',
          key: 'id'
        }
      },
      service_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'services',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table Advertisement Has Created');

    await queryInterface.createTable('user_trackers', {
      id: { type: DataTypes.CHAR(36), defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      status: { type: DataTypes.BOOLEAN, allowNull: false },
      tracker_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'trackers',
          key: 'id'
        }
      },
      service_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'services',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.CHAR(36),
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW')
      }
    });
    console.log('Table User_Tracker Has Created');
  },

  async down(queryInterface) {
    await queryInterface.dropTable('advertisements');
    await queryInterface.dropTable('user_trackers');
    await queryInterface.dropTable('accounts');
    await queryInterface.dropTable('sessions');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('verification_tokens');
    await queryInterface.dropTable('services');
    await queryInterface.dropTable('trackers');
  }
};
