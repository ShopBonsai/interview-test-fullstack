import React from "react";

import {
  MainMenuContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle
} from "./homepage-center-styles";

const MenuItem = () => (
  <MainMenuContainer to="/products">
    <BackgroundImageContainer />
    <ContentContainer className="content">
      <ContentTitle>shopbonsai</ContentTitle>
    </ContentContainer>
  </MainMenuContainer>
);

export default MenuItem;
