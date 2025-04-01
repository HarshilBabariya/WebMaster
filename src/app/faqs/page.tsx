"use client";
import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useRouter } from "next/navigation";

interface IFAQs {
  question: string;
  answer: string;
}

const FAQs = () => {
  const router = useRouter();
  const [moreQuestionClicked, setMoreQuestionClicked] =
    React.useState<boolean>(false);
  const [faqData, setFaqData] = React.useState<IFAQs[]>([]);

  React.useEffect(() => {
    fetch("/api/faqs", {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          faqs?: IFAQs[];
        } = data;
        if (response.faqs) {
          setFaqData(response.faqs);
        }
      });
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item md={5} lg={5} sm={12} xs={12}>
        <Typography sx={{ fontSize: "42px", fontWeight: 500 }}>
          E-commerce FAQs
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#AAAAAA" }}>
          As a leading e-commerce web builder, we are dedicated to providing
          comprehensive educational resources and answering frequently asked
          questions to help our clients.
        </Typography>
        <Box display="flex" gap={5} mt={4}>
          <Button
            variant="outlined"
            sx={{
              width: "180px",
              color: "white",
              textTransform: "initial",
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "13px",
              borderColor: "white",
            }}
            onClick={() => setMoreQuestionClicked(true)}
          >
            Load Questions
          </Button>
          <Button
            sx={{
              color: "white",
              textTransform: "initial",
              fontWeight: 600,
              fontSize: "12px",
              textDecoration: "underline",
            }}
            onClick={() => router.push("/contact-us")}
          >
            Contact Us
          </Button>
        </Box>
      </Grid>
      <Grid item md={7} lg={7} sm={12} xs={12}>
        {faqData.slice(0, moreQuestionClicked ? undefined : 3).map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "black",
              borderBottom: "1px solid white",
              borderRadius: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                <span className="icon">
                  <AddRoundedIcon
                    sx={{ color: "white" }}
                    className="icon-plus"
                  />
                  <RemoveRoundedIcon
                    sx={{ color: "white", display: "none" }}
                    className="icon-minus"
                  />
                </span>
              }
              sx={{
                "& .Mui-expanded .icon-plus": { display: "none" },
                "& .Mui-expanded .icon-minus": { display: "block" },
              }}
            >
              <Typography sx={{ color: "white", fontSize: "18px" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "#AAAAAA" }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};

export default FAQs;
