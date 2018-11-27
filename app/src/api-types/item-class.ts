export interface ISubItemClass {
    subclass: number;
    name: string;
}

export interface IItemClass {
    class: number;
    name: string;
    subclasses: ISubItemClass[];
}
