import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: white;
  color: #333;
  margin: 0.5rem;
  max-width: 24rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Body = styled.p`
  font-size: 0.875rem;
`;

export function StyledCard({ index }) {
  return (
    <Card>
      <Title>Styled Card #{index}</Title>
      <Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Body>
    </Card>
  );
}
