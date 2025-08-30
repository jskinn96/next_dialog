import { loadCloudStorageData, storageKey } from "@/data/localStorage";
import { Cloud } from "@/types/types";
import { create } from "zustand";

interface ICloudStore {
    
    // 상태
    cloudData: Cloud[];
    selectedRows: string[];
    isOpenModal: boolean;
    editCloudData: Cloud | null;
    page: number;
    pageData: Cloud[];

    // 액션
    loadCloudData: () => void;
    setCloudData: (data: Cloud[]) => void;
    setSelectedRows: (data: string[]) => void;
    openModal: (data?: Cloud) => void;
    closeModal: () => void;
    addCloudData: (data: Cloud) => void;
    updateCloudData: (id: string, data: Cloud) => void;
    setPage: (p: number) => void;
    setPageData: (data: Cloud[]) => void;
}

export const useCloudStore = create<ICloudStore>((set, get) => ({

    // 상태
    // 클라우드 데이터
    cloudData: [],
    // 선택 열
    selectedRows: [],
    // 모달 열고 닫기
    isOpenModal: false,
    // 데이터 수정값
    editCloudData: null,
    // 현재 페이지
    page: 1,
    // 현재 페이지 클라우드 데이터
    pageData: [],

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
    openModal: (data) => {

        set({ isOpenModal: true, editCloudData: data });
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
    },
    // 데이터 수정
    updateCloudData: (id, data) => {

        const newData = {...data, id: id};
        const newCloudData = get().cloudData.map(cloud => 
            cloud.id === id ? newData : cloud
        );

        localStorage.setItem(storageKey, JSON.stringify(newCloudData))

        set({ cloudData: newCloudData })
    },
    // 페이지 설정
    setPage: (p) => {

        set({ page: p })
    },
    // 현재 페이지 클라우드 데이터 업데이트
    setPageData: (data) => {

        set({ pageData: data });
    }
}));