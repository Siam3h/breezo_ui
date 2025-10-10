// src/pages/bikes/BikesList.tsx
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import BikeForm from "./BikeForm";
import AssignBike from "@/pages/bikes/AssignBike";
import EndRide from "@/pages/bikes/EndRide";

type Bike = {
    id: number;
    identifier: string;
    model: string;
    station: string;
    status: "available" | "rented" | "maintenance" | "retired";
};

type PaginatedBikes = {
    items: Bike[];
    page: number;
    page_size: number;
    total: number;
};

export default function BikesList() {
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);

    // live input states
    const [search, setSearch] = useState("");
    const [station, setStation] = useState("");
    const [model, setModel] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [status, setStatus] = useState<string | undefined>(undefined);

    // applied filter states
    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        station: "",
        model: "",
        identifier: "",
        status: undefined as string | undefined,
    });

    const [showForm, setShowForm] = useState(false);
    const [editBike, setEditBike] = useState<Bike | null>(null);

    const { data, isLoading, error } = useQuery<PaginatedBikes>({
        queryKey: ["bikes", { page, ...appliedFilters }],
        queryFn: async () => {
            const params: any = { page, page_size: 5 };
            if (appliedFilters.search) params.search = appliedFilters.search;
            if (appliedFilters.station) params.station = appliedFilters.station;
            if (appliedFilters.model) params.model = appliedFilters.model;
            if (appliedFilters.identifier) params.identifier = appliedFilters.identifier;
            if (appliedFilters.status) params.status = appliedFilters.status;

            const res = await apiClient.get("/station", { params });
            console.log("bike data", res.data);
            return res.data;

        },
        keepPreviousData: true,
    });

    const bikes = data?.items || [];

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => await apiClient.delete(`/station/${id}`),
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ["bikes"] });
            const prev = queryClient.getQueryData<PaginatedBikes>(["bikes"]);
            if (prev) {
                queryClient.setQueryData<PaginatedBikes>(["bikes"], {
                    ...prev,
                    items: prev.items.filter((b) => b.id !== id),
                });
            }
            return { prev };
        },
        onError: (_err, _id, context: any) => {
            if (context?.prev) queryClient.setQueryData(["bikes"], context.prev);
            toast.error("Failed to delete bike");
        },
        onSuccess: () => toast.success("Bike deleted"),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["bikes"] }),
    });

    const totalPages = useMemo(() => {
        return Math.ceil((data?.total || 0) / (data?.page_size || 1));
    }, [data]);

    if (isLoading) return <p>Loading bikes…</p>;
    if (error) return <p className="text-red-500">Error loading bikes</p>;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
                <h2 className="text-2xl font-bold">Bikes</h2>
                <Button
                    onClick={() => {
                        setEditBike(null);
                        setShowForm(true);
                    }}
                >
                    Add Bike
                </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2">
                <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="col-span-2" />
                <Input placeholder="Station" value={station} onChange={(e) => setStation(e.target.value)} />
                <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
                <Input placeholder="Identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                <Select onValueChange={(val) => setStatus(val || undefined)} value={status ?? ""}>
                    <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="rented">Rented</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    className="w-full md:w-auto"
                    onClick={() => {
                        setAppliedFilters({ search, station, model, identifier, status });
                        setPage(1);
                    }}
                >
                    Apply
                </Button>
            </div>

            {/* Table (desktop) */}
            <div className="hidden md:block overflow-x-auto bg-white shadow-sm rounded-lg">
                <Table>
                    <TableCaption>A list of all bikes in the system</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Model</TableHead>
                            <TableHead>Station</TableHead>
                            <TableHead>Identifier</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bikes.map((bike) => (
                            <TableRow key={bike.id}>
                                <TableCell className="font-medium">{bike.model}</TableCell>
                                <TableCell>{bike.station}</TableCell>
                                <TableCell>{bike.identifier}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${bike.status === "available"
                                            ? "bg-green-100 text-green-700"
                                            : bike.status === "rented"
                                                ? "bg-blue-100 text-blue-700"
                                                : bike.status === "maintenance"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {bike.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setEditBike(bike);
                                                    setShowForm(true);
                                                }}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => deleteMutation.mutate(bike.id)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <AssignBike bikeId={bike.id} />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <EndRide ride_id={bike.current_ride_id} />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex justify-end gap-2 flex-wrap">
                                    <AssignBike bikeId={bike.id} />
                                                                   </TableCell> 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Card view (mobile) */}
            <div className="grid gap-3 md:hidden">
                {bikes.map((bike) => (
                    <div key={bike.id} className="p-4 border rounded-lg shadow-sm bg-white space-y-2">
                        <div className="flex justify-between">
                            <h3 className="font-semibold">{bike.model}</h3>
                            <span
                                className={`px-2 py-1 rounded text-xs font-medium ${bike.status === "available"
                                    ? "bg-green-100 text-green-700"
                                    : bike.status === "rented"
                                        ? "bg-blue-100 text-blue-700"
                                        : bike.status === "maintenance"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {bike.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">Station: {bike.station}</p>
                        <p className="text-sm text-gray-600">ID: {bike.identifier}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button size="sm" variant="secondary" onClick={() => { setEditBike(bike); setShowForm(true); }}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(bike.id)}>Delete</Button>
                            <AssignBike bikeId={bike.id} />
                            <EndRide />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2">
                <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Prev</Button>
                <span>Page {page} / {totalPages}</span>
                <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</Button>
            </div>

            {/* Bike form modal */}
            {showForm && (
                <BikeForm
                    bike={editBike || undefined}
                    onClose={() => {
                        setEditBike(null);
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
}
