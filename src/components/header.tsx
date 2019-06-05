import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

const StyledNav = styled.nav`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: #efedf4;
  font-family: Helvetica, sans-serif;
  width: 100%;
  height: 60px;
  position: fixed;
`;

const StyledUL = styled.ul`
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: 125px;
  margin-left: 25px;
  margin-top: 15px;

  @media (max-width: 980px) {
    visibility: hidden;
  }

  @media (max-width: 692px) {
    display: none;
  }
`;

const StyledIcon = styled.div`
  display: inline-block;
  margin-top: 5px;
  margin-right: 10px;

  @media (max-width: 692px) {
    margin: 5px 0px;
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: -40px 20px 0px 20px;
  width: 165px;
  height: 60px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 60px;
  letter-spacing: -0.5px;
  color: #a8afb9;
  text-decoration: none;
  fill: #a8afb9;

  &:hover {
    width: 165px;
    height: 60px;
    background-color: #e4e1eb;
    margin-top: -40px;

    @media (max-width: 692px) {
      margin: 0px;
    }
  }

  @media (max-width: 692px) {
    margin: 0px;
  }
`;

const TextSpan = styled.span`
  display: inline-block;

  @media (max-width: 692px) {
    display: none;
  }
`;

const AccountSVG = (props: any) => {
  let { fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="25"
      viewBox="0 0 24 25"
    >
      <path
        fill={fill}
        fillRule="nonzero"
        d="M12.255 13.265a6.635 6.635 0 0 0 6.639-6.632A6.635 6.635 0 0 0 12.255 0a6.635 6.635 0 0 0-6.638 6.633 6.635 6.635 0 0 0 6.638 6.632zM0 24.461c0 .298.244.539.545.539h22.91a.542.542 0 0 0 .545-.539v-1.077c0-4.356-2.95-8.078-8.727-8.078H8.727C2.95 15.306 0 19.028 0 23.384v1.077z"
      />
    </svg>
  );
};

const FavoritesSVG = (props: any) => {
  let { fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M11.533 23c-.56-.565-.965-.974-1.216-1.225-1.685-1.688-3.33-3.414-4.868-5.24-1.347-1.598-2.612-3.256-3.673-5.064-.537-.915-1.01-1.862-1.348-2.873C.21 7.947.04 7.283.008 6.593c-.051-1.102.16-2.16.59-3.17C1.01 2.45 1.62 1.63 2.476 1.01 3.843.022 5.357-.172 6.964.206c1.072.253 1.993.8 2.811 1.534a10.906 10.906 0 0 1 1.62 1.856c.038.053.077.104.12.161.038-.051.068-.092.096-.133.423-.603.887-1.171 1.422-1.678A7.122 7.122 0 0 1 15.042.58 6.695 6.695 0 0 1 17.12.04c.422-.042.845-.065 1.267.004 1 .162 1.858.618 2.59 1.31 1.306 1.23 1.903 2.787 2.012 4.555.065 1.064-.184 2.078-.546 3.066-.514 1.404-1.25 2.692-2.073 3.932-1.314 1.977-2.832 3.79-4.425 5.541-1.272 1.4-2.61 2.733-3.947 4.07-.158.158-.31.321-.466.482z"
      />
    </svg>
  );
};

const MusicSVG = (props: any) => {
  let { fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="27"
      viewBox="0 0 24 27"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M7.924 13.701c0 2.098-1.76 3.799-3.953 3.799C1.778 17.5 0 15.8 0 13.701c0-2.098 1.778-3.798 3.97-3.798.987 0 1.4.344 2.094.913V2.52a.47.47 0 0 1 .38-.454L16.406.012c.304-.066.593.155.593.453v3.169c0 .22-.161.41-.386.457L8.3 5.795a.461.461 0 0 0-.377.446v7.46zm3.723-4.73c0-.225.156-.42.375-.47a1022.59 1022.59 0 0 0 11.4-2.49.475.475 0 0 1 .578.465v13.265a2.532 2.532 0 0 1-.013.13 3.939 3.939 0 0 1-3.932 3.892 3.939 3.939 0 0 1-3.933-3.945 3.939 3.939 0 0 1 3.933-3.945c.994 0 1.529.37 2.222.98v-5.8a.486.486 0 0 0-.593-.475l-7.936 1.892a.487.487 0 0 0-.377.475v10.008l-.006.061v.04A3.939 3.939 0 0 1 9.434 27 3.939 3.939 0 0 1 5.5 23.055a3.939 3.939 0 0 1 3.933-3.945c.99 0 1.522.367 2.214.974V8.972z"
      />
    </svg>
  );
};

export default class Header extends React.Component {
  render() {
    return (
      <>
        <StyledNav>
          <Logo
            src={require("../assets/kids-tunes.svg")}
            alt="Kids Tunes logo"
          />
          <StyledUL>
            <StyledLink
              exact
              to="/"
              /* activeClassName={ActiveLink} */
              activeStyle={{
                width: "135",
                height: "60",
                backgroundColor: "#e4e1eb",
                marginTop: "-40",
                color: "#5a96f2",
                fill: "#5a96f2"
              }}
            >
              <StyledIcon>
                <MusicSVG />
              </StyledIcon>
              <TextSpan>Music</TextSpan>
            </StyledLink>
            <StyledLink
              to="/favorites"
              activeStyle={{
                width: "135",
                height: "60",
                backgroundColor: "#e4e1eb",
                marginTop: "-40",
                color: "#5a96f2",
                fill: "#5a96f2"
              }}
            >
              <StyledIcon>
                <FavoritesSVG />
              </StyledIcon>
              <TextSpan>Favorites</TextSpan>
            </StyledLink>
            <StyledLink
              to="/account"
              activeStyle={{
                width: "135",
                height: "60",
                backgroundColor: "#e4e1eb",
                marginTop: "-40",
                color: "#5a96f2",
                fill: "#5a96f2"
              }}
            >
              <StyledIcon>
                <AccountSVG />
              </StyledIcon>
              <TextSpan>Account</TextSpan>
            </StyledLink>
          </StyledUL>
        </StyledNav>
      </>
    );
  }
}
