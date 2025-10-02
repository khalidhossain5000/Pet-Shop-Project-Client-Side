import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../../Shared/Loading/Loading.jsx";
import Swal from "sweetalert2";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const truncate = (text, max = 80) => {
    if (!text) return "—";
    return text.length > max ? `${text.slice(0, max)}…` : text;
  };

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const response = await axiosSecure.get("/products");
      return response.data || [];
    },
  });
console.log(error,'from admin all products')
  const { mutateAsync: deleteProductAsync, isPending: isDeleting } =
    useMutation({
      mutationFn: async (productId) => {
        await axiosSecure.delete(`/admin/products/${productId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      },
    });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">
          {error?.message || "Failed to load products."}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <h1 className="text-light-text mb-6 text-xl lg:text-3xl font-primary ">
        All Products Management
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar src={product?.productImage} variant="rounded" />
                </TableCell>
                <TableCell>{product?.productName || "Unnamed"}</TableCell>
                <TableCell>{product?.productCategory || "—"}</TableCell>
                <TableCell>
                  <span>{truncate(product?.productDescription, 80)}</span>
                  {product?.productDescription &&
                    product.productDescription.length > 80 && (
                      <Button
                        size="small"
                        sx={{ ml: 1, textTransform: "none" }}
                        onClick={() => {
                          setSelectedProduct(product);
                          setDialogOpen(true);
                        }}
                      >
                        View
                      </Button>
                    )}
                </TableCell>
                <TableCell align="right">
                  {product.productPrice != null
                    ? `$${Number(product?.productPrice).toFixed(2)}`
                    : "—"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    disabled={isDeleting}
                    onClick={async () => {
                      const id = product._id;
                      if (!id) return;

                      const result = await Swal.fire({
                        title: "Are you sure?",
                        text: "This will permanently delete the product.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                      });

                      if (result.isConfirmed) {
                        try {
                          await deleteProductAsync(id);
                          Swal.fire(
                            "Deleted!",
                            "Product has been deleted.",
                            "success"
                          );
                        } catch (e) {
                          Swal.fire(
                            "Error",
                            e?.message || "Failed to delete.",
                            "error"
                          );
                        }
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Product Description</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {selectedProduct?.productName}
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {selectedProduct?.productDescription}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminAllProducts;
