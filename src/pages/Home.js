import React from "react";
import styled from "styled-components";
import AsteroidTable from "../components/AsteroidTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AsteroidDetails from "../components/AsteroidDetails";

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Header />
        <HeroContent>
          <MainHeading>
            <Highlighted>AsteroTracker</Highlighted> is a service for near earth
            Asteroid information.
          </MainHeading>
          <SubHeading>
            Every visitor can search for Asteroids based on their closest
            approach date to Earth, lookup a specific Asteroid, as well as
            browse the overall data-set.
          </SubHeading>
        </HeroContent>
        <a href="#features">
          <ScrollDownIcon>
            <MouseY></MouseY>
            <Scroller></Scroller>
          </ScrollDownIcon>
        </a>
      </HeroSection>
      <Features id="features">
        <Image src="/assets/images/features-bg.png">
          <Text>
            Every year, the Earth is hit by about
            <AsteroidsCount> 6100</AsteroidsCount> asteroids large enough to
            reach the ground, or about 17 every day, research has revealed. The
            vast majority fall unnoticed, in uninhabited areas.
          </Text>
        </Image>
        <ListContainer>
          <ListHeading>Features</ListHeading>
          <List>
            <ListItem>
              Access to the huge list of recent asteroids and their approach
              date.
            </ListItem>
            <ListItem>
              Asteroids who are potentionally hazardous are labeled with
              different color.
            </ListItem>
            <ListItem>
              Every asteroid is listed with its reference name, magnitude,
              velocity, miss distance etc..
            </ListItem>
          </List>
        </ListContainer>
      </Features>
      <AsteroidTable />
      <Footer />
      <AsteroidDetails />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("/assets/images/hero-background.png") no-repeat;
  background-position: center;
  background-size: cover;
  padding: 0 90px;

  &:after {
    content: "";
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  display: grid;
  max-width: 800px;
  grid-template-columns: repeat(12, 1fr);
  margin-top: 18vh;
  z-index: 3;
`;

const MainHeading = styled.h2`
  grid-column: 1 / span 8;
  font-size: 34px;
  font-weight: 400;
  color: var(--light-gray);
  text-align: left;
  line-height: 43px;
`;

const Highlighted = styled.span`
  color: var(--purple);
  font-size: 34px;
  font-weight: 500;
`;

const SubHeading = styled.p`
  grid-column: 1 / span 8;
  margin-top: 15px;
  font-size: 17px;
  font-weight: 400;
  color: var(--dark-gray);
  line-height: 30px;
  padding-right: 40px;
`;

const ScrollDownIcon = styled.div`
  position: absolute;
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 48px;
  cursor: pointer;
  z-index: 3;
`;

const MouseY = styled.div`
  width: 3px;
  padding: 10px 13px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 25px;
  opacity: 0.75;
  box-sizing: content-box;
`;

const Scroller = styled.div`
  position: absolute;
  top: 20px;
  left: 56%;
  transform: translateX(-50%);
  width: 3px;
  height: 10px;
  border-radius: 25%;
  background-color: var(--light-gray);
  animation-name: scroll;
  animation-duration: 2.2s;
  animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
  animation-iteration-count: infinite;

  @keyframes scroll {
    0% {
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(15px);
      opacity: 0;
    }
  }
`;

const Features = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  position: relative;
  background: url("/assets/images/features-bg.png") no-repeat;
  background-position: center;
  background-size: cover;
  height: 600px;

  &:after {
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &:before {
    content: "";
    position: absolute;
    top: -8px;
    width: 100%;
    height: 50px;
    background: linear-gradient(
      to bottom,
      rgba(13, 1, 27, 1) 40%,
      rgba(66, 25, 57, 0.1) 100%
    );
    z-index: 2;
  }
`;

const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  font-weight: 400;
  color: var(--light-gray);
  text-align: center;
  line-height: 35px;
  z-index: 5;
`;

const AsteroidsCount = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: var(--light-purple);
`;

const ListContainer = styled.div`
  width: 100%;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  padding-bottom: 20vh;
`;

const ListHeading = styled.h3`
  font-size: 26px;
  font-weight: 500;
  color: var(--light-purple);
  text-align: center;
  margin-bottom: 50px;
`;

const List = styled.ul`
  list-style-type: none;
  width: 100%;
`;

const ListItem = styled.li`
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  line-height: 35px;
  color: var(--dark-purple);
`;
