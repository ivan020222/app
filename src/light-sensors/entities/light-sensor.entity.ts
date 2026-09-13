import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('light-sensors')
export class LightSensor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        type: 'timestamptz',
        nullable: true,
        default: () => 'NOW()',
    })
    timestamp: Date;
    @Column({
        type: 'varchar',
        length: 200,
    })
    sensorName: string;
    @Column({
        type: 'double precision',
    })
    value: number;
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    unit: string;
    @CreateDateColumn({
        type: 'timestamptz',
    })
    createdAt: Date;
}