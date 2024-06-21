// Orginal Podcast Cards

// Import necessary dependencies from React, Material-UI, styled-components, and react-router-dom
import React from "react";
import Avatar from '@mui/material/Avatar'; // Import Avatar component from Material-UI
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import FavoriteIcon component from Material-UI
import styled from 'styled-components'; // Import styled-components for styling
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

// Styled-components for styling the components
const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #9000ff !important; // Purple background color
  color: white !important; // White color for icon
  backdrop-filter: blur(4px); // Apply blur effect to the background
  -webkit-backdrop-filter: blur(4px); // WebKit version of backdrop-filter
  position: absolute !important;
  top: 45%; // Position from the top
  right: 10%; // Position from the right
  display: none; // Initially hidden
  transition: all 0.4s ease-in-out; // Smooth transition effect
  box-shadow: 0 0 16px 4px #9000ff50 !important; // Purple box shadow
`;

const Card = styled(Link)`
  position: relative; // Relative positioning
  text-decoration: none; // Remove default link underline
  background-color: ${({ theme }) => theme.card}; // Background color based on theme
  max-width: 220px; // Maximum width
  height: 280px; // Fixed height
  display: flex; // Flex display
  flex-direction: column; // Column direction
  justify-content: flex-start; // Start alignment along the main axis
  align-items: center; // Center alignment along the cross axis
  padding: 16px; // Padding for the card
  border-radius: 6px; // Rounded corners
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1); // Box shadow effect
  &:hover{
    cursor: pointer; // Change cursor to pointer on hover
    transform: translateY(-8px); // Move card upward on hover
    transition: all 0.4s ease-in-out; // Smooth transition effect
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3); // Enhanced box shadow on hover
    filter: brightness(1.3); // Brighten the card on hover
  }
  &:hover ${PlayIcon}{
    display: flex; // Show play icon on hover
  }
`

const Top = styled.div`
  display: flex; // Flex display
  justify-content: center; // Center alignment along the main axis
  align-items: center; // Center alignment along the cross axis
  height: 150px; // Height of the top section
  position: relative; // Relative positioning
`

const Title = styled.div`
  overflow: hidden; // Overflow behavior
  display: -webkit-box; // Display as a block container with ellipsis for overflow text
  max-width: 100%; // Maximum width
  -webkit-line-clamp: 2; // Limit to two lines of text
  -webkit-box-orient: vertical; // Stack lines vertically
  overflow: hidden; // Hide overflow text
  text-overflow: ellipsis; // Ellipsis for overflow text
  color: ${({ theme }) => theme.text_primary}; // Text color based on theme
`

const Description = styled.div`
  overflow: hidden; // Overflow behavior
  display: -webkit-box; // Display as a block container with ellipsis for overflow text
  max-width: 100%; // Maximum width
  -webkit-line-clamp: 2; // Limit to two lines of text
  -webkit-box-orient: vertical; // Stack lines vertically
  overflow: hidden; // Hide overflow text
  text-overflow: ellipsis; // Ellipsis for overflow text
  color: ${({ theme }) => theme.text_secondary}; // Text color based on theme
  font-size: 12px; // Font size
`

const CardImage = styled.img`
  object-fit: cover; // Maintain aspect ratio while filling the container
  width: 220px; // Width of the image
  height: 140px; // Height of the image
  border-radius: 6px; // Rounded corners
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3); // Box shadow effect
  &:hover{
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4); // Enhanced box shadow on hover
  }
`

const CardInfo = styled.div`
  display:flex; // Flex display
  align-items: flex-end; // Align items at the end
  font-weight:450; // Font weight
  padding: 14px 0px 0px 0px; // Padding
  width: 100%; // Full width
`

const MainInfo = styled.div`
  display: flex; // Flex display
  width: 100%; // Full width
  flex-direction: column; // Column direction
  justify-content: flex-start; // Start alignment along the main axis
  gap: 4px; // Gap between elements
`

const CreatorInfo = styled.div`
  display: flex; // Flex display
  align-items: center; // Align items at the center
  justify-content: space-between; // Space between elements
  gap: 8px; // Gap between elements
  margin-top: 6px; // Margin from the top
`

const Creator = styled.div`
  display: flex; // Flex display
  align-items: center; // Align items at the center
  justify-content: space-between; // Space between elements
  gap: 8px; // Gap between elements
  margin-top: 6px; // Margin from the top
`

const CreatorName = styled.div`
  font-size:12px; // Font size
  overflow: hidden; // Overflow behavior
  white-space: nowrap; // Do not wrap text
  text-overflow: ellipsis; // Ellipsis for overflow text
  color: ${({ theme }) => theme.text_secondary}; // Text color based on theme
`

const Views = styled.div`
  font-size:10px; // Font size
  color: ${({ theme }) => theme.text_secondary}; // Text color based on theme
  width: max-content; // Adjust width based on content
`

// PodCard component to render a podcast card
const PodCard = () => {
    return (
        // Card component with structured content
        <Card>
            <Top>
                <FavoriteIcon /> {/* Favorite icon */}
                <CardImage /> {/* Podcast image */}
                <PlayIcon /> {/* Play icon */}
            </Top>
            <CardInfo>
                <MainInfo>
                    <Title>Title</Title> {/* Podcast title */}
                    <Description>Description</Description> {/* Podcast description */}
                    <CreatorInfo>
                        <Creator>
                            <Avatar>Q</Avatar> {/* Creator avatar */}
                            <CreatorName>Qaiylah</CreatorName> {/* Creator name */}
                        </Creator>
                        <Views>100 Views</Views> {/* Number of views */}
                    </CreatorInfo>
                </MainInfo>
            </CardInfo>
        </Card>
    );
};

export default PodCard; // Export PodCard component
