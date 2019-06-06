import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "@emotion/styled";

interface Props {
  filePath: string;
}

interface State {
  markdownContent: string;
}

const Container = styled.div`
  margin: 1% 2% 2%;
  font-family: "Times New Roman", Times, serif;

  h1 {
    font-size: 40px;
    font-weight: 500px;
    line-height: 55px;
  }

  h2 {
    font-size: 30px;
    font-weight: 300;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin: 5px 0;
  }

  ul {
    list-style-type: disc;
    margin: 10px 0 0 5px;
    list-style-position: inside;
  }
`;

export default class MarkdownContent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      markdownContent: ""
    };
  }

  async componentDidMount() {
    const fileResult = await fetch(this.props.filePath);
    const content = await fileResult.text();
    this.setState({ markdownContent: content });
  }

  public render() {
    return (
      <Container>
        <ReactMarkdown source={this.state.markdownContent} />
      </Container>
    );
  }
}
