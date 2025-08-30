import { TableBody, TableCell, TableRow } from "./ui/table";
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";
import { useCloudStore } from "@/store/cloudStore";
import TableRowSkeleton from "./TableRowSkeleton";
import { Badge } from "./ui/badge";
import { getRegionCountLabel, getRegionLabel, getScheduleLabel } from "@/data/cloudConstants";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Cloud } from "@/types/types";

export default function CloudTableRow() {

    const {
        cloudData,
        selectedRows,
        page,  
        loadCloudData,
        setCloudData,
        setSelectedRows,
        openModal,
    } = useCloudStore();
    const [isLoading, setIsLoading] = useState(true);
    const [pageData, setPageData] = useState<Cloud[]>([]);

    useEffect(() => {

        loadCloudData();

    }, [loadCloudData]);

    useEffect(() => {

        setIsLoading(false);
        
        const prevPage = page - 1;
        const startNumber = prevPage * 10;
        const endNumber = page * 10; 
        const tmpData = cloudData.slice(startNumber, endNumber);
        setPageData(tmpData);

    }, [page, cloudData]);

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

    // 열 삭제
    const removeRow = (cloudId: string) => {

        if (confirm(`이 열을 제거하시겠습니까?`)) {

            if (selectedRows.includes(cloudId)) setSelectedRows(selectedRows.filter(id => id !== cloudId));
            setCloudData(cloudData.filter(d => d.id !== cloudId));
        }
    }

    // 열 수정
    const editRow = (data: Cloud) => {

        openModal(data);
    }

    return (
        <TableBody>
            {
                isLoading
                ? <TableRowSkeleton />
                : (
                    pageData.map((cloud) => (
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
                                        onClick={() => editRow(cloud)}
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
    );
}