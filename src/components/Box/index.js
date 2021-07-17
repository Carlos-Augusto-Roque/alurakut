import styled from 'styled-components';

const Box = styled.div`
  background: hsl(214, 13%, 20%);
  border-radius: 8px;
   
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
 
  .boxLink {
    font-size: 14px;
    text-align:center;
    color: #539bf5;
    text-decoration: none;
    font-weight: 700;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
    color:#539bf5;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color:#539bf5;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #539bf5;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #539bf5;
  }

  label {
    font-size: 14px;
    color:#FFFFFF;
  }
  input {
    width: 100%;
    background-color: #FFFFFF90;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    margin-top:0.5rem;
    border-radius: 10px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10px;
    background-color: #D81D99;
    margin-left:40%;
  }

  
`; 

export default Box 