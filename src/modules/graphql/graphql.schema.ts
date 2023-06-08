
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Address {
    id: number;
    street?: Nullable<string>;
    number?: Nullable<string>;
    neighborhood?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    complement?: Nullable<string>;
    zip_code?: Nullable<string>;
}

export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    address?: Nullable<Address>;
    cpf?: Nullable<string>;
    photo?: Nullable<string>;
    phone: string;
}

export class Host {
    id: number;
    user: User;
    rating?: Nullable<number>;
    response_rating?: Nullable<number>;
    time_rating?: Nullable<number>;
}

export class Feature {
    id: number;
    name?: Nullable<string>;
}

export class Rule {
    id: number;
    name?: Nullable<string>;
}

export class Image {
    id: number;
    path?: Nullable<string>;
}

export class Details {
    id: number;
    size?: Nullable<string>;
    height?: Nullable<string>;
    width?: Nullable<string>;
    length?: Nullable<string>;
    parking_spots?: Nullable<boolean>;
    elevator?: Nullable<boolean>;
    freight_elevator?: Nullable<boolean>;
    stairs?: Nullable<boolean>;
    street_level?: Nullable<boolean>;
    wheelchair?: Nullable<boolean>;
    air_conditioning?: Nullable<boolean>;
    wifi?: Nullable<boolean>;
}

export class Place {
    id: number;
    host?: Nullable<Host>;
    rating?: Nullable<number>;
    title?: Nullable<string>;
    address?: Nullable<Address>;
    description?: Nullable<string>;
    value?: Nullable<number>;
    value_type?: Nullable<string>;
    minimum?: Nullable<string>;
    type?: Nullable<string>;
    features?: Nullable<Nullable<Feature>[]>;
    rules?: Nullable<Nullable<Rule>[]>;
    details?: Nullable<Details>;
    images?: Nullable<Nullable<Image>[]>;
}

export abstract class IQuery {
    abstract places(): Place[] | Promise<Place[]>;

    abstract place(id: number): Nullable<Place> | Promise<Nullable<Place>>;
}

type Nullable<T> = T | null;
