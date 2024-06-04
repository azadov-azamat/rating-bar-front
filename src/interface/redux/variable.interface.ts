export interface InitialStateProps {
    loading: boolean,
    user: UserDataProps | null
}

export interface RateDataProps {
    rate: string;
    comment: string;
    userId: string;
}

export interface UserDataProps {
    averageRate: string | number;
    email: string;
    id: string;
    img: string;
    name: string;
    position: string;
    rates: any;
    role: string;
}