import { ReactElement } from "react";
import styles from "./land.module.css";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import mypic from "./trello.png";
import { signIn } from "next-auth/react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Footer from "./Footer";

export default function LandPage(): ReactElement {

  function scrollLeft() {
    const cards = document.querySelector<HTMLElement>(".scroll");
    cards!.style.transition = "transform 0.5s ease-in-out";
    cards!.style.transform = "translate(20%, 0)";
  }

  function scrollRight() {
    const cards = document.querySelector<HTMLElement>(".scroll");
    cards!.style.transition = "transform 0.5s ease-in-out";
    cards!.style.transform = "translate(-20%, 0)";
  }

    return (
            <section className={styles.section}>
                <article className={styles.articleOne}>
                    <Box sx={{
                        width: "60%",
                        padding: 10,
                        display: "flex",
                        justifyContent: "right",
                        "@media (max-width: 600px)": {
                          flexDirection: "column",
                          width: "100%",
                          padding: 4,
                          height: "100vh",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 4
                        }
                    }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "62%",
                            "@media (max-width: 600px)": {
                              width: "100%"
                            }
                        }}>
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: "45px",
                              fontWeight: "medium",
                              color: "white",
                              "@media (max-width: 600px)": {
                                fontSize: "30px",
                                textAlign: "center"
                              }
                            }}>
                            Task manager brings your favorite tools and teammates together
                          </Typography>
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "medium",
                              fontSize: "18px",
                              "@media (max-width: 600px)": {
                                textAlign: "center"
                              }
                          }}>
                            Try signing up here:
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => signIn()}
                            sx={{
                              width: "fit-content",
                              background: 'linear-gradient(to right, #2784FF, #37D5EB)!important',
                              "@media (max-width: 600px)": {
                                width: "100%",
                                background: "#1976D2!important"
                              }
                            }}
                          >
                            Get started {'>'}
                          </Button>
                        </Box>
                    </Box>
                    <Box>
                        <Image className={styles.img} src={mypic} alt="cos" />
                    </Box>
                </article>
                <article className={styles.articleTwo}>
                  <Box>
                    <Typography
                      className="font"
                      textAlign="center"
                      sx={{
                        width: "47.5%",
                        "@media (max-width: 600px)": {
                          width: "100%",
                          textAlign: "left",
                          paddingLeft: 3
                        }
                      }}
                    >
                      Task Manager flow
                    </Typography>
                    <Typography
                      variant="h3"
                      textAlign="center"
                      sx={{
                        fontWeight: "bold",
                        width: "70%",
                        "@media (max-width: 600px)": {
                          fontSize: "29px",
                          width: "100%",
                          textAlign: "left",
                          paddingLeft: 3
                        }
                    }}
                      className="font"
                    >
                      Usages for Task Manager
                    </Typography>
                  </Box>
                  <Box sx={{ paddingTop: 2, paddingBottom: 2, display: "flex", justifyContent: "right", width: "85%", gap: 2}}>
                    <Button
                      color="inherit"
                      variant="contained"
                      sx={{
                        padding: .5,
                        minWidth: "30px",
                        height: "30px",
                        borderRadius: "100%",
                        outline: "none",
                        "@media (max-width: 600px)": {
                          display: "none"
                        }
                    }}
                      onClick={scrollLeft}
                    >
                      {`<`}
                    </Button>
                    <Button
                      color="inherit"
                      variant="contained"
                      sx={{
                        padding: .5,
                        minWidth: "30px",
                        height: "30px",
                        borderRadius: "100%",
                        outline: "none",
                        "@media (max-width: 600px)": {
                          display: "none"
                        }
                    }}
                      onClick={scrollRight}
                    >
                      {`>`}
                    </Button>
                  </Box>
                  <Box sx={{ width: "100%", display: "flex", justifyContent: "right"}}>
                    <Box
                      sx={{
                        display: "flex",
                        overflowX: "hidden",
                        gap: 5,
                        width: "100%",
                        scrollBehavior: "smooth",
                        paddingRight: "100px",
                        scrollbarWidth: "none",
                        "::-webkit-scrollbar": { display: "none" },
                        background: "white",
                        transform: "translate(20%, 0)",
                        "@media (max-width: 600px)": {
                          "::-webkit-scrollbar": { display: "block" },
                          scrollbarWidth: "10px",
                          overflowX: "scroll",
                          transform: "translate(0, 0)",
                          background: "transparent",
                          paddingLeft: 3
                        }
                    }}
                      className="scroll"
                    >
                      <SampleCard />
                      <SampleCard />
                      <SampleCard />
                      <SampleCard />
                      <SampleCard />
                      <SampleCard />
                    </Box>
                  </Box>
                  <Footer />
                </article>
            </section>
    )
}

function SampleCard(): ReactElement {
  return (
    <Card sx={{ minWidth: 345, height: "fit-content" }}>
      <CardActionArea>
        <Box sx={{ height: "50px", background: "orange", width: "100%", position: "absolute", zIndex: "10"}}>
        </Box>
        <Box>
          <FolderIcon
            sx={{
              background: "white",
              position: "absolute",
              zIndex: "11",
              borderRadius: "8px",
              left: "15px",
              top: "25px",
              fontSize: "45px",
              color: "orange"
          }}
          />
        </Box>
        <CardContent sx={{ paddingTop: "80px" }}>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}