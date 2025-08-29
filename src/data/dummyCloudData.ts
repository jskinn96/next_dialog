import { Cloud } from '@/types/types';

export const dummyCloudData: Cloud[] = [
    {
        id: 'cloud-001',
        provider: 'AWS',
        name: 'Production AWS Account',
        cloudGroupName: ['Production', 'Critical'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'DAY',
            date: '1',
            weekday: 'MON',
            hour: '2',
            minute: '0',
        },
        regionList: [
            'global',
            'ap-northeast-2',
            'us-east-1',
            'eu-west-1',
            'ap-southeast-1'
        ],
        proxyUrl: 'https://proxy.company.com:8080',
        credentials: {
            accessKey: 'AKIA************XXXX',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'production-cloudtrail'
        }
    },
    {
        id: 'cloud-002',
        provider: 'AWS',
        name: 'Development AWS Account',
        cloudGroupName: ['Development', 'Testing'],
        eventProcessEnabled: true,
        userActivityEnabled: false,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'WEEK',
            date: '15',
            weekday: 'FRI',
            hour: '18',
            minute: '30',
        },
        regionList: [
            'global',
            'ap-northeast-2',
            'us-west-2'
        ],
        proxyUrl: undefined,
        credentials: {
            accessKey: 'AKIA************YYYY',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'dev-cloudtrail'
        }
    },
    {
        id: 'cloud-003',
        provider: 'AWS',
        name: 'Staging Environment',
        cloudGroupName: ['Staging'],
        eventProcessEnabled: false,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'MONTH',
            date: '1',
            weekday: 'MON',
            hour: '0',
            minute: '0',
        },
        regionList: [
            'global',
        ],
        proxyUrl: 'https://staging-proxy.company.com:3128',
        credentials: {
            accessKey: 'AKIA************ZZZZ',
            secretAccessKey: '****************************************',
            roleArn: 'arn:aws:iam::123456789012:role/StagingRole'
        },
        credentialType: 'ACCESS_KEY',
        eventSource: undefined
    },
    {
        id: 'cloud-004',
        provider: 'AWS',
        name: 'Analytics AWS Account',
        cloudGroupName: ['Analytics', 'Data Processing'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: false,
        scheduleScanSetting: {
            frequency: 'HOUR',
            date: '1',
            weekday: 'MON',
            hour: '0',
            minute: '0',
        },
        regionList: [
            'global',
            'us-east-1',
            'us-west-1',
            'eu-central-1',
            'ap-south-1'
        ],
        proxyUrl: undefined,
        credentials: {
            accessKey: 'AKIA************AAAA',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'analytics-trail'
        }
    },
    {
        id: 'cloud-005',
        provider: 'AWS',
        name: 'DR Site AWS Account',
        cloudGroupName: ['Disaster Recovery', 'Backup'],
        eventProcessEnabled: false,
        userActivityEnabled: false,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'DAY',
            date: '1',
            weekday: 'SUN',
            hour: '3',
            minute: '15',
        },
        regionList: [
            'global',
            'eu-west-2',
            'eu-west-3',
            'ap-southeast-2'
        ],
        proxyUrl: undefined,
        credentials: {
            accessKey: 'AKIA************BBBB',
            secretAccessKey: '****************************************',
            roleArn: 'arn:aws:iam::987654321098:role/DRSiteRole'
        },
        credentialType: 'ACCESS_KEY',
        eventSource: undefined
    },
    {
        id: 'cloud-006',
        provider: 'AWS',
        name: 'Security Monitoring Account',
        cloudGroupName: ['Security', 'Compliance', 'Audit'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'HOUR',
            date: '1',
            weekday: 'MON',
            hour: '0',
            minute: '0',
        },
        regionList: [
            'global',
        ],
        proxyUrl: 'https://security-proxy.company.com:8443',
        credentials: {
            accessKey: 'AKIA************CCCC',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'security-audit-trail'
        }
    },
	{
        id: 'cloud-007',
        provider: 'AWS',
        name: 'Production AWS Account',
        cloudGroupName: ['Production', 'Critical'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'DAY',
            date: '1',
            weekday: 'MON',
            hour: '2',
            minute: '0',
        },
        regionList: [
            'global',
            'ap-northeast-2',
            'us-east-1',
            'eu-west-1',
            'ap-southeast-1'
        ],
        proxyUrl: 'https://proxy.company.com:8080',
        credentials: {
            accessKey: 'AKIA************XXXX',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'production-cloudtrail'
        }
    },
    {
        id: 'cloud-008',
        provider: 'AWS',
        name: 'Development AWS Account',
        cloudGroupName: ['Development', 'Testing'],
        eventProcessEnabled: true,
        userActivityEnabled: false,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'WEEK',
            date: '15',
            weekday: 'FRI',
            hour: '18',
            minute: '30',
        },
        regionList: [
            'global',
            'ap-northeast-2',
            'us-west-2'
        ],
        proxyUrl: undefined,
        credentials: {
            accessKey: 'AKIA************YYYY',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'dev-cloudtrail'
        }
    },
    {
        id: 'cloud-009',
        provider: 'AWS',
        name: 'Staging Environment',
        cloudGroupName: ['Staging'],
        eventProcessEnabled: false,
        userActivityEnabled: true,
        scheduleScanEnabled: true,
        scheduleScanSetting: {
            frequency: 'MONTH',
            date: '1',
            weekday: 'MON',
            hour: '0',
            minute: '0',
        },
        regionList: [
            'global',
        ],
        proxyUrl: 'https://staging-proxy.company.com:3128',
        credentials: {
            accessKey: 'AKIA************ZZZZ',
            secretAccessKey: '****************************************',
            roleArn: 'arn:aws:iam::123456789012:role/StagingRole'
        },
        credentialType: 'ACCESS_KEY',
        eventSource: undefined
    },
	{
        id: 'cloud-010',
        provider: 'AWS',
        name: 'Analytics AWS Account',
        cloudGroupName: ['Analytics', 'Data Processing'],
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: false,
        scheduleScanSetting: {
            frequency: 'HOUR',
            date: '1',
            weekday: 'MON',
            hour: '0',
            minute: '0',
        },
        regionList: [
            'global',
            'us-east-1',
            'us-west-1',
            'eu-central-1',
            'ap-south-1'
        ],
        proxyUrl: undefined,
        credentials: {
            accessKey: 'AKIA************AAAA',
            secretAccessKey: '****************************************',
            roleArn: undefined
        },
        credentialType: 'ACCESS_KEY',
        eventSource: {
            cloudTrailName: 'analytics-trail'
        }
    }
];

// 단일 더미데이터
export const defaultCloudData: Omit<Cloud, 'id'> = {
    provider: 'AWS',
    name: '',
    cloudGroupName: [],
    eventProcessEnabled: false,
    userActivityEnabled: false,
    scheduleScanEnabled: false,
    scheduleScanSetting: {
        frequency: 'DAY',
        date: '1',
        weekday: 'MON',
        hour: '0',
        minute: '0',
    },
    regionList: ['global'],
    proxyUrl: undefined,
    credentials: {
        accessKey: '',
        secretAccessKey: '',
        roleArn: undefined
    },
    credentialType: 'ACCESS_KEY',
    eventSource: undefined
};