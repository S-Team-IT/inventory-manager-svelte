export type product = {
    masterID: number;
    name: string;
    photoPaths: string[];
    quantity: number;
    category: {
        name: string;
    };
    isDisabled: boolean;
};
