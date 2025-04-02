import {
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const listItems = [
  "Seamless drag-and-drop store builder for effortless customization.",
  "Cloud-based infrastructure for scalable growth without performance issues.",
  "Integrated payment gateways and secure checkout options.",
  "Analytics and insights to help businesses optimize their sales and marketing efforts.",
  "Ongoing support and updates to keep the platform competitive and aligned with industry trends.",
];

const CaseStudyPage = () => {
  return (
    <>
      <Typography variant="h2">
        WebMaster: Your Partner in Digital Success
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Chip
          label="E-Commerce"
          sx={{
            backgroundColor: "white",
            fontWeight: 600,
            padding: "10px 8px",
          }}
        />
        <Chip
          label="Business"
          sx={{
            backgroundColor: "white",
            fontWeight: 600,
            padding: "10px 8px",
          }}
        />
        <Chip
          label="Website"
          sx={{
            backgroundColor: "white",
            fontWeight: 600,
            padding: "10px 8px",
          }}
        />
        <Typography>Last updated on April 1, 2024</Typography>
      </Box>
      <Grid container spacing={4} sx={{ marginTop: "0px" }}>
        <Grid item xs={12} md={8}>
          <Typography variant="body1">
            In this case study, we explore how an e-commerce website builder,
            similar to Shopify, was developed to help businesses build and
            manage their online stores with ease. WebMaster is an all-in-one
            platform that offers entrepreneurs the ability to design, launch,
            and scale their online stores without requiring deep technical
            knowledge.
          </Typography>

          <Typography variant="body1">
            The platform is designed to cater to businesses of all sizes, from
            small startups to established enterprises. It offers customizable
            templates, powerful integrations with payment gateways, and a
            user-friendly drag-and-drop interface that empowers users to take
            control of their online presence with minimal effort.
          </Typography>

          <Typography sx={{ marginTop: "30px", fontSize: "32px" }}>
            Challenges Faced by Businesses
          </Typography>
          <Typography variant="body1">
            The challenge for many businesses looking to build an online store
            is the complexity of the process. For small to medium-sized
            businesses, the cost and technical expertise required to launch an
            e-commerce website can be overwhelming. Many business owners have
            limited experience with web development, making it difficult to
            achieve the desired look and functionality for their online store.
          </Typography>
          <Typography variant="body1">
            Additionally, as businesses grow, they often face challenges related
            to scalability, such as slow website performance during peak
            traffic, payment processing issues, and difficulty managing a large
            number of products and customers.
          </Typography>

          <Typography sx={{ marginTop: "30px", fontSize: "32px" }}>
            Our Solution
          </Typography>
          <Typography variant="body1">
            WebMaster’s solution is designed to address these challenges by
            providing an easy-to-use platform with robust functionality. Our
            drag-and-drop store builder allows business owners to create and
            customize their store with ease, using pre-designed templates or
            building from scratch. The platform also integrates with multiple
            payment gateways, providing a seamless checkout experience for
            customers.
          </Typography>
          <Typography variant="body1">
            One of the standout features of WebMaster is its scalability. The
            platform uses cloud-based infrastructure, ensuring that your online
            store can handle high traffic and large inventories without
            sacrificing speed or performance. Whether you’re handling hundreds
            of products or thousands, WebMaster ensures that your website
            remains fast and reliable.
          </Typography>
          <Typography variant="body1">
            Another key feature is the comprehensive analytics dashboard, which
            helps business owners track sales, monitor customer behavior, and
            make data-driven decisions. With these insights, business owners can
            continuously improve their stores to boost conversions and sales.
          </Typography>

          <Typography sx={{ marginTop: "30px", fontSize: "32px" }}>
            Results Achieved
          </Typography>
          <Typography variant="body1">
            Since its launch, WebMaster has helped hundreds of businesses create
            beautiful, functional online stores that drive sales and growth. Our
            clients have reported a 30% increase in sales on average within the
            first three months of launching their store. Many clients have also
            experienced a significant reduction in cart abandonment rates due to
            the platform’s user-friendly checkout process.
          </Typography>
          <Typography variant="body1">
            The scalable infrastructure has allowed businesses to expand without
            worrying about website downtime or slow load times. Additionally,
            the integrated payment gateways and easy-to-manage product catalogs
            have made it easier for store owners to focus on growing their
            businesses instead of dealing with technical issues.
          </Typography>

          <Typography sx={{ marginTop: "30px", fontSize: "32px" }}>
            Key Takeaways
          </Typography>
          <Typography variant="body1">
            Whether you are a small startup or an established business,
            WebMaster offers the tools and support needed to take your online
            store to the next level. With our platform, you can focus on growing
            your business while we handle the technical side of things.
          </Typography>
          <Typography variant="body1">
            WebMaster has proven to be a valuable tool for businesses looking to
            build an online presence. With its user-friendly interface,
            scalability, and comprehensive features, it provides businesses with
            everything they need to create and manage a successful e-commerce
            store. Key takeaways include:
          </Typography>
          <List dense sx={{ padding: 0 }}>
            {listItems.map((list, index) => {
              return (
                <ListItem key={index + 1} disableGutters>
                  {index + 1}. {list}
                </ListItem>
              );
            })}
          </List>
        </Grid>

        <Grid item xs={12} md={4} sx={{ background: "#AAAAAA" }}>
          <Typography variant="h4">Advertisement</Typography>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 6, gap: 5 }}>
        <Box>
          <Divider sx={{ borderColor: "white", mb: 2 }} />
          <Typography sx={{ mb: 2 }}>SHARE THIS:</Typography>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            sx={{ color: "black", "&:hover": { color: "#AAAAAA" } }}
          >
            <Facebook
              sx={{
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            sx={{ color: "black", "&:hover": { color: "#AAAAAA" } }}
          >
            <Twitter
              sx={{
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            />
          </IconButton>
          <IconButton
            href="https://linkedin.com"
            target="_blank"
            sx={{ color: "black", "&:hover": { color: "#AAAAAA" } }}
          >
            <LinkedIn
              sx={{
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            />
          </IconButton>
        </Box>
        <Typography sx={{ fontStyle: "italic" }}>
          Posted in:{" "}
          <span style={{ color: "#AAAAAA" }}>
            E-commerce, Websites, Windows, Builder
          </span>
        </Typography>
      </Box>
    </>
  );
};

export default CaseStudyPage;
