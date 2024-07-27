import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EditPets from "./EditPets";
import DeletePets from "./DeletePets";
import { deletePets, updatePets } from "../api/api";
import catImage from "../assets/images/catImage.jpeg";
import petImage from "./PetImages";

const PetCard = ({ pets, loading, fetchPets, setPets }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  const handleEditClick = (pet) => {
    setCurrentPet(pet);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (pet) => {
    setCurrentPet(pet);
    setOpenDeleteDialog(true);
  };

  const handleUpdatePets = async (updateData) => {
    try {
      await updatePets(updateData.id, updateData);
      fetchPets();
      setOpenEditDialog(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeletePets = async (pet) => {
    try {
      await deletePets(pet.id);
      setPets((prevPets) => prevPets.filter((p) => p.id !== pet.id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.log("Error deleting pet:", error);
    }
  };

  const getPetImage = (petId) => {
    const petImageObject = petImage.find((image) => image.id === petId);
    return petImageObject ? petImageObject.img : catImage;
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={6} style={{ marginTop: 1, marginBottom: 1 }}>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 1,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 600,
                    backgroundColor: "rgba(135, 206, 250, 0.15)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      sx={{
                        borderRadius: "50%",
                        width: 130,
                        height: 130,
                      }}
                      component="img"
                      image={getPetImage(pet.id)}
                      alt={pet.name}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {pet.name}
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontSize: "20px" }}>
                      Type: {pet.type}
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontSize: "20px" }}>
                      Breed: {pet.breed}
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontSize: "20px" }}>
                      Price: ${pet.price}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        sx={{
                          padding: "10px 20px",
                          marginTop: 2,
                          marginRight: 2,
                          backgroundColor: "#3f51b5",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#303f9f",
                          },
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleEditClick(pet);
                        }}
                      >
                        Edit
                        <Edit />
                      </Button>
                      <Button
                        sx={{
                          color: "white",
                          marginTop: 2,
                          backgroundColor: "red",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                          },
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          padding: "10px 20px",
                        }}
                        color="error"
                        onClick={() => handleDeleteClick(pet)}
                      >
                        Trash
                        <Delete
                          sx={{ color: "white" }}
                          onClick={() => handleDeleteClick(pet)}
                        />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No pets available. Please add a new pet.</Typography>
          )}

          {/* Edit Pet Dialog */}
          <EditPets
            open={openEditDialog}
            onClose={() => {
              setOpenEditDialog(false);
            }}
            currentPet={currentPet}
            updatePets={handleUpdatePets}
          />

          {/* Delete Pet Dialog */}
          <DeletePets
            open={openDeleteDialog}
            onClose={() => {
              setOpenDeleteDialog(false);
            }}
            onConfirm={handleDeletePets}
            pet={currentPet}
          />
        </Grid>
      )}
    </>
  );
};

export default PetCard;
