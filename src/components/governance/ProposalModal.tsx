
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useGovernance } from "@/hooks/useGovernance";

interface ProposalModalProps {
  open: boolean;
  onClose: () => void;
}

const ProposalModal = ({ open, onClose }: ProposalModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { createProposal } = useGovernance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createProposal(title, description);
      
      if (result.success) {
        toast({
          title: "Proposal Created",
          description: "Your governance proposal has been submitted successfully.",
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create proposal",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-bitaccess-black-light border-bitaccess-gold/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Governance Proposal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-bitaccess-black border-bitaccess-gold/20 focus:border-bitaccess-gold"
              placeholder="E.g., Increase Staking Rewards"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-bitaccess-black border-bitaccess-gold/20 focus:border-bitaccess-gold min-h-[150px]"
              placeholder="Describe the proposal in detail, including its purpose and expected outcomes..."
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-bitaccess-gold/30 text-white"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-bitaccess-gold hover:bg-bitaccess-gold/90 text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Submit Proposal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalModal;
