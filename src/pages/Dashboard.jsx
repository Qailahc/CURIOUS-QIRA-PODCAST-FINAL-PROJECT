import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"

const DashBoardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
 gap: 20px;
 @media (max-width: 768px){
  padding: 6px 10px;
 }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ box, theme }) => box && `
  background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 18px;
  }
    `;

    const Span = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    @media (max-width: 768px){
      font-size: 14px;
    }
    color: ${({ theme }) => theme.primary};
    &:hover{
      transition: 0.2s ease-in-out;
    }
    `;

   const Podcast = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 14px;
   padding: 18px 6px;
   //center the items if only one item present
   @media (max-width: 550px){
   justify-content: center;
   }
   `;


const Dashboard = () => {
    return <DashBoardMain>
        <FilterContainer>
            <Topic>
                #Spotlight
                <Link to={`/showpodcasts/spotlight`}
                style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
                </Link>
            </Topic>
            <Podcast>Hello</Podcast>
        </FilterContainer>

        <FilterContainer>
            <Topic>
                Comedy
                <Link to={`/showpodcasts/comedy`}
                style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
                </Link>
            </Topic>
            <Podcast>Hello</Podcast>
        </FilterContainer>
        </DashBoardMain>;
};

export default Dashboard;