import { ThemeProvider } from "@/components/theme/theme";
import { Content } from "./Content";
import { Header } from "./Header";
import { QueryProvider } from "./providers";
import { AppStore } from "../state/context";
import { Layout } from "./Layout";

/**
 * YOUR CODE IS HERE
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <AppStore>
          <Layout>
            <Header />
            <Content />
          </Layout>
        </AppStore>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
