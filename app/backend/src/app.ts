class App {
  public app: any
  // ...
  public start(PORT: string | number):void {
    // ...
  }
}

export { App }

// A execução dos testes de cobertura depende dessa exportação
export const app = new App().app;
