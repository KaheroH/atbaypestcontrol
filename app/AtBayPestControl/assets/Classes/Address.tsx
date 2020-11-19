interface addressProps {
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string
}

export default class Address implements addressProps{
    id: string = "";
    address: string = "";
    city: string = "";
    state: string = "";
    zip: string = "";

    constructor(id: string = "0", address: string = "123 Fake st.",
                city: string = "RealCity", state: string = "Realington", zip: string = "12345") {
        this.id = id;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    getAddress = () => {
        return this.address;
    }

    getCity = () => {
        return this.city;
    }

    getState = () => {
        return this.state;
    }

    getZip = () => {
        return this.zip;
    }

}