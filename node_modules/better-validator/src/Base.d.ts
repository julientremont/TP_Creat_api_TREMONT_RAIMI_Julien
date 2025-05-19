export interface IFailure {
    failed: string;
    path: (string | number)[];
    rule?: Rule;
    value: any;
}
export declare type Rule = (validator: any) => boolean | IFailure[];
export declare class Base {
    static hasValue(value: any, allowNull?: boolean): boolean;
    path: (string | number)[];
    protected tests: {
        name: string;
        rule: Rule;
    }[];
    constructor(path: string | (string | number)[] | null);
    display(path: string): this;
    required(): this;
    requiredWithNull(): this;
    isIncludedInArray(array?: any[]): this;
    isEqual(expected: any): this;
    notEqual(expected: any): this;
    if(predicate: (item: any) => boolean, validator: (validator: this) => void): this;
    satisfies(name: string, rule: Rule): this;
    check(rule: Rule): true | this | IFailure[];
    test(value: any): IFailure[];
}
