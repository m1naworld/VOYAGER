import React, { useEffect } from "react";

const Survey = () => {
  useEffect(() => {
    console.log(window.wallop);
    const slider = document.querySelector("[data-carousel]");
    const slides = [...document.querySelectorAll(".Wallop-item")];
    let wallop = new window.Wallop(slider);

    let prev = 0;

    const removePrevClasses = (index) => {
      let prevClass;
      if (slides[index].classList.contains("Wallop-item--hidePrevious")) {
        prevClass = "Wallop-item--hidePrevious";
      } else if (slides[index].classList.contains("Wallop-item--hideNext")) {
        prevClass = "Wallop-item--hideNext";
      }

      if (prevClass) {
        setTimeout(() => {
          slides[index].classList.remove(prevClass);
        }, 600);
      }
    };

    const onChange = () => {
      removePrevClasses(prev);
      prev = this.wallop.currentItemIndex;
    };

    wallop.on("change", onChange);
  }, []);
  return (
    <div class="wrapper">
      <div data-carousel>
        <ul class="slide__list Wallop-list">
          <li class="slide__item Wallop-item Wallop-item--current">
            <h2 class="slide__heading">Testimonial 1</h2>
            <blockquote>
              <p class="slide__quote">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Porttitor rhoncus dolor purus non enim praesent elementum
                facilisis. In est ante in nibh mauris cursus mattis molestie.
              </p>
              <cite class="slide__cite">AN Author</cite>
            </blockquote>
          </li>
          <li class="slide__item Wallop-item">
            <h2 class="slide__heading">Testimonial 2</h2>
            <blockquote>
              <p class="slide__quote">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <cite class="slide__cite">AN Author</cite>
            </blockquote>
          </li>
          <li class="slide__item Wallop-item">
            <h2 class="slide__heading">Testimonial 3</h2>
            <blockquote>
              <p class="slide__quote">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Porttitor rhoncus dolor purus non enim praesent elementum
                facilisis. In est ante in nibh mauris cursus mattis molestie.
              </p>
              <cite class="slide__cite">AN Author</cite>
            </blockquote>
          </li>
          <li class="slide__item Wallop-item">
            <h2 class="slide__heading">Testimonial 4</h2>
            <blockquote>
              <p class="slide__quote">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Porttitor rhoncus dolor purus non enim praesent elementum
                facilisis. In est ante in nibh mauris cursus mattis molestie.
              </p>
              <cite class="slide__cite">AN Author</cite>
            </blockquote>
          </li>
        </ul>
        <button class="button--prev Wallop-buttonPrevious" title="previous">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.9 50.2">
            <path d="M25.1 50.2L0 25.1 25.1 0l2.8 2.8L5.7 25.1l22.2 22.2z" />
          </svg>
        </button>
        <button class="button--next Wallop-buttonNext" title="next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.9 50.2">
            <path d="M25.1 50.2L0 25.1 25.1 0l2.8 2.8L5.7 25.1l22.2 22.2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Survey;
