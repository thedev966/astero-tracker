import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer id="footer">
      <Credits>
        Made with <HeartIcon src="/assets/images/heart-icon.svg" /> by Dev
      </Credits>
      <Social>
        <Github>
          <a href="https://github.com/thedev966" target="_blank">
            <GithubIcon src="/assets/images/github-icon.svg" />
          </a>
          <GithubText>@thedev966</GithubText>
        </Github>
        <Discord>
          <DiscordIcon src="/assets/images/discord-icon.svg" />
          <DiscordText>Dev#0515</DiscordText>
        </Discord>
      </Social>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("/assets/images/footer-bg.png");
  min-height: 260px;
  color: var(--light-gray);
  margin-top: 50px;
`;

const Credits = styled.div`
  display: flex;
  align-content: center;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 45px;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 50%;
`;

const GithubIcon = styled.img`
  width: 23px;
  height: 23px;
  object-fit: contain;
  cursor: pointer;
  margin-right: 10px;
`;

const DiscordIcon = styled(GithubIcon)``;

const HeartIcon = styled(GithubIcon)`
  margin-right: 0;
  width: 20px;
  height: 20px;
  margin: 0 6px;
`;

const Github = styled.div`
  display: flex;
  align-items: center;
`;

const Discord = styled(Github)``;

const GithubText = styled.span`
  font-size: 14px;
  font-weight: 400;
  border-left: 1px solid rgba(228, 227, 227, 0.5);
  padding-left: 10px;
`;

const DiscordText = styled(GithubText)``;
