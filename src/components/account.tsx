import React from "react";
import styled from "@emotion/styled";
import { MusicKitContext } from "../model/MusicKitController";

const Container = styled.div`
  width: 525px;
  height: 100%;
  margin: 70px auto;

  @media (max-width: 692px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Title = styled.h2`
  width: 100%;
  font-family: Helvetica, sans-serif;
  font-size: 28px;
  font-weight: bold;
  line-height: 1.57;
  letter-spacing: -0.7px;
  color: #2e4d74;
  margin-bottom: 15px;
  display: inline-block;
`;

const Information = styled.div`
  display: block;
  width: 100%;
  height: 45px;
  margin-bottom: 35px;
  border-top: 1px solid #d9dbdd;
  border-bottom: 1px solid #d9dbdd;

  @media (max-width: 692px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const SubTitle = styled.h3`
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  line-height: 45px;
  display: inline-block;
  /* text-transform: uppercase; */
`;

const LogOut = styled.p`
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  letter-spacing: -0.4px;
  text-align: center;
  line-height: 45px;
  color: #70a3f2;
  display: block;
  cursor: pointer;
  float: right;
`;

const CompanyInformation = styled.div`
  display: block;
  width: 525px;
  height: 90px;

  @media (max-width: 692px) {
    width: 100%;
  }
`;

const Assemble = styled.div`
  border-bottom: 1px solid #d9dbdd;
  border-top: 1px solid #d9dbdd;

  @media (max-width: 692px) {
  }
`;

const Company = styled.p`
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  line-height: 45px;
  letter-spacing: -0.4px;
  color: #000000;
  display: inline-block;
`;

const Site = styled.a`
  width: 67px;
  height: 22px;
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  line-height: 45px;
  letter-spacing: -0.4px;
  text-align: right;
  color: #70a3f2;
  text-decoration: none;
  float: right;
`;

export default class Account extends React.Component {
  static contextType = MusicKitContext;

  constructor(props: any) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  async onSignOut() {
    const instance = this.context.instance;
    await instance.unauthorize();
  }

  render() {
    return (
      <Container>
        <Title>Account</Title>
        <Information>
          <SubTitle>Apple Music</SubTitle>
          <LogOut onClick={this.onSignOut}>Log Out</LogOut>
        </Information>
        <CompanyInformation>
          <Title>Developer</Title>
          <Assemble>
            <Company>Assemble Inc</Company>
            <Site
              href="https://assembleinc.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Site
            </Site>
          </Assemble>
        </CompanyInformation>
      </Container>
    );
  }
}
