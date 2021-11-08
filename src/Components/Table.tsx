import DataTable, {TableColumn} from 'react-data-table-component';
import React, {Component} from "react";

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Id',
        selector: row => row.id,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Locations',
        selector: row => row.location,
    },
    {
        name: 'Website',
        cell: row => (
            <a href={row.website} target="_blank" rel="noopener noreferrer">
                {row.website}
            </a>
        ),
    },
    {
        name: 'Office Count',
        selector: row => row.officeCount,
        sortable: true,
    }
];

interface Props {
    partners: Array<DataRow>,
    handleDoubleClick: any
}

interface State {
    selectedId: number
}

class MyComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedId: 0
        };
    }

    getDetail(id: number) {
        const url = `${process.env.REACT_APP_API_BASE_URL}/partners/${id}`;

        fetch(url)
            .then(res => res.json())
            .then(
                (partner: Partner) => {
                    this.props.handleDoubleClick(partner);
                }
            )
    }

    render(): JSX.Element {
        return <DataTable columns={columns} data={this.props.partners} highlightOnHover={true} theme="default"
                          onRowDoubleClicked={(row: DataRow) => {
                              this.getDetail(row.id)
                          }
                          }/>;
    }
}

export default MyComponent;
