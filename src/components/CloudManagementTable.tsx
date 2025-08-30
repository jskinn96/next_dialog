"use client"

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import { useCloudStore } from "@/store/cloudStore"
import CloudTableRow from "./CloudTableRow"
import CloudTablePagination from "./CloudTablePagination"

export default function CloudManagementTable() {

    const {
        cloudData,
        selectedRows,
        pageData, 
        setCloudData,
        setSelectedRows,
        openModal,
    } = useCloudStore();

    // 전체 선택/해제
    const handleSelectAll = (checked: boolean) => {

        if (checked) {

            const newSelectedRows = pageData.map(cloud => cloud.id);
            setSelectedRows([...selectedRows, ...newSelectedRows]);

        } else {

            const pageIds = new Set(pageData.map(cloud => cloud.id));
            setSelectedRows(selectedRows.filter(id => !pageIds.has(id)));
        }
    };

    // 선택 열 삭제
    const removeSelectRow = () => {

        if (confirm(`선택한 ${selectedRows.length}개의 열을 제거하시겠습니까?`)) {

            setCloudData(cloudData.filter(d => !selectedRows.includes(d.id)));
            setSelectedRows([]);
        }
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
                                        전체 선택 해제
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
                            <Button 
                                size="sm" 
                                className="cursor-pointer"
                                onClick={() => openModal()}
                            >
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
                            {/* 헤더 */}
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[40px]">
                                        <Checkbox 
                                            checked={
                                                cloudData.length > 0 
                                                && pageData.every(cloud => selectedRows.includes(cloud.id))
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
                            {/* 열 */}
                            <CloudTableRow />
                        </Table>
                    </div>
                    <div className="flex items-center justify-end px-2 py-4">
                        <CloudTablePagination />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}