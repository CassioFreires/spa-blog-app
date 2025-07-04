import React from "react";

type MyComponentProps = {
  children: React.ReactNode;
};

function Container({ children }: MyComponentProps) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default Container;
