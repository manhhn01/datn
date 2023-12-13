"use client";

import { styled } from "@mui/system";

export const EmailSubscriptionWrapper = styled("div")`
  background-color: #00346b;
  color: white;
  border-radius: 10px;
  padding: 50px 0;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled("p")`
  font-size: 46px;
  font-height: 58px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

export const SubTitle = styled("p")`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 48px;
`;

export const InputWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  padding-left: 20px;

  input {
    width: 300px;
    font-size: 16px;
    box-shadow: none;
    border: 1px solid transparent;

    &:hover,
    &:focus {
      border: 1px solid transparent;
    }
  }

  button {
    margin: 10px;
    height: 46px;
  }
`;
