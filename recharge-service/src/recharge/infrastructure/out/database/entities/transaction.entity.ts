import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm';

/**
 * Represents a recharge record in the database.
 */
@Entity({ name: 'transaction' })
export class TransactionEntity {

    @PrimaryColumn('uuid')
    id!: string;

    @Column({ name: 'user_id', nullable: false })
    userId!: string;

    @Column({ name: 'phone_number', length: 20, nullable: false })
    phoneNumber!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount!: number;

    @Column({ type: 'varchar', length: 20 })
    status!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column({ name: 'response_provider', nullable: true })
    responseProvider!: string;
}
