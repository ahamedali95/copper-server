import {Container, inject, injectable, unmanaged} from "inversify";
// import UserRepository from "../repository/UserRepository";
import UserEntity from "../entity/UserEntity";
import UserRepository from "../repository/UserRepository";
import AuthService from "../service/AuthService";
import {AuthResource} from "../resource/AuthResource";


export interface Warrior {
    fight(): string;
    sneak(): string;
}

export interface Weapon {
    hit(): string;
}

export interface ThrowableWeapon {
    throw(): string;
}

export const TYPES = {
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon"),
    ThrowableWeapon: Symbol.for("ThrowableWeapon"),
    IUserRepository: Symbol.for("IUserRepository"),
    Simple: Symbol.for("Simple"),
    UserEntity: Symbol.for("UserEntity"),
};

@injectable()
abstract class  P {
    protected s: string;
    protected k: string;
    constructor(s: string, k = "ss") {
        this.s = s;
        this.k = k;
    }

}
@injectable()
class Katana extends P implements Weapon {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}


@injectable()
class Ninja implements Warrior {

    private _katana: Weapon;
    private _shuriken: ThrowableWeapon;

    public constructor(
        @inject(TYPES.Weapon) katana: Weapon,
        @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); }
    public sneak() { return this._shuriken.throw(); }

}

@injectable()
export class Simple extends P {
    private _katana: Weapon;
    

    public constructor(
        @inject(TYPES.Weapon) katana: Weapon,

    ) {
        super("d", "s")
        this._katana = katana;

    }
}

@injectable()
export class Composed {
    simple: Simple;

    // ERROR: Module parse failed: Unexpected character '@'
    // constructor(@inject simple: Simple) {
    //  this.simple = simple;
    // }

    // Error: Missing required @inject or @multiInject annotation in: argument 0 in class Composed.
    constructor(@inject(Simple) simple: Simple) {
        this.simple = simple;
    }
}

const container = new Container();

const BaseId = "Base";

@injectable()
class Base {
    public prop: string;
    public constructor(@unmanaged() arg: string) {
        this.prop = arg;
    }
}

@injectable()
class Derived extends Base {
    public constructor() {
        super("unmanaged-injected-value");
    }
}

// const BaseRepoId = "BaseRepoId";
//
// @injectable()
// abstract class BaseRepository {
//     protected dbConnection: string;
//     protected repositoryManager: string
//     protected repositoryType: 'rdbms' | 'nosql';
//
//     constructor(@unmanaged() model: string, @unmanaged() dbConnection: string, @unmanaged()repositoryType: 'rdbms' | 'nosql' = "rdbms") {
//         this.dbConnection = dbConnection;
//         this.repositoryType = repositoryType;
//         this.repositoryManager = "s"
//     }
//
//
// }
//
// interface O {
//
// }
//
// @injectable()
// class UserRepository extends BaseRepository implements O {
//     constructor() {
//         super("entity","somestring");
//     }
//
//
// }


const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
myContainer.bind(UserRepository).toSelf();
myContainer.bind(Ninja).toSelf();
myContainer.bind("Simple").to(Simple).inSingletonScope()

myContainer.bind(Composed).toSelf();

myContainer.bind(BaseId).to(Derived);
let derived = myContainer.get<Base>(BaseId);
console.log(derived)
myContainer.bind("BaseRepoId").to(UserRepository)
myContainer.bind("repository").to(UserRepository);
myContainer.bind("authService").to(AuthService);
myContainer.bind("authResource").to(AuthResource);

console.log(myContainer.get("repository"))
// console.log(myContainer.get("Simple"));



export { myContainer };
