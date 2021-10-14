import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrder1623860560795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'order',
            new TableColumn({
                name: 'customer_id',
                type: 'uuid',
                isNullable: true, // permitir nulo para caso o cliente seja apagado, nao precisamos apagar a order
            }),
        );

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                name: 'OrdersCustomer',
                columnNames: ['customer_id'],
                referencedTableName: 'customer',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'order', 'OrdersCustomer'
        );
        await queryRunner.dropColumn(
            'order', 'customer_id'
        );
    }

}
