import { Cloud } from "@/types/types";
import { dummyCloudData } from "./dummyCloudData";

export const storageKey = 'myCloudDataKey';

export const loadCloudStorageData = ():Cloud[] => {
    
    const storedData = localStorage.getItem(storageKey);
    
    if (storedData) return JSON.parse(storedData);
    else {

        localStorage.setItem(storageKey, JSON.stringify(dummyCloudData));

        return dummyCloudData;
    }
}