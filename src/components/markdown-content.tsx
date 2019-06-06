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
  margin: 50px auto 50px;
  width: 80%;
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.3rem;

  h1 {
    font-size: 40px;
    font-weight: 500px;
    line-height: 55px;
  }

  h2 {
    font-size: 35px;
    font-weight: 400;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    margin: 24px 0px;
  }

  ul {
    list-style-type: disc;
    margin: 10px 0 0 15px;
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
        <ReactMarkdown
          source={this.state.markdownContent}
          renderers={{
            link: props => (
              <a href={props.href} target="_blank" rel="noopener noreferrer">
                {props.children}
              </a>
            )
          }}
        />
      </Container>
    );
  }
}
