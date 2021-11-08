interface DataRow {
    id: number;
    name: string;
    location: string;
    website: string,
    officeCount: number
}


interface UnitType {
    [key: string]: string;
}

interface IMarker {
    locationName: string,
    coordinates: [number, number]
}

interface Coordinate {
    lat: number,
    long: number
}

interface Office {
    location: string,
    address: string,
    coordinates: string,
    coordinate: Coordinate
}

interface Partner {
    id: number,
    urlName: string,
    organization: string,
    customerLocations: string,
    willWorkRemotely: boolean,
    website: string,
    services: string,
    offices: Array<Office>
}
