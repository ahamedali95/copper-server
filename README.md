- Oauth2
- TS Decorators 
- Bcrypt
- JWT
- Domain Driven design patterns
- Restful api(http verbs, headers, json api)
- local storage, session storage, cookie s

### Decorators

A special kind of declaration that  can be attached to:
1. class declaration
2. method,
3. accessor
4. property
5. parameter

Form: `@expression`
expression - a function that will be called at runtime with information about
the decorated declaration

Decorator factory: A closure to supply additional information to the expression:

example:
```ts
const config(value: string) {
    const expression = (target: string) => {
        
    };
    
    return expression;
}
```

###Oauth2
It is an **authorization protocol** that allows multiple web servers to communicate over the web securely.
Example: Let say I login to a banking application and this banking application also gives credit reports of their users.
In order to do this, it must fetch this information from a credit agency that offers web service. How does it do it?

Well, one easy way is to just redirect the user to the website and have the user register and login to see their credit reports.
That is not very good user experience, isn't? So we want the resource server(in this case the credit agency) to authorize
our client application(banking app) and delegate access to get the credit report on behalf of the user.

Roles:
1. Resource owner: It is the user who will grant access to some portion of their account. e.g., the actual user. 
2. Client application: Third party application that will get access on behalf of the user.
3. Authorization server: Place where resource owners store their credential resource and the place where users are authenticated.
4. Resource server: Place where the actual resource is stored.





























