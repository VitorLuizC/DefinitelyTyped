import * as R from 'ramda';

() => {
    const getFromUser1: (p: "name") => 'Wilson Fisk' = R.prop(R.__, { name: 'Wilson Fisk' } as const);
    const getFromUser1Result1: 'Wilson Fisk' = getFromUser1('name');

    const getFromUser2 = R.prop(R.__, {});
    const getFromUser2Result1: any = getFromUser2('name');
    //=> "Argument of type '"name"' is not assignable to parameter of type 'never'."

    type User = { name?: string, createdAt?: Date };

    const getFromUser3 = R.prop<User>(R.__, {});
    const getFromUser3Result1: undefined | string = getFromUser3('name');
    const getFromUser3Result2: undefined | string = getFromUser3('createdAt');
    //=> "Argument of type '"createdAt"' is not assignable to parameter of type '"name"'."

    const getName: <T extends {name?: any}>(obj: T) => T['name'] = R.prop('name');

    const objectWithoutName = { createdAt: new Date() };

    const getNameResult1: 'bar' = getName({ name: 'bar' } as const);
    const getNameResult2: unknown = getName({});
    const getNameResult3: undefined | string = getName<{ createdAt?: Date, name?: string }>({});
    const getNameResult4: any = getName(objectWithoutName);
    //=> "Type '{ name: string; }' has no properties in common with type '{ name?: any; }'."

    const result1OfProp: undefined | Date = R.prop('createdAt', objectWithoutName);
    const result2OfProp: undefined | string = R.prop<'name', User>('name', objectWithoutName);

    const getCreatedAt: (obj: User) => undefined | Date = R.prop<'createdAt', User>('createdAt');

    const getCreatedAtResult1: undefined | Date = getCreatedAt(objectWithoutName);
    const getCreatedAtResult2: undefined | Date = getCreatedAt({});
    const getCreatedAtResult3: undefined | Date = getCreatedAt({ name: 'Matt Murdock' } as const);
};

