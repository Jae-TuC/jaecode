import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "../components/header";
import { InputBar } from "../components/input-bar";

/**
 * Root application component that renders the centered CLI UI layout.
 *
 * Renders a full-screen container with a Header and an InputBar arranged vertically and centered.
 *
 * @returns The top-level JSX element representing the application's layout.
 */
function App() {
  return (
    <box
      alignItems="center"
      justifyContent="center"
      backgroundColor="#0d0d12"
      width="100%"
      height="100%"
      gap={2}
      paddingBottom={2}
    >
      <Header />
      <box width="100%" minWidth={78} paddingX={2}>
        <InputBar onSubmit={() => { }} />
      </box>
    </box>
  );
}

const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false
});
createRoot(renderer).render(<App />);
