import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export default function TableRowSkeleton() {

    return (
        <>
            {[...Array(10)].map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell>
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-1">
                            <Skeleton className="h-5 w-14" />
                            <Skeleton className="h-5 w-14" />
                        </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-center">
                        <Skeleton className="h-5 w-10 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton className="h-5 w-10 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton className="h-5 w-10 mx-auto" />
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell>
                        <div className="flex justify-center gap-1">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}