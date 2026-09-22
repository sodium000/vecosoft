"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reasons = [
  "Package not received",
  "Wrong item delivered",
  "Damaged package",
  "Delivered to wrong address",
  "Other",
];

export function ReportIssueDialog({ open, onOpenChange }: ReportIssueDialogProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReason("");
      setDescription("");
      onOpenChange(false);
    }, 2000);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSubmitted(false);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border border-[#2a2a2a] bg-[#161616] text-[#fafafa] shadow-2xl sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="size-12 text-[#baff29]" />
            <h3 className="mt-3 text-lg font-bold text-white">Report Submitted</h3>
            <p className="mt-1 text-sm text-[#a3a3a3]">
              We&apos;ll investigate and respond within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">
                Report Missing Package
              </DialogTitle>
              <DialogDescription className="text-xs text-[#a3a3a3]">
                Tell us what happened and we&apos;ll look into it right away.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-xs font-medium text-[#d4d4d4]">
                  Reason
                </Label>
                <Select
                  value={reason}
                  onValueChange={(v) => setReason(v ?? "")}
                >
                  <SelectTrigger id="reason" className="w-full border-[#2a2a2a] bg-[#0d0d0f] text-white">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent className="border-[#2a2a2a] bg-[#161616] text-[#fafafa]">
                    {reasons.map((r) => (
                      <SelectItem key={r} value={r} className="focus:bg-[#2a2a2a] focus:text-[#baff29]">
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-medium text-[#d4d4d4]">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="border-[#2a2a2a] bg-[#0d0d0f] text-white placeholder:text-[#525252] focus-visible:border-[#baff29]/50"
                />
              </div>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full bg-[#baff29] font-semibold text-[#0a0a0a] hover:bg-[#c6ff3a]"
                disabled={!reason || !description.trim()}
                onClick={handleSubmit}
              >
                Submit Report
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#2a2a2a] bg-[#0d0d0f] text-white hover:bg-[#2a2a2a]"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
