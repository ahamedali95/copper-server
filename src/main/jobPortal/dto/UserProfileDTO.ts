import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

abstract class UserProfileDTO {
    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    private firstName: string;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    private lastName: string;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    private occupation: string;

    @MaxLength(30)
    @IsString()
    @IsOptional()
    private company: string;

    @MaxLength(4)
    @IsString()
    @IsNotEmpty()
    private experience: string;

    @MaxLength(255)
    //@todo: fix this!
    // @IsUrl()
    @IsOptional()
    private twitterUrl: string;

    @MaxLength(255)
    // @IsUrl()
    @IsOptional()
    private githubUrl: string;

    @MaxLength(255)
    // @IsUrl()
    @IsOptional()
    private linkedInUrl: string;

    @MaxLength(10)
    @IsString()
    @IsNotEmpty()
    private dob: string;

    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    private phoneNumber: string;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    private city: string;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    private state: string;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    private country: string;

    @MaxLength(12)
    @IsString()
    @IsOptional()
    private postalCode: string;

    @MaxLength(140)
    @IsString()
    @IsOptional()
    private shortBio: string;

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

export default UserProfileDTO;