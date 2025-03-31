"use client";
import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IReview {
  id: number;
  name: string;
  review: string;
  description: string;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: (
    <ArrowBackIosRoundedIcon
      sx={{ color: "white", "&:hover": { color: "white" } }}
    />
  ),
  nextArrow: (
    <ArrowForwardIosRoundedIcon
      sx={{ color: "white", "&:hover": { color: "white" } }}
    />
  ),
  customPaging: () => <Box sx={{ display: "none" }}></Box>,
};

const LandingPage = () => {
  const [reviews, setReviews] = React.useState<IReview[]>([]);

  useEffect(() => {
    fetch("/api/reviews", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          reviews?: IReview[];
        } = data;
        if (response.reviews) {
          setReviews(response.reviews);
        }
      });
  }, []);

  return (
    <>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Stay ahead of trends with our progressive strategies.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "#AAAAAA", width: "90%" }}
          >
            An award-winning web builder with disciplines in E-commerce, design,
            and website development. focused on understanding you.
          </Typography>
          <Box display="flex" gap={5} mt={4}>
            <Button
              sx={{
                width: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                color: "black",
                textTransform: "initial",
                padding: "10px 20px",
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Schedule Call <ArrowForwardRoundedIcon sx={{ width: 20 }} />
            </Button>
            <Button
              sx={{
                color: "white",
                textTransform: "initial",
                fontWeight: 600,
                fontSize: "12px",
                textDecoration: "underline",
              }}
            >
              View Case Study
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://img.freepik.com/premium-photo/radio-host-sitting-table-speaking-microphone-his-work-radio_249974-4738.jpg"
            alt="Webmaster-admin"
            style={{
              width: 220,
              height: 320,
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "16px",
              position: "absolute",
              top: 150,
              right: 325,
            }}
          />
          <img
            src="https://plus.unsplash.com/premium_photo-1661573047005-36f3c40bec8f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBwYXJ0bmVyfGVufDB8fDB8fHww"
            alt="Webmaster-plan"
            style={{
              width: 230,
              height: 220,
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "16px",
              position: "absolute",
              top: 100,
              right: 75,
            }}
          />
          <Box
            sx={{
              backgroundImage: `url("https://img.freepik.com/premium-photo/abstract-dark-background-with-white-glowing-lines-dots-forming-geometric-pattern_1174990-200085.jpg?semt=ais_hybrid")`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              width: 230,
              height: 250,
              borderRadius: "16px",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              padding: "16px",
              color: "white",
              position: "absolute",
              top: 350,
              right: 75,
            }}
          >
            <Typography sx={{ fontSize: "60px", fontWeight: 600 }}>
              230+
            </Typography>
            <Typography variant="body1" paragraph>
              some websites that we build, and successfully running.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundImage: `url("https://png.pngtree.com/background/20240112/original/pngtree-3d-render-of-market-downtrend-on-a-black-background-picture-image_7233540.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              width: 350,
              height: 120,
              borderRadius: "16px",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              padding: "30px 40px",
              color: "white",
              position: "absolute",
              top: 450,
              right: 355,
            }}
          >
            <Typography sx={{ fontSize: "10px" }}>
              ------- Drive more sales and customization
            </Typography>
            <Typography
              sx={{ fontSize: "20px", fontWeight: 600, width: "70%" }}
            >
              Drive more users and product sales
            </Typography>
          </Box>
          <TrendingUpIcon
            color="success"
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "16px",
              fontSize: "80px",
              zIndex: 999,
              position: "absolute",
              top: 130,
              right: 275,
            }}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          margin: "80px 0",
        }}
      >
        <Typography>Trusted by 200+ business brands</Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img
            src="https://www.webdew.com/wp-content/uploads/2024/09/bigcartel-logo-1024x270.png"
            style={{ filter: "invert(0.4)", width: 100, height: "auto" }}
          />
          <img
            src="https://cdn.prod.website-files.com/633617b15a78ccbe02dcf627/6570fba6f9c2397601d9442b_Dyper_site_logo_3.png"
            style={{ filter: "invert(1)", width: 100, height: "auto" }}
          />
        </Box>
      </Box>
      <Divider sx={{ borderColor: "white", margin: "30px 0" }} />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Provide the best service with our out of the box ideas
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "#AAAAAA", width: "80%" }}
          >
            we are passionate team which have experienced with more than enough
            e-commerce website development. With deep understanding of
            ever-evolving e-commerce landscape, we can help you to create a
            website that is not only visually appealing but also user-friendly.
          </Typography>
        </Box>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item md={4} lg={4} sm={6} xs={12}>
            <Box
              sx={{
                backgroundImage: `url("https://img.freepik.com/premium-photo/abstract-dark-background-with-white-glowing-lines-dots-forming-geometric-pattern_1174990-200085.jpg?semt=ais_hybrid")`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                height: 250,
                borderRadius: "16px",
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                padding: "16px",
                color: "white",
              }}
            >
              <Typography sx={{ fontSize: "60px", fontWeight: 600 }}>
                100<span style={{ color: "green" }}>+</span>
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#AAAAAA" }}>
                projects finish with superbly
              </Typography>
            </Box>
          </Grid>
          <Grid item md={8} lg={8} sm={6} xs={12}>
            <Box
              sx={{
                backgroundImage: `url("https://cdn.prod.website-files.com/636bbf9c519296f08f480299/63c2233523be3cb680d65b1c_62fbe7459d84b93e283eeca4_Untitled%2520design%2520(3).jpeg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 250,
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                color: "white",
              }}
            >
              <Typography sx={{ fontSize: "60px" }}>
                HOW WE <span style={{ color: "green" }}>WORK</span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ borderColor: "white", margin: "40px 0" }} />
      <Box
        sx={{
          padding: "0 50px 20px 50px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "40px" }}>
          What our customer are saying
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Slider {...settings}>
            {reviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  padding: "24px",
                  maxWidth: "500px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: "20px", color: "#ffffff" }}
                >
                  {review.review}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    fontSize: "16px",
                    fontStyle: "italic",
                    color: "#AAAAAA",
                  }}
                >
                  "{review.description}"
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    fontSize: "16px",
                  }}
                >
                  - {review.name}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "white", margin: "20px 0 50px 0" }} />
      <Box
        sx={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/03/12/22/06/360_F_312220617_RYUnWE2XLsPDReOosFB71ADPYOOR5e1N.jpg")`,
          padding: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "60px", fontWeight: 700 }}>
          Ready to work with us?
        </Typography>
        <Button
          sx={{
            width: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            color: "black",
            textTransform: "initial",
            padding: "10px 20px",
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          Get Started <ArrowForwardRoundedIcon sx={{ width: 20 }} />
        </Button>
      </Box>
    </>
  );
};

export default LandingPage;
