import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { RECHARGE_WALLET } from "../graphql/mutations/paymentMutations";
import internal from "stream";

interface RechargeWalletModalProps {
  open: boolean;
  handleClose: () => void;
}

const RechargeWalletModal: React.FC<RechargeWalletModalProps> = ({ open, handleClose }) => {
  const [amount, setAmount] = useState(""); // State to manage the amount
  const [rechargeWallet, { data, loading, error }] = useMutation(RECHARGE_WALLET);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value); // Update state on input change
  };

  const handleQuickSelect = (value: number) => {
    setAmount(value.toString()); // Update state on quick-select button click
  };

  const handleRecharge = async () => {
    try {
      const response = await rechargeWallet({
        variables: {
          input: {
            accountId: "12345", // Replace with the actual accountId from context or state
            amount: parseFloat(amount),
          },
        },
      });

      if (response.data.rechargeWallet.errors) {
        console.error("Errors:", response.data.rechargeWallet.errors);
      } else {
        console.log("New Balance:", response.data.rechargeWallet.newBalance);
        handleClose(); // Close the modal after successful recharge
      }
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Recharge Your Wallet
          </Typography>

          {/* Input Amount */}
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            Enter Amount in Multiples of 100 Below
          </Typography>
          <input
            type="number"
            value={amount}
            onChange={handleInputChange}
            min="500"
            max="50000"
            step="100"
            placeholder="₹500"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "1rem",
            }}
          />

          {/* Quick Select Options */}
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Or Select From Below</Typography>
          <Box sx={{ display: "flex", gap: "0.5rem", mb: 2 }}>
            {[500, 1000, 2500, 5000, 10000].map((value) => (
              <Button
                key={value}
                onClick={() => handleQuickSelect(value)}
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                ₹{value}
              </Button>
            ))}
          </Box>

          {/* Summary */}
          <Box sx={{ backgroundColor: "#f8f9fa", p: 2, borderRadius: "8px", mb: 2 }}>
            <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Recharge Amount</span> <span>₹{amount || 0}</span>
            </Typography>
          </Box>

          {/* Continue Button */}
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#6c63ff",
              color: "#fff",
              padding: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#574ee6",
              },
            }}
            onClick={handleRecharge}
            disabled={loading || !amount}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Continue to Payment"}
          </Button>

          {error && <Typography color="error">Error: {error.message}</Typography>}
          {data?.rechargeWallet.errors && (
            <Box>
              {data.rechargeWallet.errors.map((err : any, idx : any) => (
                <Typography key={idx} color="error">
                  {err.code}: {err.message}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default RechargeWalletModal;
