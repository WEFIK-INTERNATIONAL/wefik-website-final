import { ArrowRight } from "lucide-react";

const AnimatedButton = ({ children }) => {
  return (
    <div
      className="group hover:ring-accent/30 relative flex w-fit cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full transition-all duration-300 ease-in-out hover:ring-4"
      style={{
        background: "var(--color-accent)",
        padding: "2px 2px 2px 10px",
      }}
    >
      <div className="absolute left-5 h-5 w-5 -translate-x-16 transition-transform duration-500 ease-in-out group-hover:-translate-x-1">
        <ArrowRight
          style={{ color: "var(--color-bg-primary)" }}
          className="h-5 w-5"
        />
      </div>

      <span
        className="whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:translate-x-8"
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--color-bg-primary)",
          paddingRight: "8px",
        }}
      >
        {children}
      </span>

      <div className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-16">
        <div
          className="flex h-full w-full items-center justify-center rounded-full"
          style={{ background: "var(--color-bg-primary)" }}
        >
          <ArrowRight
            className="h-4 w-4"
            style={{ color: "var(--color-accent)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedButton;
