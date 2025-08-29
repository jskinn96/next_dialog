"use client"

import { awsRegionOptions, credentialTypeOptions, dateOptions, hourOptions, minuteOptions, providerOptions, scheduleFrequencyOptions, weekdayOptions } from "@/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { cloudGroups } from "@/types/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function CloudCreateModal() {

    return (
        <Dialog open={true}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>클라우드 생성</DialogTitle>
                </DialogHeader>
                
                <form id="cloudForm" className="space-y-4 overflow-y-auto pb-[3px]">
                    {/* 계정명 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">계정명 *</label>
                        <Input placeholder="Production Account"/>
                    </div>
                    
                    {/* 그룹 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">그룹</label>
                        <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                            {cloudGroups.map(group => (
                                <Badge
                                    key={group}
                                    variant="default"
                                    className="cursor-pointer"
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
                                    variant="default"
                                    className="cursor-pointer"
                                >
                                    {region.displayName}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    
                    {/* 활성화 옵션들 */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="eventProcess" />
                            <label htmlFor="eventProcess" className="text-sm font-medium">이벤트 처리 활성화</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Checkbox id="userActivity" />
                            <label htmlFor="userActivity" className="text-sm font-medium">사용자 활동 모니터링 활성화</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Checkbox  id="scheduleScan" />
                            <label htmlFor="scheduleScan" className="text-sm font-medium">스케줄 스캔 활성화</label>
                        </div>
                    </div>
                    
                    {/* 스케줄 설정 */}
                    <div className="space-y-2 p-3 bg-muted/30 rounded-md">
                        <label className="text-sm font-medium">스케줄 설정</label>
                        <div className="grid grid-cols-2 gap-2">
                            <Select defaultValue="DAY">
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
                            
                            <Select defaultValue="MON">
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
                            
                            <Select defaultValue="1">
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

                            <Select defaultValue="0">
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
                            
                            <Select defaultValue="0">
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
                    
                    {/* Proxy 설정 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Proxy URL (선택사항)</label>
                        <Input placeholder="https://proxy.company.com:8080" />
                    </div>
                    
                    {/* 공급자 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">공급자</label>
                        <Select defaultValue="AWS">
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
                    </div>

                    {/* 자격 증명 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">자격 증명</label>
                        <Input placeholder="AKIA..." />
                        
                        <Input 
                            type="password"
                            placeholder="Secret Access Key"
                        />
                        
                        <Input placeholder="Role ARN (선택사항)"/>
                    </div>

                    {/* 자격 증명 타입 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">자격 증명 타입</label>
                        <Select defaultValue="ACCESS_KEY">
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
                    </div>

                    {/* 이벤트 소스 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">이벤트 소스 (선택사항)</label>
                        <Input placeholder="production-cloudtrail" />
                    </div>                    
                </form>

                {/* 버튼 */}
                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" >취소</Button>
                    <Button type="submit" form="cloudForm">생성</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}