import React, {Component} from 'react';
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import MapChart from "./MapChart";


interface Props {
    selectedPartner: Partner | null,
    openModal: boolean,
    handleCloseModal: any
}

interface State {
    show: boolean,
    partner: Partner | null,
}

class DetailModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            partner: null
        };
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.state.show !== nextProps.openModal) {
            this.setState({
                show: nextProps.openModal,
                partner: nextProps.selectedPartner
            });
        }
    }

    render(): JSX.Element {
        {
            const {show, partner} = this.state;
            const handleClose = () => {
                this.setState({show: false});
                this.props.handleCloseModal();
            }

            return (
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        keyboard={true}
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Detail of {partner?.organization}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Name</InputGroup.Text>
                                    <FormControl value={partner?.organization} readOnly/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Locations</InputGroup.Text>
                                    <FormControl value={partner?.customerLocations} readOnly/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Will Work Remotely?</InputGroup.Text>
                                    <FormControl value={partner?.willWorkRemotely ? 'Yes' : 'No'} readOnly/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Website</InputGroup.Text>
                                    <FormControl value={partner?.website} readOnly/>
                                    <Button variant="outline-secondary" id="btnVisit" onClick={() => {
                                        window.open(partner?.website, '_blank');
                                    }}>
                                        Visit
                                    </Button>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Services</InputGroup.Text>
                                    <FormControl value={partner?.services} readOnly/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Office Count</InputGroup.Text>
                                    <FormControl value={partner?.offices.length} readOnly/>
                                </InputGroup>

                                <table className="minimalistBlack">
                                    <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Address</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        partner?.offices.map((office: Office) => {
                                            const [lat, long] = office.coordinates.split(',')
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{office.location}</td>
                                                        <td>{office.address}</td>
                                                        <td>{lat}</td>
                                                        <td>{long}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>

                                <MapChart markers={null} partner={partner}/>

                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
    }
}

export default DetailModal;
