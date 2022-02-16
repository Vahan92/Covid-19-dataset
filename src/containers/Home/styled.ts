import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

export const MainWrapper = styled(Paper)`
  height: max-content;
  max-width: 1280px;
  margin: auto;
  border: 1px solid black;
  border-radius: 6px;
  padding: 20px 0 60px 0;
  @media (max-width: 768px) {
    padding: 10px 0 300px 0;
  }
  @media (max-width: 480px) {
    padding: 0;
  }

  &&& {
    .Mui-checked {
      color: white;
    }
    .MuiSwitch-track {
      background-color: lightgrey;
    }
  }
`;

export const Container = styled(Paper)`
  width: 80%;
  height: 80%;
  margin: auto;

  @media (max-width: 768px) {
    width: 95%;
    height: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

export const Controls = styled(Paper)`
  &&& {
    display: flex;
    justify-content: space-between;
    box-shadow: none;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;

      > div:nth-child(1) {
        margin: 10px 0;
      }
    }
  }
`;

export const NightMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 6px 30px 20px 0;
`;
