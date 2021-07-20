import styled from 'styled-components';
import Box from '../Box';

export const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    /* max-height: 220px; */
    max-height: ${(props) => (props.isShowingMoreItems ? '' : '220px')};
    overflow: hidden;
    list-style: none;    
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;    
    span {
      color: hsl(214, 13%, 20%);
      font-size: 12px;
      color:#FFF;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
  .toggleButton {
    background: none;
    padding: 0;
    font-size: 14px;
    color: #539bf5;
    font-weight: 600;
    cursor: pointer;
    margin-top:10px;    
  }
`; 