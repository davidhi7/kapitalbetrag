import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table, Unique } from 'sequelize-typescript';

import Transaction from './Transaction.js';
import User from './User.js';

@Table
export default class Shop extends Model {
    @Unique
    @AllowNull(false)
    @Column
    declare name: string;

    @HasMany(() => Transaction)
    declare Transactions: Transaction[];

    @BelongsTo(() => User)
    declare User: ReturnType<() => User>;

    @ForeignKey(() => User)
    @Column
    declare UserId: number;
}
