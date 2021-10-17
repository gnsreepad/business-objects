
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Risk {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface CreateContact {
    id: string;
    name: string;
    account: string;
    address: string;
    title: string;
    workPhone?: Nullable<string>;
    mobilePhone?: Nullable<string>;
    email?: Nullable<string>;
}

export interface UpdateContact {
    id: string;
    name: string;
    account: string;
    address: string;
    title: string;
    workPhone?: Nullable<string>;
    mobilePhone?: Nullable<string>;
    email?: Nullable<string>;
}

export interface CreateOpportunity {
    id: string;
    name: string;
    winPercentage?: Nullable<number>;
    account: string;
    primaryContact: string;
    closeDate?: Nullable<string>;
    estimatedRevenue?: Nullable<number>;
    riskLevel?: Nullable<Risk>;
}

export interface UpdateOpportunity {
    name: string;
    winPercentage?: Nullable<number>;
    account: string;
    primaryContact: string;
    closeDate?: Nullable<string>;
    estimatedRevenue?: Nullable<number>;
    riskLevel?: Nullable<Risk>;
}

export interface Contact {
    id: string;
    name: string;
    account: string;
    address: string;
    title: string;
    workPhone?: Nullable<string>;
    mobilePhone?: Nullable<string>;
    email?: Nullable<string>;
}

export interface IQuery {
    getContactByName(name: string): Nullable<Contact> | Promise<Nullable<Contact>>;
    getContactByEmail(email: string): Nullable<Contact> | Promise<Nullable<Contact>>;
    getOpportunityByName(name: string): Nullable<Opportunity> | Promise<Nullable<Opportunity>>;
    getOpportunityByAccount(account: string): Nullable<Opportunity> | Promise<Nullable<Opportunity>>;
}

export interface IMutation {
    createContact(createContactInput?: Nullable<CreateContact>): Contact | Promise<Contact>;
    updateContact(updateContactInput?: Nullable<UpdateContact>): Contact | Promise<Contact>;
    createOpportunity(createOpportunityInput: CreateOpportunity): Opportunity | Promise<Opportunity>;
    updateOpportunity(updateOpportunityInput: UpdateOpportunity): Opportunity | Promise<Opportunity>;
}

export interface Opportunity {
    id: string;
    name: string;
    winPercentage?: Nullable<string>;
    account: string;
    primaryContact: string;
    closeDate?: Nullable<string>;
    estimatedRevenue?: Nullable<string>;
    riskLevel?: Nullable<Risk>;
}

type Nullable<T> = T | null;
