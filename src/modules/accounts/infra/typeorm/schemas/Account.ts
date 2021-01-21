import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm'

@Entity('accounts')
class Account {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    slug: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
export default Account;