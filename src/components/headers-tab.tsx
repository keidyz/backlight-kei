import { Table } from '@radix-ui/themes'

export function HeadersTab({ headers }: { headers: Record<string, string> }) {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Header Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Header Value
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {Object.entries(headers).map(([name, value]) => (
                    <Table.Row key={`${name}-${value}`}>
                        <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
                        <Table.Cell>{value}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
