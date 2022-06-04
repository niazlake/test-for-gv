import {recrecipientIds, userListDonate} from "./data";

export interface UserById {
    id: string,
    name: string,
    village: string,
    location: string,
    description: string,
    biggestHardship: string,
    moneyMeaning: string,
    happiestPart: string,
    age: number
}

export const getUsersList = (): Promise<{ code: number, data: string[] }> => {
    return new Promise((resolve) => {
        return resolve({
            code: 200,
            data: recrecipientIds,
        });
    });
};

export const getUserByIds = (userIds: string[] = []): Promise<{ code: number, data: UserById[] }> => {
    const usersMapped: UserById[] = [];
    userListDonate.forEach(value => {
        usersMapped[value.id] = {
            id: value.id,
            name: value.name,
            village: value.village,
            location: value.location,
            description: value.description,
            biggestHardship: value.biggest_hardship,
            moneyMeaning: value.money_meaning,
            happiestPart: value.happiest_part,
            age: value.age
        };
    })
    return new Promise((resolve) => {
        return resolve({
            code: 200,
            data: userIds.map(value => usersMapped[value]),
        });
    });
};