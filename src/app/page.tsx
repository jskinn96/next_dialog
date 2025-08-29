import CloudManagementTable from "@/components/CloudManagementTable";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <CloudManagementTable />
            </div>
        </div>
    );
}