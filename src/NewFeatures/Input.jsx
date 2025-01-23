import React from "react";
import styled from "styled-components";

const Input = ({ studentId, setStudentId }) => {
  return (
    <StyledWrapper>
      <form className="formField">
        <input
          required
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <span>Stundent ID</span>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .formField {
    margin: 10px;
    position: relative;
  }

  .formField input {
    padding: 10px 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: #333;
    font-size: 16px;
    font-weight: 550;
    transition: 0.3s ease-in-out;
    box-shadow: 0 0 0 5px transparent;
  }

  .formField input:hover,
  .formField input:focus {
    box-shadow: 0 0 0 2px #333;
  }

  .formField span {
    position: absolute;
    left: 0;
    top: 0;
    padding: 8px 15px;
    color: #333;
    font-size: 16px;
    transition: 0.3s ease-in-out;
    pointer-events: none;
  }

  .formField input:focus + span,
  .formField input:valid + span {
    transform: translateY(-32px) translateX(-5px) scale(0.95);
    transition: 0.3s ease-in-out;
  }
`;

export default Input;
