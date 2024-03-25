import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table, Unique } from 'sequelize-typescript';

import Transaction from './Transaction.js';
import User from './User.js';

@Table
export default class Category extends Model {
    @Unique
    @AllowNull(false)
    @Column
    declare name: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    declare UserId: number;

    @HasMany(() => Transaction)
    declare Transactions: Transaction[];

    @BelongsTo(() => User)
    declare User: ReturnType<() => User>;
}
