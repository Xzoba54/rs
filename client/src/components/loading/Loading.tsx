import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    width: 90px;
    height: 90px;
    border: 4px solid #adb5bd;
    border-top-color: #0074e9;
    border-radius: 50%;
    animation: loading 1s ease infinite;
  }
  @keyframes loading {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;

const Button = styled.button``;

type Props = {
  error: boolean;
};

const Loading = ({ error }: Props) => {
  return <Container>{error ? <Button>Try again</Button> : <Spinner></Spinner>}</Container>;
};

export default Loading;
