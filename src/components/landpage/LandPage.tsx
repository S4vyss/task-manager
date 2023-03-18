import { ReactElement } from "react";
import styles from "./land.module.css";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import mypic from "./trello.png";

export default function LandPage(): ReactElement {
    return (
            <section className={styles.section}>
                <article className={styles.articleOne}>
                    <Box sx={{
                        display: "flex",
                        width: "50%",
                        padding: 10,
                        flexDirection: "column",
                        gap: 2
                    }}>
                        <Typography
                            variant="h1"
                            sx={{
                            fontSize: "40px",
                                fontWeight: "medium",
                                color: "white"
                        }}>
                            Task manager brings your favorite tools and teammates together
                        </Typography>
                        <Typography sx={{ color: "white" }}>
                            Try signing up here:
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                width: "fit-content",
                                background: 'linear-gradient(to right, #2784FF, #37D5EB)!important'
                            }}
                            >
                            Get started {'>'}
                        </Button>
                    </Box>
                    <Box>
                        <Image className={styles.img} src={mypic} alt="cos" />
                    </Box>
                </article>
                <article className={styles.articleTwo}>
                </article>
            </section>
    )
}