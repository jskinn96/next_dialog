import { loadCloudStorageData, storageKey } from "@/data/localStorage";
import { Cloud } from "@/types/types";
import { create } from "zustand";

interface ICloudStore {
    
    // 상태
    cloudData: Cloud[];
    selectedRows: string[];
    isOpenModal: boolean;

    // 액션
    loadCloudData: () => void;
    setCloudData: (data: Cloud[]) => void;
    setSelectedRows: (data: string[]) => void;
    openModal: () => void;
    closeModal: () => void;
    addCloudData: (data: Cloud) => void;
}

export const useCloudStore = create<ICloudStore>((set, get) => ({

    // 상태
    // 클라우드 데이터
    cloudData: [],
    // 선택 열
    selectedRows: [],
    // 모달 열고 닫기
    isOpenModal: false,

    // 액션
    // 데이터 로드
    loadCloudData: () => {

        const data = loadCloudStorageData();

        set({ cloudData: data });
    },
    // 데이터 업데이트
    setCloudData: (data) => {

        localStorage.setItem(storageKey, JSON.stringify(data));

        set({ cloudData: data });
    },
    // 선택 열 업데이트
    setSelectedRows: (data) => {

        set({ selectedRows: data });
    },
    // 모달 열기
    openModal: () => {

        set({ isOpenModal: true });
    },
    // 모달 닫기
    closeModal: () => {

        set({ isOpenModal: false });
    },
    // 데이터 추가
    addCloudData: (data) => {

        const newData = {...data, id: `cloud-${Date.now()}`};
        const newCloudData = [newData, ...get().cloudData];

        localStorage.setItem(storageKey, JSON.stringify(newCloudData))

        set({ cloudData: newCloudData })
    }
}));