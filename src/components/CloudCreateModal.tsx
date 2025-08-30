"use client"

import { awsRegionOptions, credentialTypeOptions, dateOptions, defaultCloudData, hourOptions, minuteOptions, providerOptions, scheduleFrequencyOptions, weekdayOptions } from "@/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Cloud, cloudGroups } from "@/types/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useCloudStore } from "@/store/cloudStore"
import { Path, useForm } from "react-hook-form"
import { CloudFormData, cloudFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"

export function CloudCreateModal() {

    const {
        isOpenModal,
        closeModal,
        addCloudData
    } = useCloudStore();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm<CloudFormData>({
        resolver: zodResolver(cloudFormSchema),
        defaultValues: defaultCloudData as CloudFormData
    });

    // 선택 그룹
    const selectGroups = watch('cloudGroupName');
    // 선택 리전
    const selectRegions = watch('regionList');
    // 체크박스 활성화 여부
    const eventProcess = watch('eventProcessEnabled');
    const userActivity = watch('userActivityEnabled');
    const scheduleScan = watch('scheduleScanEnabled');
    // 스케줄 설정 주기
    const scheduleFrequency = watch('scheduleScanSetting.frequency');
    // 공급자
    const provider = watch('provider');

    // 뱃지 토글
    const toggleBadge = (name: keyof CloudFormData, data: CloudFormData['cloudGroupName'] | CloudFormData['regionList'],  value: string) => {

        const current = data || [];

        if (name === "regionList" && value === "global") return alert("글로벌은 필수 선택 입니다");

        if (data?.includes(value)) setValue(name, current.filter(v => v !== value));
        else setValue(name, [...current, value]);
    }

    // 체크박스 토글
    const toggleCheckbox = (name: keyof CloudFormData, state: boolean) => {

        if (state === true) setValue(name, false);
        else setValue(name, true);
    }

    // 셀렉트 기능
    const selectFunc = (name: Path<CloudFormData>, value: string) => {
        
        setValue(name, value);
    }

    const submitForm = (data: CloudFormData) => { 

        addCloudData(data as Cloud);

        closeModal();
        reset();
    }

    return (
        <Dialog open={isOpenModal} onOpenChange={closeModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col select-none">
                <DialogHeader>
                    <DialogTitle>클라우드 생성</DialogTitle>
                </DialogHeader>
                
                <form 
                    id="cloudForm" 
                    className="space-y-4 overflow-y-auto pb-[3px]"
                    onSubmit={handleSubmit(submitForm)}
                >
                    {/* 계정명 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">계정명 *</label>
                        <Input
                            {...register("name")} 
                            placeholder="Production Account"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>
                    
                    {/* 그룹 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">그룹</label>
                        <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                            {cloudGroups.map(group => (
                                <Badge
                                    key={group}
                                    variant={
                                        selectGroups?.includes(group)
                                        ? "default"
                                        : "outline"
                                    }
                                    className="cursor-pointer"
                                    onClick={() => toggleBadge('cloudGroupName', selectGroups, group)}
                                >
                                    {group}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* 리전 선택 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">리전 선택 *</label>
                        <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                            {awsRegionOptions.map(region => (
                                <Badge
                                    key={region.value}
                                    variant={
                                        selectRegions?.includes(region.value)
                                        ? "default"
                                        : "outline"
                                    }
                                    className="cursor-pointer"
                                    onClick={() => toggleBadge('regionList', selectRegions, region.value)}
                                >
                                    {region.displayName}
                                </Badge>
                            ))}
                        </div>
                        {errors.regionList && (
                            <p className="text-sm text-destructive">{errors.regionList.message}</p>
                        )}
                    </div>
                    
                    {/* 활성화 옵션들 */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="eventProcess"
                                {...register("eventProcessEnabled")}
                                checked={eventProcess} 
                                onClick={() => toggleCheckbox("eventProcessEnabled", eventProcess)}
                            />
                            <label htmlFor="eventProcess" className="text-sm font-medium cursor-pointer">이벤트 처리 활성화</label>
                        </div>
                        
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox 
                                id="userActivity" 
                                {...register("userActivityEnabled")}
                                checked={userActivity}
                                onClick={() => toggleCheckbox("userActivityEnabled", userActivity)}
                            />
                            <label htmlFor="userActivity" className="text-sm font-medium cursor-pointer">사용자 활동 모니터링 활성화</label>
                        </div>
                        
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox 
                                id="scheduleScan" 
                                {...register("scheduleScanEnabled")}
                                checked={scheduleScan}
                                onClick={() => toggleCheckbox("scheduleScanEnabled", scheduleScan)}
                            />
                            <label htmlFor="scheduleScan" className="text-sm font-medium cursor-pointer">스케줄 스캔 활성화</label>
                        </div>
                    </div>
                    
                    {/* 스케줄 설정 */}
                    {
                        scheduleScan && (
                            <div className="space-y-2 p-3 bg-muted/30 rounded-md">
                                <label className="text-sm font-medium">스케줄 설정</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Select 
                                        defaultValue="DAY" 
                                        onValueChange={(value) => selectFunc("scheduleScanSetting.frequency", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="주기 선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {scheduleFrequencyOptions.map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {
                                        (
                                            scheduleFrequency !== "HOUR"
                                            && scheduleFrequency !== "DAY"
                                            && scheduleFrequency !== "MONTH"
                                        ) && (
                                            <Select 
                                                defaultValue="MON"
                                                onValueChange={(value) => selectFunc("scheduleScanSetting.weekday", value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="요일 선택" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {weekdayOptions.map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )
                                    }
                                    {
                                        (
                                            scheduleFrequency !== "HOUR"
                                            && scheduleFrequency !== "DAY"
                                            && scheduleFrequency !== "WEEK"
                                        ) && (
                                            <Select 
                                                defaultValue="1"
                                                onValueChange={(value) => selectFunc("scheduleScanSetting.date", value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="날짜 선택" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dateOptions.map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )
                                    }    
                                    {
                                        scheduleFrequency !== "HOUR" && (
                                            <Select 
                                                defaultValue="0"
                                                onValueChange={(value) => selectFunc("scheduleScanSetting.hour", value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="시간 선택" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {hourOptions.map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )
                                    }    
                                    <Select 
                                        defaultValue="0"
                                        onValueChange={(value) => selectFunc("scheduleScanSetting.minute", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="분 선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {minuteOptions.map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )
                    }
                    
                    {/* Proxy 설정 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Proxy URL (선택사항)</label>
                        <Input 
                            placeholder="https://proxy.company.com:8080"
                            {...register('proxyUrl')} 
                        />
                    </div>
                    
                    {/* 공급자 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">공급자</label>
                        <Select 
                            defaultValue="AWS"
                            onValueChange={(value) => selectFunc("provider", value)}
                        >
                            <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="공급자 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                {providerOptions.map(opt => (
                                    <SelectItem 
                                        key={opt.value} 
                                        value={opt.value} 
                                        disabled={!opt.enabled}
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.provider && (
                            <p className="text-sm text-destructive">{errors.provider.message}</p>
                        )}
                    </div>

                    {/* 자격 증명 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">자격 증명</label>
                        {
                            provider === 'AWS' && (
                                <>
                                    <Input 
                                        placeholder="Access Key"
                                        {...register('credentials.accessKey')}
                                    />
                                    <Input 
                                        type="password"
                                        placeholder="Secret Access Key"
                                        {...register('credentials.secretAccessKey')}
                                    />
                                    <Input 
                                        placeholder="Role ARN (선택사항)"
                                        {...register('credentials.roleArn')}
                                    />
                                </>
                            )
                        }
                        {errors.credentials?.accessKey && (
                            <p className="text-sm text-destructive">{errors.credentials?.accessKey.message}</p>
                        )}
                        {errors.credentials?.secretAccessKey && (
                            <p className="text-sm text-destructive">{errors.credentials?.secretAccessKey.message}</p>
                        )}
                    </div>

                    {/* 자격 증명 타입 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">자격 증명 타입</label>
                        {
                            provider === 'AWS' && (    
                                <Select 
                                    defaultValue="ACCESS_KEY"
                                    onValueChange={(value) => selectFunc("credentialType", value)}
                                >
                                    <SelectTrigger className="w-1/2">
                                        <SelectValue placeholder="자격 증명 타입 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {credentialTypeOptions.AWS.map(opt => (
                                            <SelectItem 
                                                key={opt.value} 
                                                value={opt.value}
                                                disabled={!opt.enabled}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        }
                        {errors.credentialType && (
                            <p className="text-sm text-destructive">{errors.credentialType.message}</p>
                        )}
                    </div>

                    {/* 이벤트 소스 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">이벤트 소스 (선택사항)</label>
                        {
                            provider === 'AWS' && (
                                <Input 
                                    placeholder="production-cloudtrail"
                                    {...register('eventSource.cloudTrailName')} 
                                />
                            )
                        }
                    </div>                    
                </form>

                {/* 버튼 */}
                <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                        type="button" 
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => closeModal()} 
                    >취소</Button>
                    <Button 
                        type="submit" 
                        form="cloudForm" 
                        className="cursor-pointer"
                    >생성</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}