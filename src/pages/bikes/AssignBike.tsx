import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AssignBike({ bikeId }: { bikeId: number }) {
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");

    const mutation = useMutation({
        mutationFn: async () => {
            return (
                await apiClient.post("/station/start-ride", {
                    bike_id: bikeId,
                    user_id: Number(userId),
                })
            ).data;
        },
        onSuccess: () => {
            toast.success("Ride started");
            setOpen(false);
            setUserId("");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.detail || "Failed to start ride");
        },
    });

    return (
        <>
            <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
                Start Ride
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Start Ride</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <Input
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            type="number"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => mutation.mutate()}
                            disabled={mutation.isPending || !userId}
                        >
                            {mutation.isPending ? "Starting…" : "Confirm"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
