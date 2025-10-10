import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function BikeForm({
    bike,
    onClose,
}: {
    bike?: any;
    onClose: () => void;
}) {
    const queryClient = useQueryClient();
    const [model, setModel] = useState(bike?.model || "");
    const [identifier, setIdentifier] = useState(bike?.identifier || "");
    const [station, setStation] = useState(bike?.station || "");
    const [status, setStatus] = useState(bike?.status || "available");
    const [bikeMetadata, setBikeMetadata] = useState(bike?.bike_metadata || "");

    const mutation = useMutation({
        mutationFn: async () => {
            const payload = {
                model,
                identifier,
                station,
                status,
                bike_metadata: bikeMetadata || null, // nullable
            };

            if (bike?.id) {
                return (await apiClient.put(`/station/${bike.id}`, payload)).data;
            }
            return (await apiClient.post("/station", payload)).data;
            console.log(payload);
        },
        onSuccess: () => {
            toast.success(bike ? "Bike updated" : "Bike created");
            queryClient.invalidateQueries({ queryKey: ["bikes"] });
            onClose();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.detail || "Failed to save bike. Try again.";
            toast.error(message);
        },
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">
                    {bike ? "Edit Bike" : "Add Bike"}
                </h3>

                <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                    placeholder="Bike model"
                />

                <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                    placeholder="Identifier"
                />

                <input
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                    placeholder="Station"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                </select>

                <textarea
                    value={bikeMetadata}
                    onChange={(e) => setBikeMetadata(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    placeholder="Metadata (optional)"
                />

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                        {mutation.isPending ? "Saving…" : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
