import type { Relation } from "typeorm"
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import UserEntity from "./UserEntity";

@Entity({ name: "userProfile" })
class UserProfileEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    private id: number;

    @Column({ name: "firstName", length: 30 })
    private firstName: string;

    @Column({ name: "lastName", length: 30 })
    private lastName: string;

    @Column({ name: "occupation", length: 30 })
    private occupation: string;

    @Column({ name: "company", length: 30, nullable: true })
    private company: string;

    @Column({ name: "experience", length: 4 })
    private experience: string;

    @Column({ name: "twitterUrl", nullable: true })
    private twitterUrl: string;

    @Column({ name: "githubUrl", nullable: true })
    private githubUrl: string;

    @Column({ name: "linkedInUrl", nullable: true })
    private linkedInUrl: string;

    @Column({ name: "dob", length: 10 })
    private dob: string;

    @Column({ name: "phoneNumber", length: 20 })
    private phoneNumber: string;

    @Column({ name: "city", length: 30 })
    private city: string;

    @Column({ name: "state", length: 30 })
    private state: string;

    @Column({ name: "country", length: 30 })
    private country: string;

    @Column({ name: "postalCode", length: 12, nullable: true })
    private postalCode: string;

    @Column({ name: "shortBio", length: 140, nullable: true })
    private shortBio: string;

    @OneToOne(() => UserEntity, (user) => user._profile, { onDelete: "CASCADE" })
    private user: Relation<UserEntity>;

    get _user() {
        return this.user;
    }

    set _user(value) {
        this.user = value;
    }

    get _id(): number {
        return this.id;
    }

    set _id(value: number) {
        this.id = value;
    }

    get _firstName(): string {
        return this.firstName;
    }

    set _firstName(value: string) {
        this.firstName = value;
    }

    get _lastName(): string {
        return this.lastName;
    }

    set _lastName(value: string) {
        this.lastName = value;
    }

    get _occupation(): string {
        return this.occupation;
    }

    set _occupation(value: string) {
        this.occupation = value;
    }

    get _company(): string {
        return this.company;
    }

    set _company(value: string) {
        this.company = value;
    }

    get _experience(): string {
        return this.experience;
    }

    set _experience(value: string) {
        this.experience = value;
    }

    get _twitterUrl(): string {
        return this.twitterUrl;
    }

    set _twitterUrl(value: string) {
        this.twitterUrl = value;
    }

    get _githubUrl(): string {
        return this.githubUrl;
    }

    set _githubUrl(value: string) {
        this.githubUrl = value;
    }

    get _linkedInUrl(): string {
        return this.linkedInUrl;
    }

    set _linkedInUrl(value: string) {
        this.linkedInUrl = value;
    }

    get _dob(): string {
        return this.dob;
    }

    set _dob(value: string) {
        this.dob = value;
    }

    get _phoneNumber(): string {
        return this.phoneNumber;
    }

    set _phoneNumber(value: string) {
        this.phoneNumber = value;
    }

    get _city(): string {
        return this.city;
    }

    set _city(value: string) {
        this.city = value;
    }

    get _state(): string {
        return this.state;
    }

    set _state(value: string) {
        this.state = value;
    }

    get _country(): string {
        return this.country;
    }

    set _country(value: string) {
        this.country = value;
    }

    get _postalCode(): string {
        return this.postalCode;
    }

    set _postalCode(value: string) {
        this.postalCode = value;
    }

    get _shortBio(): string {
        return this.shortBio;
    }

    set _shortBio(value: string) {
        this.shortBio = value;
    }
}

export default UserProfileEntity;



















