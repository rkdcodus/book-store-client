import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "../../context/themeContext";
import React from "react";

describe("Title 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    //렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기 입력' />
      </BookStoreThemeProvider>
    );

    //확인
    expect(screen.getByPlaceholderText("여기 입력")).toBeInTheDocument();
  });

  it("forwardRef 테스트", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기 입력' ref={ref} />
      </BookStoreThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
