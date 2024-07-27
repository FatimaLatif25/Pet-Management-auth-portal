import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { getPets } from "../api/api";
import AddPets from "./AddPets";
import PetCards from "./PetCards";
import Header from "./Header";
import Footer from "./Footer";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Typography
          variant="h4"
          sx={{
            marginTop: 4,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: "2rem",
          }}
        >
          Manage the Pet Community
        </Typography>
        <Button
          sx={{
            padding: "10px 20px",
            backgroundColor: "#3f51b5",
            marginTop: 2,
            color: "#fff",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Pet
        </Button>

        {/*  Pet Cards */}
        <PetCards
          pets={pets}
          loading={loading}
          fetchPets={fetchPets}
          setPets={setPets}
        />

        {/* Add Pet Dialog */}
        <AddPets
          open={openAddDialog}
          onClose={() => {
            setOpenAddDialog(false);
          }}
          fetchPets={fetchPets}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Pets;
