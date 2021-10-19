
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
    name: string;
    account: string;
    address: string;
    title?: Nullable<string>;
    workPhone?: Nullable<string>;
    mobilePhone?: Nullable<string>;
    email: string;
}

export interface UpdateContact {
    name?: Nullable<string>;
    account?: Nullable<string>;
    address?: Nullable<string>;
    title?: Nullable<string>;
    workPhone?: Nullable<string>;
    mobilePhone?: Nullable<string>;
}

export interface CreateOpportunity {
    name: string;
    winPercentage?: Nullable<number>;
    account: string;
    primaryContact?: Nullable<string>;
    closeDate?: Nullable<string>;
    estimatedRevenue?: Nullable<string>;
    riskLevel?: Nullable<Risk>;
}

export interface UpdateOpportunity {
    name?: Nullable<string>;
    winPercentage?: Nullable<number>;
    primaryContact?: Nullable<string>;
    closeDate?: Nullable<string>;
    estimatedRevenue?: Nullable<string>;
    riskLevel?: Nullable<Risk>;
}

export interface Contact {
    id: string;
    name: string;
    account: string;
    address: string;
    title?: Nullable<string>;
    workPhone?: Nullable<string>;
    mobilePhone?: Nullable<string>;
    email: string;
}

export interface GetContact {
    contact?: Nullable<Contact>;
    opportunities?: Nullable<Nullable<Opportunity>[]>;
}

export interface IQuery {
    getContactByName(name: string): Nullable<GetContact> | Promise<Nullable<GetContact>>;
    getContactByEmail(email: string): Nullable<GetContact> | Promise<Nullable<GetContact>>;
    getOpportunityByName(name: string): Nullable<Opportunity> | Promise<Nullable<Opportunity>>;
    getOpportunityByAccount(account: string): Nullable<Opportunity> | Promise<Nullable<Opportunity>>;
}

export interface IMutation {
    createContact(createContactInput?: Nullable<CreateContact>): Contact | Promise<Contact>;
    updateContact(email: string, updateContactInput?: Nullable<UpdateContact>): Contact | Promise<Contact>;
    deleteContact(email: string): boolean | Promise<boolean>;
    createOpportunity(createOpportunityInput: CreateOpportunity): Opportunity | Promise<Opportunity>;
    updateOpportunity(account: string, updateOpportunityInput: UpdateOpportunity): Opportunity | Promise<Opportunity>;
    addContact(opportunityAccount: string, contactEmail: string): Opportunity | Promise<Opportunity>;
    addPrimaryContact(opportunityAccount: string, primaryContactEmail: string): Opportunity | Promise<Opportunity>;
    deleteOpportunity(opportunityAccount: string): boolean | Promise<boolean>;
}

export interface Opportunity {
    id: string;
    name: string;
    winPercentage?: Nullable<number>;
    account: string;
    primaryContact?: Nullable<string>;
    closeDate?: Nullable<string>;
    estimatedRevenue?: Nullable<string>;
    riskLevel?: Nullable<Risk>;
    contacts?: Nullable<Nullable<Contact>[]>;
}

type Nullable<T> = T | null;
