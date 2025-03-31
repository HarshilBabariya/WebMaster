import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const footerLinks = [
  { label: "Features", route: "features" },
  { label: "Support", route: "support" },
  { label: "Privacy", route: "privacy" },
  { label: "FAQs", route: "faqs" },
  { label: "Contact", route: "contact-us" },
];

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000000",
        padding: "2rem 0",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Image
              src={"/assets/webmaster-brand.png"}
              alt="WebMaster"
              style={{ filter: "invert(1)" }}
              width={180}
              height={50}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              padding: "20px 0px",
              display: "flex",
              gap: 6,
              color: "white",
            }}
          >
            {footerLinks.map((footerItem, index) => (
              <Link key={index} href={footerItem.route}>
                {footerItem.label}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: "10px" }}>
            <Typography variant="body2" sx={{ color: "#AAAAAA" }}>
              &copy; {new Date().getFullYear()} WebMaster. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
