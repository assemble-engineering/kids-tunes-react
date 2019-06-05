import React from "react";
import styled from "@emotion/styled";
import { MusicKitContext } from "../model/MusicKitController";

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh);
  background-image: linear-gradient(to bottom, #fde194, #fed86e);
`;

const ContentDiv = styled.div`
  width: 335px;
  margin: 0px auto;
  padding-top: calc(50vh - 200px);
`;

const Logo = styled.img`
  display: block;
  margin: 0px auto 25px auto;
`;

const LogoText = styled.img`
  display: block;
  margin: 0px auto 50px auto;
  width: 160px;
`;

const LogInButton = styled.div`
  width: 335px;
  height: 45px;
  border-radius: 5px;
  background-color: #ff4869;
  font-family: Helvetica, sans-serif;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
  line-height: 45px;
  cursor: pointer;
`;

export default class Landing extends React.Component {
  static contextType = MusicKitContext;

  constructor(props: any) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
  }

  async onSignIn() {
    const instance = this.context.instance;
    await instance.authorize();
  }

  render() {
    return (
      <>
        <Background>
          <ContentDiv>
            <Logo
              src={require("../assets/music-logo.svg")}
              alt="Kids Tunes Logo"
            />
            <LogoText
              src={require("../assets/kids-tunes-navy.svg")}
              alt="Kids Tunes Logo Text"
            />
            <LogInButton onClick={this.onSignIn}>
              Sign in with{" "}
              <img
                alt="Apple Music Logo"
                src={require("../assets/apple-music.svg")}
              />
            </LogInButton>
          </ContentDiv>
        </Background>
      </>
    );
  }
}
