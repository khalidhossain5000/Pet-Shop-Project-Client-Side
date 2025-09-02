import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Loading from "../../../Shared/Loading/Loading.jsx";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data || [];
    },
  });

  //make admin starts
  const { mutateAsync: makeAdminAsync, isPending: isMakingAdmin } = useMutation(
    {
      mutationFn: async (userId) => {
        await axiosSecure.patch(`/admin/users/${userId}/make-admin`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        Swal.fire("Success", "User role updated to admin.", "success");
      },
    }
  );
  //make admin ends

  //remove admin starts
  const { mutateAsync: removeAdminAsync, isPending: isRemovingAdmin } =
    useMutation({
      mutationFn: async (userId) => {
        await axiosSecure.patch(`/admin/users/${userId}/remove-admin`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
          Swal.fire("Success", "User Removed From Admin", "success");
      },
    });
  //remove admin ends

  //delete user starts
  const { mutateAsync: deleteUserAsync, isPending: isDeleting } = useMutation({
    mutationFn: async (userId) => {
      await axiosSecure.delete(`/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
  //delete user ends

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">
          {error?.message || "Failed to load users."}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <h1 className="text-light-text mb-6 text-xl lg:text-3xl font-primary ">
        All Users
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id || user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar src={user.profilePic} alt={user.name || user.email} />
                </TableCell>
                <TableCell>{user.name || user.displayName || "—"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role || "user"}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<AdminPanelSettingsIcon />}
                      disabled={isMakingAdmin || user.role === "admin"}
                      onClick={() => makeAdminAsync(user._id || user.id)}
                    >
                      Make Admin
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      startIcon={<PersonRemoveIcon />}
                      disabled={isRemovingAdmin || user.role !== "admin"}
                      onClick={() => removeAdminAsync(user._id || user.id)}
                    >
                      Remove Admin
                    </Button>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      disabled={isDeleting}
                      onClick={async () => {
                        const id = user._id || user.id;
                        if (!id) return;

                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "This will permanently delete the user.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete",
                        });
                        if (result.isConfirmed) {
                          try {
                            await deleteUserAsync(id);
                            Swal.fire(
                              "Deleted!",
                              "User has been deleted.",
                              "success"
                            );
                          } catch (e) {
                            Swal.fire(
                              "Error",
                              e?.message || "Failed to delete user.",
                              "error"
                            );
                          }
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;
