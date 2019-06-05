import React, { RefObject, SFC } from "react";
import styled from "@emotion/styled";

interface Props {
  progressPercentage: number;
  tintColor: string;
  onProgressChange: (current: number) => void;
}

interface TintColor {
  backgroundColor: string;
}

interface BarProps extends TintColor {
  width: number;
}

interface DotProps extends TintColor {
  left: number;
}

const Container = styled.div`
  height: 5px;
`;

const Background = styled.div`
  position: relative;
  display: block;
  width: 310px;
  height: 3px;
  background-color: #dedede;
  border-radius: 3px;
`;

const Bar: SFC<BarProps> = styled.div`
  width: 100px;
  height: 3px;
  background-color: #cbff00;
  margin-top: -3px;
  border-radius: 3px;
  width: ${props => `${props.width}%`};
  background-color: ${props => props.backgroundColor};
`;

const Dot: SFC<DotProps> = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background-color: ${props => props.backgroundColor};
  margin-left: -1px;
  margin-top: -5.5px;
  position: absolute;
  left: ${props => `${props.left}%`};
`;

export default class ProgressBar extends React.Component<Props> {
  private containerRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.containerRef = React.createRef<HTMLDivElement>();
  }

  onClick(event: any) {
    const bounds = event.target.getBoundingClientRect();
    const width = this.containerRef.current!.clientWidth;
    const click_x = event.clientX - bounds.left;
    const newProgress = click_x / width;
    this.props.onProgressChange(newProgress);
  }

  public render() {
    const progress = this.props.progressPercentage * 100;
    return (
      <Container onClick={this.onClick}>
        <Background ref={this.containerRef}>
          <Bar backgroundColor={this.props.tintColor} width={progress} />
          <Dot backgroundColor={this.props.tintColor} left={progress} />
        </Background>
      </Container>
    );
  }
}
