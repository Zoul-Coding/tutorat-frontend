import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div>
      <App />
      <Toaster
        toastOptions={{
          unstyled: true,
          style: {
            position: "fixed",
            right: "2em",
            bottom: "2em",
          },
          actionButtonStyle: {
            color: "hsl(var(--accent-foreground))",
            backgroundColor: "hsl(var(--accent))",
          },
          cancelButtonStyle: {
            color: "hsl(var(--destructive-foreground))",
            backgroundColor: "hsl(var(--destructive))",
          },
          classNames: {
            toast: "max-w-sm flex items-center gap-2 rounded p-2 px-3 shadow-lg",
            actionButton: "border border-red-500",
            error: "border-red-300 bg-red-200 text-red-900",
            success: "border-green-300 bg-green-100 text-green-900",
            warning: "border-orange-300 bg-orange-100 text-orange-900",
            info: "border-blue-300 bg-blue-200 text-blue-900",
          },
        }}
      />
    </div>
  </BrowserRouter>
);
