import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { addPets } from "../api/api";

const EditPets = ({ open, onClose, currentPet, updatePets }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    price: "",
  });

  useEffect(() => {
    if (currentPet) {
      setFormData({
        name: currentPet.name,
        type: currentPet.type,
        breed: currentPet.breed,
        price: currentPet.price,
        id: currentPet.id,
      });
    }
  }, [currentPet]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (currentPet) {
      updatePets(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Pet</DialogTitle>
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
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPets;
