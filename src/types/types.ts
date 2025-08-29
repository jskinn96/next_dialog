// regionList
export const AWSRegionList = [
    'global',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
    'ap-south-1',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'eu-central-1',
    'eu-north-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'sa-east-1',
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
] as const;

// cloudGroupName
export const cloudGroups = [
    'Production',
    'Development',
    'Staging',
    'Testing',
    'Critical',
    'Analytics',
    'Data Processing',
    'Disaster Recovery',
    'Backup',
    'Security',
    'Compliance',
    'Audit',
] as const;


export type Provider = 'AWS' | 'AZURE' | 'GCP'; // AWS만 활성화


export interface ScheduleScanSetting {
    /**
     * frequency에 따라 변경됨
     * HOUR  : 매시간을 의미
     * DAY   : 매일을 의미
     * WEEK  : 매주을 의미
     * MONTH : 매월을 의미
     */
    frequency: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
    date: string; // '1' ~ '28'
    weekday: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
    hour: string; // '0' ~ '23'
    minute: string; // '0' ~ '60', '5' 단위로 증가
}

// Credential
export interface AWSCredential {
    accessKey: string;
    secretAccessKey: string;
    roleArn?: string;
}

export interface AzureCredential {
    tenantId: string;
    subscriptionId: string;
    applicationId: string;
    secretKey: string;
}

export interface GCPCredential {
    projectId?: string;
    jsonText: string;
}

// Credential Type
export type AWSCredentialType = 'ACCESS_KEY' | 'ASSUME_ROLE' | 'ROLES_ANYWHERE'; // ACCESS_KEY만 활성화

export type AzureCredentialType = 'APPLICATION';

export type GCPCredentialType = 'JSON_TEXT';


export interface AWSEventSource {
    cloudTrailName?: string;
}

export interface AzureEventSource {
    storageAccountName?: string;
}

export interface GCPEventSource {
    storageAccountName?: string;
}

// 상세 정보 불러오는 API를 GET, 저장하는 API를 PUT으로 가정
export interface Cloud {
    id: string; // GET 요청 시 획득
    provider: Provider;
    name: string;
    cloudGroupName?: string[];
    eventProcessEnabled: boolean;
    userActivityEnabled: boolean;
    scheduleScanEnabled: boolean;
    scheduleScanSetting: ScheduleScanSetting;
    regionList: string[];
    proxyUrl?: string;
    credentials: AWSCredential | AzureCredential | GCPCredential; // GET 요쳥 시 비밀값이라 마스킹 상태로 전달됨
    credentialType: AWSCredentialType | AzureCredentialType | GCPCredentialType;
    eventSource?: AWSEventSource | AzureEventSource | GCPEventSource;
}