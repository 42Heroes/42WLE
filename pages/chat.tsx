import styled from 'styled-components';
import { ReactElement, useEffect, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import SearchIcon from '@mui/icons-material/Search';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatRoom from '../components/chat/ChatRoom';
import { dummyData } from '../library/chatData';

export default function Chat() {
  return (
    <Container>
      <LeftContainer>
        <SearchContainer>
          <input placeholder="Search" />
          <SearchIcon sx={{ fontSize: 25 }} />
        </SearchContainer>
        <ChatRoomList>
          {dummyData.map((chat) => (
            <ChatRoom key={chat._id} chat={chat} user="user" />
          ))}
        </ChatRoomList>
      </LeftContainer>
      <RightContainer>
        <NameContainer></NameContainer>
        <MessageContainer></MessageContainer>
        <MessageInputContainer>
          <ImageOutlinedIcon sx={{ color: '#727272', fontSize: 23 }} />
          <input placeholder="Your messages..." />
          <SendRoundedIcon sx={{ color: '#8083FF', fontSize: 23 }} />
        </MessageInputContainer>
      </RightContainer>
    </Container>
  );
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Chat">{page}</CommonLayout>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 35%;
  min-width: 30rem;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.grayColor};
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.grayColor};
  input {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.grayColor};
    ::placeholder {
      font-weight: 600;
    }
    &:focus {
      outline: none;
    }
  }
`;

const RightContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  color: white;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;

const MessageContainer = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;

const MessageInputContainer = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  height: 4.5rem;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: #242526;
  input {
    width: 100%;
    background-color: inherit;
    margin-left: 1rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    ::placeholder {
      color: ${({ theme }) => theme.fontColor.contentColor};
    }
    &:focus {
      outline: none;
    }
  }
  svg {
    &:last-child {
      transform: rotateZ(-45deg);
      margin-bottom: 0.5rem;
    }
  }
`;

const ChatRoomList = styled.ul`
  display: flex;
  flex-direction: column;
`;