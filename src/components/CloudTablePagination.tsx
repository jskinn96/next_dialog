import { useCloudStore } from "@/store/cloudStore";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function CloudTablePagination() {

    const {
        cloudData,
        page,
        setPage,
    } = useCloudStore();

    const [total, setTotal] = useState(0);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);

    useEffect(() => {

        const totalCount = Math.ceil(cloudData.length/10);
        setTotal(totalCount);

    }, [cloudData]);

    useEffect(() => {

        if (total === page) setNextDisabled(true);
        else setNextDisabled(false);
        
        if (page > 1) setPrevDisabled(false);
        else setPrevDisabled(true);

    }, [total, page])
    
    // 다음 페이지
    const nextPage = () => {
        
        setPage(page + 1);
    }

    // 이전 페이지
    const prevPage = () => {
        
        setPage(page - 1);
    }

    // 현재 페이지 설정
    const currentPage = (p: number) => {

        if (page !== p) setPage(p);
    }

    return (
        <div className="flex items-center gap-2">
            <Button 
                variant="outline" 
                size="sm" 
                disabled={prevDisabled}
                onClick={() => prevPage()}
            >
                이전
            </Button>
            <div className="flex items-center gap-1">
                {Array.from({ length: total }, (_, i) => {
                    
                    const current = i + 1;
                    const variant = current === page
                                  ? "outline"
                                  : "ghost";  

                    return (
                        <Button 
                            key={i} 
                            variant={variant} 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => currentPage(current)}
                        >
                            {current}
                        </Button>
                    );
                })}
            </div>
            <Button 
                variant="outline" 
                size="sm" 
                disabled={nextDisabled}
                onClick={() => nextPage()}
            >
                다음
            </Button>
        </div>
    );
}