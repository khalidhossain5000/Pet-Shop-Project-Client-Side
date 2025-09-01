import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";

const AdminAllPet = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedPet, setSelectedPet] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [petToReject, setPetToReject] = useState(null);
  //pet rejection reason
  const [rejectionReason, setRejectionReason] = useState("");

  // TanStack Query to fetch admin pets
  const {
    data: pets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminPets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/pets");
      return response.data;
    },
  });

  // Approve pet mutation (done)
  const approvePetMutation = useMutation({
    mutationFn: async (petId) => {
      const response = await axiosSecure.patch(`/admin/pets/${petId}/approve`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Pet approved successfully!");
      queryClient.invalidateQueries(["adminPets"]);
    },
    onError: (error) => {
      toast.error("Failed to approve pet");
      console.error("Error approving pet:", error);
    },
  });

  // Reject pet mutation
  const rejectPetMutation = useMutation({
    mutationFn: async ({ petId, reason }) => {
      const response = await axiosSecure.patch(`/admin/pets/${petId}/reject`, {
        reason,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Pet rejected successfully!");
      queryClient.invalidateQueries(["adminPets"]);
      setRejectDialogOpen(false);
      setRejectionReason("");
      setPetToReject(null);
    },
    onError: (error) => {
      toast.error("Failed to reject pet");
      console.error("Error rejecting pet:", error);
    },
  });

  // Delete pet mutation
  const deletePetMutation = useMutation({
    mutationFn: async (petId) => {
      const response = await axiosSecure.delete(`/admin/pets/${petId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Pet deleted successfully!");
      queryClient.invalidateQueries(["adminPets"]);
      setDeleteDialogOpen(false);
      setSelectedPet(null);
    },
    onError: (error) => {
      toast.error("Failed to delete pet");
      console.error("Error deleting pet:", error);
    },
  });

  // Handle actions
  const handleApprove = (petId) => {
    approvePetMutation.mutate(petId);
  };

  const handleReject = (petId) => {
    const pet = pets.find((pet) => pet._id === petId);
    setPetToReject(pet);
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (petToReject && rejectionReason.trim()) {
      rejectPetMutation.mutate({
        petId: petToReject._id,
        reason: rejectionReason.trim(),
      });
    }
  };

  const handleDelete = (petId) => {
    setSelectedPet(pets.find((pet) => pet._id === petId));
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPet) {
      deletePetMutation.mutate(selectedPet._id);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  if (isLoading) <Loading />;

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading pets: {error.message}
      </Alert>
    );
  }

  return (
    <div className="bg-light-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="text-light-text mb-6"
        >
          Admin Pet Management
        </Typography>

        {pets && pets.length > 0 ? (
          <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }} aria-label="admin pets table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Pet Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Pet Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Breed</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map((pet) => (
                  <TableRow key={pet._id} hover>
                    <TableCell>
                      <Avatar
                        src={pet.petPic}
                        alt={pet.petName}
                        sx={{ width: 50, height: 50 }}
                        variant="rounded"
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "medium" }}>
                      {pet.petName}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pet.petCategory}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{pet.breed || "N/A"}</TableCell>
                    <TableCell>{pet.age || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        label={pet.gender || "Unknown"}
                        size="small"
                        color={
                          pet.gender === "Male"
                            ? "primary"
                            : pet.gender === "Female"
                            ? "secondary"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#3B82F6" }}>
                      ${pet.price || 0}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pet.status || "Pending"}
                        size="small"
                        color={getStatusColor(pet.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        {pet.status !== "approved" && (
                          <Tooltip title="Approve Pet">
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => handleApprove(pet._id)}
                              disabled={approvePetMutation.isPending}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        {pet.status !== "rejected" && (
                          <Tooltip title="Reject Pet">
                            <IconButton
                              color="warning"
                              size="small"
                              onClick={() => handleReject(pet._id)}
                              disabled={rejectPetMutation.isPending}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Tooltip title="Delete Pet">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDelete(pet._id)}
                            disabled={deletePetMutation.isPending}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="textSecondary">
              No pets found
            </Typography>
          </Box>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{selectedPet?.petName}"? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={confirmDelete}
              color="error"
              variant="contained"
              disabled={deletePetMutation.isPending}
            >
              {deletePetMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Rejection Reason Dialog */}
        <Dialog
          open={rejectDialogOpen}
          onClose={() => setRejectDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Reject Pet</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              You are about to reject "{petToReject?.petName}". Please provide a
              reason for rejection:
            </Typography>
            <Box sx={{ mt: 2 }}>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
                style={{ fontFamily: "inherit" }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={confirmReject}
              color="warning"
              variant="contained"
              disabled={!rejectionReason.trim() || rejectPetMutation.isPending}
            >
              {rejectPetMutation.isPending ? "Rejecting..." : "Reject Pet"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminAllPet;
