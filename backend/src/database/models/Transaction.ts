import { AllowNull, BelongsTo, Column, DataType, DefaultScope, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';

import Category from './Category.js';
import MonthlyTransaction from './MonthlyTransaction.js';
import OneoffTransaction from './OneoffTransaction.js';
import Shop from './Shop.js';

@DefaultScope(() => ({
    include: [Category, Shop]
}))
@Table
export default class Transaction extends Model {
    @AllowNull(false)
    @Column
    declare isExpense: boolean;

    @AllowNull(false)
    @Column
    get amount(): number {
        return Number(this.getDataValue('amount'));
    }

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare description: string;

    // associations
    @ForeignKey(() => Category)
    @AllowNull(false)
    @Column
    declare CategoryId: number;

    @BelongsTo(() => Category)
    declare Category: ReturnType<() => Category>;

    @ForeignKey(() => Shop)
    @AllowNull(false)
    @Column
    declare ShopId: number;

    @BelongsTo(() => Shop)
    declare Shop: ReturnType<() => Shop>;

    @HasOne(() => OneoffTransaction)
    declare OneoffTransaction: OneoffTransaction;

    @HasOne(() => MonthlyTransaction)
    declare MonthlyTransaction: MonthlyTransaction;
}
