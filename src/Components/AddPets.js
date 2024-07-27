import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { addPets } from "../api/api";

const AddPets = ({ open, onClose, fetchPets }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPet = async () => {
    setLoading(true);
    try {
      const petData = {
        ...formData,
        price: Number(formData.price),
      };
      await addPets(petData);
      fetchPets();
      onClose();
      setFormData({
        name: "",
        type: "",
        breed: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Pet</DialogTitle>
      <DialogContent>
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
          }}
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInput}
          fullWidth
        />
        <TextField
          sx={{
            marginBottom: 2,
          }}
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleInput}
          fullWidth
        />
        <TextField
          sx={{
            marginBottom: 2,
          }}
          label="Breed"
          name="breed"
          value={formData.breed}
          onChange={handleInput}
          fullWidth
        />
        <TextField
          sx={{
            marginBottom: 2,
          }}
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInput}
          type="number"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddPet} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPets;
