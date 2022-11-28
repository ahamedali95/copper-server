import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import UserProfile from "./UserProfileEntity";

@Entity({ name: "user" })
class UserEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    private id: number;

    @Column({ name: "email" })
    private email: string;

    @Column({ name: "password" })
    private password: string;

    @OneToOne(() => UserProfile, (userProfile) => userProfile._user, { eager: true, cascade: true })
    @JoinColumn({ name: "profileId" })
    private profile: UserProfile | null;

    constructor() {}

    get _id(): number {
        return this.id;
    }

    get _email(): string {
        return this.email;
    }

    set _email(value: string) {
        this.email = value;
    }

    get _password(): string {
        return this.password;
    }

    set _password(value: string) {
        this.password = value;
    }

    get _profile(): UserProfile | null {
        return this.profile;
    }

    set _profile(value: UserProfile | null) {
        this.profile = value;
    }
}

export default UserEntity;