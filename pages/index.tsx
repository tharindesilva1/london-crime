import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const IndexPage = () => {
  return (
    <main>
      <VideoBackground playsInline autoPlay muted loop id="bg_vid">
        <source src="/bg1compressed.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <Header>
        <h1>{"London Crime"}</h1>
        <h2>{"A visualisation of crime during 2020"}</h2>
        <EnterButton color={"primary"} variant={"outlined"} href={"/map"}>
          {"Enter"}
        </EnterButton>
      </Header>
    </main>
  );
};

const VideoBackground = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Overlay = styled.div`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(124, 156, 161, 0.5) 100%
  );
`;

const Header = styled.header`
  position: relative;
  text-align: center;
  color: white;
  opacity: 0.5;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 3;
  display: flex;
  flex-direction: column;

  h1 {
    margin-top: 5rem;
    font-size: 7rem;
    font-weight: 900;
  }
  h2 {
    font-size: 2rem;
  }
`;

const EnterButton = styled(Button)`
  position: fixed;
  position: relative;
  color: white;
  z-index: 3;
  margin-top: 10rem !important;
  width: 10rem;
  height: 3rem;
  opacity: 1;
  font-size: 1.5rem !important;
  place-items: baseline;
  font-weight: 600 !important;
`;

export default IndexPage;
