"use client"

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  
    getScheduleLabel, 
    getRegionCountLabel 
} from "@/data"
import { Cloud } from "@/types/types"
import {  
    Edit, 
    Trash2, 
    Plus,
} from "lucide-react"
import { loadCloudStorageData, storageKey } from "@/data/localStorage"
import TableRowSkeleton from "./TableRowSkeleton"
import { getRegionLabel } from "@/data/cloudConstants"

export default function CloudManagementTable() {

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [cloudData, setCloudData] = useState<Cloud[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const tmpCloudData = loadCloudStorageData();
        setCloudData(tmpCloudData);
        setIsLoading(false);
    }, []);

    useEffect(() => {

        localStorage.setItem(storageKey, JSON.stringify(cloudData));

    }, [cloudData])

    // 전체 선택/해제
    const handleSelectAll = (checked: boolean) => {

        if (checked) setSelectedRows(cloudData.map(cloud => cloud.id));
        else setSelectedRows([]);
    };

    // 개별 선택
    const handleSelectRow = (cloudId: string, checked: boolean) => {

        if (checked) setSelectedRows([...selectedRows, cloudId]);
        else setSelectedRows(selectedRows.filter(id => id !== cloudId));
    };

    // 상태 뱃지 렌더링
    const renderStatusBadge = (enabled: boolean) => {
        
        return enabled ? (
            <Badge variant="success" className="font-normal">활성</Badge>
        ) : (
            <Badge variant="secondary" className="font-normal">비활성</Badge>
        );
    };

    // 선택 열 삭제
    const removeSelectRow = () => {

        if (confirm(`선택한 ${selectedRows.length}개의 열을 제거하시겠습니까?`)) {

            setCloudData(cloudData.filter(d => !selectedRows.includes(d.id)));
            setSelectedRows([]);
        }
    }

    // 열 삭제
    const removeRow = (cloudId: string) => {

        if (confirm(`이 열을 제거하시겠습니까?`)) setCloudData(cloudData.filter(d => d.id !== cloudId));
    }

    return (
        <div className="w-full space-y-4">
            {/* 헤더 */}
            <Card className="select-none cursor-default">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">
                            클라우드 관리
                        </CardTitle>
                        <div className="flex gap-2">
                            {selectedRows.length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{selectedRows.length}개 선택됨</span>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => setSelectedRows([])}
                                    >
                                        선택 해제
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => removeSelectRow()}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        삭제
                                    </Button>
                                </div>
                            )}
                            <Button size="sm" className="cursor-pointer">
                                <Plus className="mr-2 h-4 w-4" />
                                클라우드 생성
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* 테이블 */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[40px]">
                                        <Checkbox 
                                            checked={
                                                cloudData.length > 0 && 
                                                selectedRows.length === cloudData.length
                                            }
                                            onCheckedChange={handleSelectAll}
                                            className="cursor-pointer"
                                        />
                                    </TableHead>
                                    <TableHead className="font-semibold">공급자</TableHead>
                                    <TableHead className="font-semibold">계정명</TableHead>
                                    <TableHead className="font-semibold">그룹</TableHead>
                                    <TableHead className="font-semibold">리전</TableHead>
                                    <TableHead className="font-semibold text-center">이벤트 처리</TableHead>
                                    <TableHead className="font-semibold text-center">사용자 활동</TableHead>
                                    <TableHead className="font-semibold text-center">스케줄 스캔</TableHead>
                                    <TableHead className="font-semibold">스케줄 설정</TableHead>
                                    <TableHead className="text-center font-semibold">작업</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    isLoading
                                    ? <TableRowSkeleton />
                                    : (
                                        cloudData.map((cloud) => (
                                            <TableRow 
                                                key={cloud.id}
                                                className="hover:bg-muted/30"
                                            >
                                                <TableCell>
                                                    <Checkbox 
                                                        checked={selectedRows.includes(cloud.id)}
                                                        onCheckedChange={(checked) => 
                                                            handleSelectRow(cloud.id, checked as boolean)
                                                        }
                                                        className="cursor-pointer"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-semibold">{cloud.provider}</span>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex flex-col">
                                                        <span>{cloud.name}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            ID: {cloud.id}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {cloud.cloudGroupName?.map((group, idx) => (
                                                            <Badge 
                                                                key={idx} 
                                                                variant="outline" 
                                                                className="text-xs font-normal"
                                                            >
                                                                {group}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell title={getRegionLabel(cloud.regionList)}>
                                                    <span className="text-sm">
                                                        {getRegionCountLabel(cloud.regionList)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {renderStatusBadge(cloud.eventProcessEnabled)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {renderStatusBadge(cloud.userActivityEnabled)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {renderStatusBadge(cloud.scheduleScanEnabled)}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-muted-foreground">
                                                        {cloud.scheduleScanEnabled 
                                                            ? getScheduleLabel(cloud.scheduleScanSetting)
                                                            : '-'
                                                        }
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 cursor-pointer"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 cursor-pointer"
                                                            onClick={() => removeRow(cloud.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                }
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}