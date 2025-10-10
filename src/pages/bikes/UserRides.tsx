import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Ride = {
    id: number;
    start_time: string;
    end_time: string | null;
    cost: number;
    bike_id: number;
    started_by_staff: string | null;
    ended_by_staff: string | null;
};

type PaginatedResponse = {
    total: number;
    page: number;
    page_size: number;
    rides: Ride[];
};

export default function MyRides() {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading, isError } = useQuery<PaginatedResponse>({
        queryKey: ["my-rides", page],
        queryFn: async () => {
            const res = await apiClient.get("/rent/my-rides", {
                params: { page, page_size: pageSize },
            });
            console.log(res);
            return res.data;
        },
    });

    if (isLoading) return <p>Loading rides…</p>;
    if (isError) return <p>Failed to load rides.</p>;

    const rides = data?.rides || [];
    const totalPages = data ? Math.ceil(data.total / data.page_size) : 1;

    return (
        <Card className="p-4">
            <CardContent>
                <h2 className="text-xl font-semibold mb-4">My Rides</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ride ID</TableHead>
                            <TableHead>Bike</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Started by</TableHead>
                            <TableHead>Ended by</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rides.map((ride) => (
                            <TableRow key={ride.id}>
                                <TableCell>{ride.id}</TableCell>
                                <TableCell>{ride.bike_id}</TableCell>
                                <TableCell>{new Date(ride.start_time).toLocaleString()}</TableCell>
                                <TableCell>{ride.end_time ? new Date(ride.end_time).toLocaleString() : "—"}</TableCell>
                                <TableCell>{ride.cost.toFixed(2)}</TableCell>
                                <TableCell>{ride.started_by_staff || "—"}</TableCell>
                                <TableCell>{ride.ended_by_staff || "—"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                        Previous
                    </Button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
