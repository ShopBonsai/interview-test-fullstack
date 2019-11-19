import React from "react"
// import { withRouter } from "react-router-dom"

import {
  MainMenuContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
} from "./homepage-center-styles"

const MenuItem = () => (
  <MainMenuContainer>
    <BackgroundImageContainer className="background-image" imageUrl={url}/>
    <ContentContainer className="content">
      <ContentTitle>ShopBonsai</ContentTitle>
    </ContentContainer>
  </MainMenuContainer>
)

export default MenuItem