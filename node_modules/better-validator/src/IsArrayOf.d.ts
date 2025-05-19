import { Base } from './Base';
export declare type ItemValidatorFactory = (path: (string | number)[]) => Base;
export declare class IsArrayOf extends Base {
    protected itemValidatorFactory: ItemValidatorFactory;
    protected itemValidatorName: string;
    constructor(path: (string | number)[], itemValidatorFactory: ItemValidatorFactory, itemValidatorName: string);
    length(expected: number): this;
    lengthInRange(lower: number | undefined, upper?: number | undefined): this;
    protected validateArray(): void;
}
