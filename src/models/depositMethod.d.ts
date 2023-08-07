export interface DepositMethodObject {
    id: number;
    name: string;
    icon: string;
    libraryTimeToFund: string;
    caption: string;
    pretend: boolean;
    provider: string;
    fields: {
        address_type:{
            name:string;
            type:string;
        };
    };
    tradersRoomCurrencies: [
        {
            min: {
                value: string;
                scale: number;
            };
            max: {
                value: string;
                scale: number;
            };
            icon: string;
            caption: string;
            keyCaption: string;
            currency: {
                alphabeticCode: string;
                minorUnit: number;
                name: string;
                numericCode: number;
            };
        }
    ];
    paymentSystemCurrencies: [
        {
            min: {
                value: string;
                scale: number;
            };
            max: {
                value: string;
                scale: number;
            };
            icon: string;
            caption: string;
            keyCaption: string;
            currency: {
                alphabeticCode: string;
                minorUnit: number;
                name: string;
                numericCode: number;
            };
        }
    ];
    vendorCommissions: [
        {
            percent: number;
            min: number;
            max: number;
            fix: number;
            type: string;
            numericCode: number;
        }
    ];
    providerCommissions: [
        {
            percent: number;
            min: number;
            max: number;
            fix: number;
            type: string;
            numericCode: number;
        }
    ];
    hideAmount: boolean;
    hideProceed: boolean;
    description: string;
    groups: [
        {
            id: number;
            description: string;
            caption: string;
            name: string;
            icon: string;
        }
    ];
}