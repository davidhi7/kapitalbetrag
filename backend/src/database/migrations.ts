import { DataTypes } from 'sequelize';
import { Umzug } from 'umzug';

import sequelize from './db.js';

const umzug = new Umzug({
    migrations: [
        {
            name: '00-initial',
            async up({ context }) {},
            async down({ context }) {}
        },
        {
            name: '01-mandatory_UserIds',
            async up({ context }) {
                for (let tableName of ['Categories', 'Shops', 'OneoffTransactions', 'MonthlyTransactions']) {
                    await context.addConstraint(tableName, {
                        fields: ['UserId'],
                        type: 'unique',
                        name: `${tableName}_UserId_key`
                    });
                }
                await context.addConstraint('Transactions', {
                    fields: ['CategoryId'],
                    type: 'unique',
                    name: 'Transactions_CategoryId_key'
                });
                await context.addConstraint('Transactions', {
                    fields: ['ShopId'],
                    type: 'unique',
                    name: 'Transactions_ShopId_key'
                });
            },
            async down({ context }) {
                for (let tableName of ['Categories', 'Shops', 'OneoffTransactions', 'MonthlyTransactions']) {
                    await context.removeConstraint(tableName, `${tableName}_UserId_key`);
                }
                await context.removeConstraint('Transactions', 'Transactions_CategoryId_key');
                await context.removeConstraint('Transactions', 'Transactions_ShopId_key');
            }
        }
    ],
    context: sequelize.getQueryInterface(),
    logger: console
});
