import { AllowNull, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';

import Category from './Category.js';
import Shop from './Shop.js';
import Transaction from './Transaction.js';
import User from './User.js';

@DefaultScope(() => ({
    include: [
        {
            model: Transaction,
            include: [Category, Shop]
        }
    ]
}))
@Table
export default class OneoffTransaction extends Model {
    @AllowNull(false)
    @Column(DataType.DATEONLY)
    declare date: Date;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    declare UserId: number;

    @BelongsTo(() => Transaction)
    declare Transaction: ReturnType<() => Transaction>;

    @ForeignKey(() => Transaction)
    @Column
    declare TransactionId: number;

    @BelongsTo(() => User)
    declare User: ReturnType<() => User>;
}
