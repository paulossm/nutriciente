import React, { Component } from "react";
import { Page } from "react-onsenui";

/**
 * Loading
 * Responsável por mostrar a visualização de carregando nas páginas.
 */
const Loading = () => (
  <Page className="loading">
    <div className="middle">
      <h2>Carregando...</h2>
    </div>
  </Page>
);

export default Loading;
