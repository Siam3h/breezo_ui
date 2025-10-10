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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EndRide({ rideId }: { rideId: number }) {
  const [open, setOpen] = useState(false);
  const [cost, setCost] = useState("");
  const [condition, setCondition] = useState("good");
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState({
    helmet: true,
    lights: true,
    brakes: true,
    battery: true,
    tires: true,
  });

  const handleChecklistChange = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ride_id: rideId,
        cost: Number(cost),
        assessment_payload: {
          condition,
          notes,
          checklist,
        },
      };
      console.log("Payload:", payload); // 🧠 Debug log
      return (await apiClient.post("/station/end-ride", payload)).data;
    },
    onSuccess: () => {
      toast.success("Ride ended successfully");
      setOpen(false);
      setCost("");
      setNotes("");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || "Failed to end ride");
    },
  });

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        End Ride
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Ride</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Cost */}
            <div>
              <Label htmlFor="cost">Ride Cost</Label>
              <Input
                id="cost"
                placeholder="Enter cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                type="number"
              />
            </div>

            {/* Condition */}
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                placeholder="e.g. good, average, poor"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Assessment Notes</Label>
              <Input
                id="notes"
                placeholder="Enter assessment notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Checklist */}
            <div>
              <Label>Checklist</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.keys(checklist).map((key) => (
                  <label
                    key={key}
                    className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md border"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[key as keyof typeof checklist]}
                      onChange={() => handleChecklistChange(key)}
                      className="w-4 h-4"
                    />
                    <span className="capitalize text-sm">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || !cost}
            >
              {mutation.isPending ? "Ending…" : "Confirm End Ride"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

