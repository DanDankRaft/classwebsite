"use client";
import { useEffect, useState } from "react";

export default function AccessibilityOptions() {
  const [font, setFont] = useState("OpenSauce");
  useEffect(() => {
    setFont(localStorage.getItem("font") ? localStorage.getItem("font") : "OpenSauce");
    document.body.style.fontFamily = font;
  }, [font, setFont]
  );

  const [colorScheme, setColorScheme] = useState("system");
  useEffect(() => {
    setColorScheme(localStorage.getItem("colorScheme") ? localStorage.getItem("colorScheme") : "system");
    
    let isDarkMode = colorScheme == "system" ? window.matchMedia('(prefers-color-scheme: dark)').matches : colorScheme == "dark";
    if(isDarkMode)
    {
      document.documentElement.classList.add("dark");
    }
    else
    {
      document.documentElement.classList.remove("dark");
    }
  }, [colorScheme, setColorScheme]);

  const [menuVisible, setMenuVisible] = useState(false);

  function AccessibilityButton() {
    return (
      <button
      onClick={() => setMenuVisible(!menuVisible)}
      >
        Accessibility
      </button>
    );
  }
  
  function AccessibilityMenu() {
    
    function changeFont(fontName) {
      document.body.style.fontFamily = fontName;
      setFont(fontName);
      localStorage.setItem("font", fontName);
    }

    function fontButtonStyling(fontName) {
          return "font-bold px-1 sm:px-3 py-2 mx-1 h-[55px]" + (font == fontName ? " bg-foreground text-background" : "");
    }

    function changeColorScheme(colorScheme) {
      setColorScheme(colorScheme);
      let isDarkMode = colorScheme == "system" ? window.matchMedia('(prefers-color-scheme: dark)').matches : colorScheme == "dark";
      if(isDarkMode)
      {
        document.documentElement.classList.add("dark");
      }
      else
      {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("colorScheme", colorScheme);
    }

    function colorSchemeButtonStyling(scheme) {
      return "font-bold px-3 py-2 mx-1 h-[55px]" + (colorScheme == scheme ? " bg-foreground text-background" : "");
    }

    return (
      <div
        className={`${
          menuVisible ? "visible" : "hidden"
        } border-solid border-2 px-3 pt-1 pb-2 mt-1`}
      >
        <div>
          <p className="text-center text-lg">Site Font:</p>
          <div className="w-fit mx-auto">
            <button className={fontButtonStyling("OpenSauce") + " font-[OpenSauce]"} onClick={() => changeFont("OpenSauce")}>Default</button>
            <button className={fontButtonStyling("Comic Sans MS") + " font-['Comic_Sans_MS']"} onClick={() => changeFont("Comic Sans MS")}>Comic Sans</button>
            <button className={fontButtonStyling("OpenDyslexic") + " font-[OpenDyslexic]"} onClick={() => changeFont("OpenDyslexic")}>OpenDyslexic</button>
          </div>
        </div>
        <div className="mt-1">
          <p className="text-center text-lg">Color Scheme:</p>
          <div className="">
            <button className={colorSchemeButtonStyling("system")} onClick={() => changeColorScheme("system")}>Default colors</button>
            <button className={colorSchemeButtonStyling("light")} onClick={() => changeColorScheme("light")}>Light</button>
            <button className={colorSchemeButtonStyling("dark")} onClick={() => changeColorScheme("dark")}>Dark</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AccessibilityButton />
      <AccessibilityMenu />
    </>
  );
}
