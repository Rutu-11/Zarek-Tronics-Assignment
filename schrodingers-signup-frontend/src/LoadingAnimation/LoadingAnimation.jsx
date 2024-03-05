import {} from "react";
import "./index.css";
function LoadingAnimation() {
  return (
    <div>
      <div className="animation01">
        {[...Array(5)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
      <div className="animation02">
        {[...Array(2)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
      <div className="animation03">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="circle">
            <div className={`circle_element0${index + 1}`}></div>
          </div>
        ))}
        <div className="animation04">
          <div className="line_wrapper line_wrapper01">
            <span className="line line01"></span>
          </div>
          <div className="rotate45">
            <div className="line_wrapper line_wrapper02">
              <span className="line line02"></span>
            </div>
          </div>
          <div className="line_wrapper line_wrapper03">
            <span className="line line03"></span>
          </div>
          <div className="rotate135">
            <div className="line_wrapper line_wrapper04">
              <span className="line line04"></span>
            </div>
          </div>
          <div className="line_wrapper line_wrapper05">
            <span className="line line05"></span>
          </div>
          <div className="rotate-135">
            <div className="line_wrapper line_wrapper06">
              <span className="line line06"></span>
            </div>
          </div>
          <div className="line_wrapper line_wrapper07">
            <span className="line line07"></span>
          </div>
          <div className="rotate-45">
            <div className="line_wrapper line_wrapper08">
              <span className="line line08"></span>
            </div>
          </div>
        </div>
        <div className="animation05">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`double_wrapper02 ${
                ["green", "navy", "yellow", "blue", "red"][index]
              }02`}
            >
              <div
                className={`double_wrapper01 ${
                  ["green", "navy", "yellow", "blue", "red"][index]
                }01`}
              >
                <div
                  className={`double_block ${
                    ["green", "navy", "yellow", "blue", "red"][index]
                  }00`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="animation06">
        <div className="rhombus05">
          <div className="rhombus04">
            <div className="rhombus03">
              <div className="rhombus02">
                <div className="rhombus01"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="animation07">
        <div className="circle">
          <div className="circle_element01"></div>
        </div>
        <div className="line_wrapper line_wrapper01">
          <span className="line line01"></span>
        </div>
        <div className="rotate60">
          <div className="line_wrapper line_wrapper02">
            <span className="line line02"></span>
          </div>
        </div>
        <div className="rotate120">
          <div className="line_wrapper line_wrapper03">
            <span className="line line03"></span>
          </div>
        </div>
        <div className="line_wrapper line_wrapper04">
          <span className="line line04"></span>
        </div>
        <div className="rotate-120">
          <div className="line_wrapper line_wrapper05">
            <span className="line line05"></span>
          </div>
        </div>
        <div className="rotate-60">
          <div className="line_wrapper line_wrapper06">
            <span className="line line06"></span>
          </div>
        </div>
      </div>
      <div className="animation08">
        {[...Array(5)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default LoadingAnimation;
