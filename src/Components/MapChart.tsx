import React, {Component} from "react";
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface Props {
    markers: Array<IMarker> | null,
    partner: Partner | null
}

interface State {
    markers: Array<IMarker> | null,
    partner: Partner | null
}


class MapChart extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            markers: null,
            partner: null
        }
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        const markers = [] as Array<IMarker>;

        props.partner?.offices.map((office: Office) => {
            const [lat, long] = office.coordinates.split(',');

            markers.push({
                locationName: office.location,
                coordinates: [Number(long), Number(lat)]
            })
        });

        return {
            partner: props.partner,
            markers: markers
        };
    }

    render() {
        const {markers, partner} = this.state;

        return (
            <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{
                    rotate: [0, 0, 0],
                    scale: 150
                }}
            >
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies
                            .map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#EAEAEC"
                                    stroke="#D6D6DA"
                                />
                            ))
                    }
                </Geographies>

                {markers?.map(({locationName, coordinates}) => (
                    <Marker key={locationName} coordinates={coordinates}>
                        <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2}/>
                        <text
                            textAnchor="middle"
                            y={15}
                            style={{fontFamily: "system-ui", fill: "#5D5A6D"}}
                        >
                            {locationName}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        );
    }
}

export default MapChart;
