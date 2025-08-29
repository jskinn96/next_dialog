// 스케줄 주기 옵션
export const scheduleFrequencyOptions = [
    { value: 'HOUR', label: '매시간' },
    { value: 'DAY', label: '매일' },
    { value: 'WEEK', label: '매주' },
    { value: 'MONTH', label: '매월' },
] as const;

// 요일 옵션
export const weekdayOptions = [
    { value: 'MON', label: '월요일' },
    { value: 'TUE', label: '화요일' },
    { value: 'WED', label: '수요일' },
    { value: 'THU', label: '목요일' },
    { value: 'FRI', label: '금요일' },
    { value: 'SAT', label: '토요일' },
    { value: 'SUN', label: '일요일' },
] as const;

// 시간 옵션
export const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: String(i),
    label: `${String(i).padStart(2, '0')}시`,
}));

// 분 옵션
export const minuteOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i * 5),
    label: `${String(i * 5).padStart(2, '0')}분`,
}));

// 날짜 옵션
export const dateOptions = Array.from({ length: 28 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}일`,
}));

// AWS 리전 옵션
export const awsRegionOptions = [
    { value: 'global', label: 'Global', displayName: '글로벌' },
    { value: 'ap-northeast-1', label: 'AP Northeast 1', displayName: '아시아 태평양 (도쿄)' },
    { value: 'ap-northeast-2', label: 'AP Northeast 2', displayName: '아시아 태평양 (서울)' },
    { value: 'ap-northeast-3', label: 'AP Northeast 3', displayName: '아시아 태평양 (오사카)' },
    { value: 'ap-south-1', label: 'AP South 1', displayName: '아시아 태평양 (뭄바이)' },
    { value: 'ap-southeast-1', label: 'AP Southeast 1', displayName: '아시아 태평양 (싱가포르)' },
    { value: 'ap-southeast-2', label: 'AP Southeast 2', displayName: '아시아 태평양 (시드니)' },
    { value: 'ca-central-1', label: 'CA Central 1', displayName: '캐나다 (중부)' },
    { value: 'eu-central-1', label: 'EU Central 1', displayName: '유럽 (프랑크푸르트)' },
    { value: 'eu-north-1', label: 'EU North 1', displayName: '유럽 (스톡홀름)' },
    { value: 'eu-west-1', label: 'EU West 1', displayName: '유럽 (아일랜드)' },
    { value: 'eu-west-2', label: 'EU West 2', displayName: '유럽 (런던)' },
    { value: 'eu-west-3', label: 'EU West 3', displayName: '유럽 (파리)' },
    { value: 'sa-east-1', label: 'SA East 1', displayName: '남아메리카 (상파울루)' },
    { value: 'us-east-1', label: 'US East 1', displayName: '미국 동부 (버지니아)' },
    { value: 'us-east-2', label: 'US East 2', displayName: '미국 동부 (오하이오)' },
    { value: 'us-west-1', label: 'US West 1', displayName: '미국 서부 (캘리포니아)' },
    { value: 'us-west-2', label: 'US West 2', displayName: '미국 서부 (오레곤)' },
] as const;

// CredentialType 옵션
export const credentialTypeOptions = {
    AWS: [
        { value: 'ACCESS_KEY', label: 'Access Key', enabled: true },
        { value: 'ASSUME_ROLE', label: 'Assume Role', enabled: false },
        { value: 'ROLES_ANYWHERE', label: 'IAM Roles Anywhere', enabled: false },
    ],
    AZURE: [
        { value: 'APPLICATION', label: 'Application', enabled: false },
    ],
    GCP: [
        { value: 'JSON_TEXT', label: 'JSON Text', enabled: false },
    ],
} as const;

// provider 옵션
export const providerOptions = [
    { value: 'AWS', label: 'Amazon Web Services', enabled: true },
    { value: 'AZURE', label: 'Microsoft Azure', enabled: false },
    { value: 'GCP', label: 'Google Cloud Platform', enabled: false },
] as const;

// 스케줄 설정 레이블 생성 함수
export const getScheduleLabel = (setting: {
    frequency: string;
    date: string;
    weekday: string;
    hour: string;
    minute: string;
}): string => {

    const hour = setting.hour.padStart(2, '0');
    const minute = setting.minute.padStart(2, '0');
    
    switch (setting.frequency) {
        
        case 'HOUR':
            return `매시간 ${minute}분`;
        
        case 'DAY':
            return `매일 ${hour}:${minute}`;
        
        case 'WEEK':
            const weekday = weekdayOptions.find(w => w.value === setting.weekday)?.label || '';
            return `매주 ${weekday} ${hour}:${minute}`;
        
        case 'MONTH':
            return `매월 ${setting.date}일 ${hour}:${minute}`;
        
        default:
            return '설정 안됨';
    }
};

// 리전 개수 표시 함수
export const getRegionCountLabel = (regions: string[]): string => {
    
    const hasGlobal = regions.includes('global');
    const otherRegions = regions.filter(r => r !== 'global');
    
    if (hasGlobal && otherRegions.length === 0) {
        
        return 'Global';

    } else if (hasGlobal && otherRegions.length > 0) {
        
        return `Global + ${otherRegions.length}개 리전`;

    } else {
        
        return `${otherRegions.length}개 리전`;
    }
};