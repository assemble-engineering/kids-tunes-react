import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 50px;
  margin: 10px;
  font-size: 17px;
  color: #ffffff;
  background-color: #659cf3;
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
`;

const StyledH2 = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  width: 70%;
  border-bottom: 1px solid black;
  margin: 10px auto;
`;

const StyledInput = styled.input`
  display: block;
  margin: 10px auto;
`;

const List = styled.ul`
  width: 70%;
  margin: 10px auto;
`;

const categories = [
  {
    categoryName: "Cartoon",
    color: "#659cf3"
  },
  {
    categoryName: "Christmas",
    color: "#b9d886"
  },
  {
    categoryName: "Disney",
    color: "#aa7efc"
  },
  {
    categoryName: "Educational",
    color: "#edc34f"
  },
  {
    categoryName: "Kidz Bop",
    color: "#eb8471"
  },
  {
    categoryName: "Nursery Rhyme",
    color: "#89d8d2"
  },
  {
    categoryName: "Kids Rap",
    color: "#659cf3"
  },
  {
    categoryName: "Lullaby",
    color: "#aa7efc"
  },
  {
    categoryName: "Pokemon",
    color: "#edc34f"
  },
  {
    categoryName: "White Noise",
    color: "#89d8d2"
  }
];

class Search extends React.Component {
  render() {
    return (
      <>
        <StyledH1>Search</StyledH1>
        <StyledInput type="text" placeholder="All kids music" />
        <StyledH2>Browse Categories</StyledH2>
        <List>
          {categories.map(category => (
            <StyledButton style={{ backgroundColor: category.color }}>
              {category.categoryName}
            </StyledButton>
          ))}
        </List>
      </>
    );
  }
}

export default Search;
