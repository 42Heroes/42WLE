import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Button from '../common/Button';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createPost } from '../../library/api/board';
import {
  dataURLtoFile,
  encodeBase64ImageFile,
} from '../../library/ImageConverter';
import { v4 as uuid } from 'uuid';
import { uploadFileToS3 } from '../../library/api';

interface Props {
  toggleModal: (
    event: React.MouseEvent<HTMLDivElement | SVGSVGElement>,
  ) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function CreatePost({ toggleModal, setIsModalOpen }: Props) {
  const queryClient = useQueryClient();
  const [isImageExist, setIsImageExist] = useState(false);
  const [image, setImage] = useState('');
  const { mutate } = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
      setIsModalOpen(false);
    },
    onError: (error) => console.log(error),
  });

  const [content, setContent] = useState('');
  const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setContent(value);
  };

  const { data: me, isError, isLoading } = useMe();
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  const handlePostButtonClick = async () => {
    if (isImageExist) {
      const file = dataURLtoFile(image, uuid());
      const uploadUrl = await uploadFileToS3(file, '/post-image');
      setImage(uploadUrl);
    }

    const payload = {
      contents: { text: content, img: [image] },
    };
    mutate(payload);
  };

  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    const selectedImage = e.target.files[0];

    if (selectedImage && selectedImage.size <= 2000000) {
      setIsImageExist(true);
      const encodedImage = await encodeBase64ImageFile(selectedImage);
      setImage(encodedImage);
    }
  };

  return (
    <Container>
      <TopLabel>
        <p>Create a post</p>

        <ClearIcon fontSize="large" onClick={(e) => toggleModal(e)} />
      </TopLabel>
      <ProfileContainer>
        {me && <ProfileImage src={me.image_url} size="medium" />}
        <UserInfo>
          <h1>{me?.nickname}</h1>
          <p>
            {me?.campus} • {me?.country}
          </p>
        </UserInfo>
      </ProfileContainer>
      <ContentContainer>
        <textarea
          placeholder="What do you want to talk about?"
          onChange={handleContentChange}
          value={content}
        />
      </ContentContainer>
      <ButtonContainer>
        <ImageIconWrapper as="label" htmlFor="image_upload">
          <ImageOutlinedIcon sx={{ fontSize: '3.5rem' }} />
        </ImageIconWrapper>
        <InputContainer>
          <input
            id="image_upload"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeImage}
          />
        </InputContainer>
        <StyledPostButton
          type="button"
          size="medium"
          onClick={handlePostButtonClick}
        >
          Post
        </StyledPostButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  height: 40rem;
  background-color: #242526;
  border-radius: 1rem;
  margin: 2rem;
`;

const TopLabel = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  p {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 2.5rem;
    font-weight: 800;
  }
  svg {
    color: ${({ theme }) => theme.grayColor};
    cursor: pointer;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 22%;
  display: flex;
  padding: 2rem;
`;

const UserInfo = styled.div`
  height: 100%;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 1.7rem;
    margin-bottom: 0.7rem;
  }
  p {
    color: ${({ theme }) => theme.grayColor};
    font-size: 1.2rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 50%;
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 2rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    background-color: transparent;
    resize: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  svg {
    color: ${({ theme }) => theme.grayColor};
  }
`;

const ImageIconWrapper = styled.div`
  cursor: pointer;
`;

const InputContainer = styled.div`
  input {
    display: none;
  }
`;

const StyledPostButton = styled(Button)`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 1.5rem;
`;
