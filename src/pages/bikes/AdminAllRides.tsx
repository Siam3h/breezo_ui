import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import EndRide from "./EndRide";

type Bike = {
    id: number;
    identifier: string;
    station: string | null;
    model: string | null;
};

type Ride = {
    id: number;
    rider_email: string | null;
    bike: Bike | null;
    start_time: string;
    end_time: string | null;
    cost: number;
    started_by_staff: string | null;
    ended_by_staff: string | null;
};

type PaginatedResponse = {
    total: number;
    page: number;
    page_size: number;
    rides: Ride[];
};

export default function AllRides() {
    // Controlled search box input
    const [searchInput, setSearchInput] = useState("");
    // Applied filters that trigger API calls
    const [appliedSearch, setAppliedSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading, isError, refetch } = useQuery<PaginatedResponse>({
        queryKey: ["all-rides", appliedSearch, page],
        queryFn: async () => {
            const res = await apiClient.get("/rent/all-rides", {
                params: {
                    search: appliedSearch || undefined,
                    page,
                    page_size: pageSize,
                },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    if (isLoading) return <p>Loading rides…</p>;
    if (isError) return <p>Failed to load rides.</p>;

    const rides = data?.rides || [];
    const totalPages = data ? Math.ceil(data.total / data.page_size) : 1;

    return (
        <Card className="p-4">
            <CardContent>
                <h2 className="text-xl font-semibold mb-4">All Rides (Staff View)</h2>

                {/* Search */}
                <div className="flex gap-2 mb-4">
                    <Input
                        placeholder="Search by ID, Rider, Bike, Station, Model"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            setPage(1); // reset pagination
                            setAppliedSearch(searchInput); // apply filter
                            refetch();
                        }}
                    >
                        Apply
                    </Button>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ride ID</TableHead>
                            <TableHead>Rider</TableHead>
                            <TableHead>Bike</TableHead>
                            <TableHead>Station</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Started by</TableHead>
                            <TableHead>Ended by</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rides.map((ride) => (
                            <TableRow key={ride.id}>
                                <TableCell>{ride.id}</TableCell>
                                <TableCell>{ride.rider_email || "—"}</TableCell>
                                <TableCell>{ride.bike?.identifier || "—"}</TableCell>
                                <TableCell>{ride.bike?.station || "—"}</TableCell>
                                <TableCell>{ride.bike?.model || "—"}</TableCell>
                                <TableCell>
                                    {new Date(ride.start_time).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {ride.end_time ? new Date(ride.end_time).toLocaleString() : "—"}
                                </TableCell>
                                <TableCell>{ride.cost.toFixed(2)}</TableCell>
                                <TableCell>{ride.started_by_staff || "—"}</TableCell>
                                <TableCell>{ride.ended_by_staff || "—"}</TableCell>
                                <TableCell><EndRide rideId={ride.id}/></TableCell>

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
