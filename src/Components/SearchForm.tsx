import React, {Component, ComponentState} from 'react';
import {Alert, Button, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import Table from "./Table";
import DetailModal from "./DetailModal";
import {flushSync} from "react-dom";

interface Props {
}

interface State {
    distance: number;
    unit: string,
    sorting: string,
    partners: Array<any>,
    selectedPartner: Partner | null,
    openModal: boolean
}


class SearchForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            distance: 0,
            unit: 'K',
            sorting: 'a',
            partners: [],
            selectedPartner: null,
            openModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handLeDistanceState = this.handLeDistanceState.bind(this);
        this.getAllByDistance = this.getAllByDistance.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e: any) {
        this.setState({[e.target.name]: e.target.value} as ComponentState)
    }

    handLeDistanceState(e: any) {
        this.setState({
            distance: Number(e.target.value)
        })
    }

    handleClick(e: any) {
        this.getAllByDistance();
    }

    getAllByDistance() {
        const url = new URL(`${process.env.REACT_APP_API_BASE_URL}/partners/distances`);
        url.searchParams.append("distance", this.state.distance.toString());
        url.searchParams.append("unit", this.state.unit);

        fetch(url.href)
            .then(res => res.json())
            .then(
                (partners) => {
                    this.setState({
                        partners: partners
                    });

                },
                (error) => {
                    return this.setState({
                        partners: []
                    });
                }
            )
    }

    getUnitDescription(unit: string): string {
        const units: UnitType = {
            'K': 'Kilometer',
            'N': 'Mile'
        };

        return String(units[unit]);
    }

    handleOpenModal(partner: Partner) {
        this.setState({
            selectedPartner: partner,
            openModal: true
        })
    }

    handleCloseModal() {
        this.setState({
            selectedPartner: null,
            openModal: false
        })
    }

    render(): JSX.Element {
        const {partners, selectedPartner, openModal} = this.state;
        return (
            <>
                <Container className="mb-3">
                    <Form>
                        <Row>
                            <Col xs={8}>
                                <Form.Group className="mb-3" controlId="formPartners">
                                    <Form.Label>Distance</Form.Label>
                                    <Form.Control type="text" placeholder="Distance" name="distance"
                                                  onChange={this.handLeDistanceState}
                                                  defaultValue={this.state.distance}/>

                                    <Form.Text className="text-muted">
                                        You can type the distance in {this.getUnitDescription(this.state.unit)} to
                                        search
                                        partners
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col xs={4}>
                                <Form.Label>Distance Unit Type</Form.Label>
                                <DropdownButton title='Unit Type' onSelect={(unit) => {
                                    this.setState({
                                        unit: String(unit)
                                    })
                                }}>
                                    <Dropdown.Item eventKey='K'>Kilometer (KM)</Dropdown.Item>
                                    <Dropdown.Item eventKey='N'>Mile (N)</Dropdown.Item>
                                </DropdownButton>

                                <Form.Text className="text-muted">
                                    You can change the distance type
                                </Form.Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button variant="primary" type="button" onClick={this.handleClick}>
                                    Show Partners in {this.getUnitDescription(this.state.unit)}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>

                <Container className={partners.length > 0 ? "d-block" : "d-none"}>
                    <Alert variant="success">
                        You can see the nearest partner list by your search which is ordered by compnay name.<br/>
                        And in order to see the detail of the company, double click the row
                    </Alert>
                    <Row>
                        <Col>
                            <Table partners={partners} handleDoubleClick={(partner: Partner) => {
                                this.handleOpenModal(partner)
                            }}/>
                        </Col>
                    </Row>
                </Container>

                <DetailModal selectedPartner={selectedPartner} openModal={openModal} handleCloseModal={() => {
                    this.handleCloseModal();
                }}/>
            </>
        );
    }
}

export default SearchForm;
